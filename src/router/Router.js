/**
 * VueRouter 增强
 *
 * 扩展方法：
 * - setRoutes   为路由实例设置 routes 配置对象
 * - getRoute    根据 key、value 获取在 routes 中对应的配置对象
 * - findRoute   根据 key、value 获取传入的 routes 中对应的配置对象（用于权限控制的修改，只有在调用 setRoutes 之前修改才有效）
 * - deleteRoute 根据 key、value 删除传入的 routes 中对应的配置对象（用于权限控制的删除，只有在调用 setRoutes 之前删除才有效）
 * - matchRoutes 传入 vue-router 的路由信息对象，返回一个路由数组，表示从根路由开始到该路由结束，所经过的所有路由组成的数组（用于生成面包屑）
 *
 * 扩展属性：
 * - routes      指向路由的配置对象 routes
 *
 * 注意，每一个路由配置对象都会挂载到对应的 vue-router 路由信息对象的 meta 属性下
 */
import VueRouter from 'vue-router'
import pathToRegexp from 'path-to-regexp'
import RouterView from '@/components/RouterView'

const slashStartReg = new RegExp('^/+')
const slashEndReg = new RegExp('/+$')

export default class Router extends VueRouter {
  setRoutes (routes) {
    this.routes = this.initRoutes(routes)
    this.addRoutes(this.toVueRoutes(this.routes))
  }

  getRoute (key, value) {
    return this.findRoute(key, value)
  }

  initRoutes (routes, parentPath) {
    return routes.map(route => {
      // 如果 parent 是对象，就存在循环引用，在SSR中将不能被序列化而报错
      route.meta = Object.assign({}, route.meta, { parentPath })

      if (!route.component) {
        route.meta.empty = true
      }

      if (typeof route.path === 'undefined') {
        if (route.name) {
          route.path = route.name
        } else {
          route.path = ''
        }
      }

      if (typeof route.path === 'string') {
        if (parentPath && !slashStartReg.test(route.path)) {
          // 处理相对路径
          route.path = parentPath.replace(slashEndReg, '') + '/' + route.path.replace(slashStartReg, '')
        } else {
          route.path = '/' + route.path.replace(slashStartReg, '')
        }
      }

      if (route.children && route.children.length) {
        route.children = this.initRoutes(route.children, route.path)
      }

      return route
    })
  }

  toVueRoutes (routes) {
    return routes.map(route => {
      const vueRoute = Object.assign({}, route)

      if (vueRoute.children && vueRoute.children.length) {
        const children = vueRoute.children.concat()

        if (vueRoute.component) {
          const defaultChild = {
            meta: vueRoute.meta,
            name: vueRoute.name,
            path: ''
          }

          delete vueRoute.name

          if (vueRoute.defaultChild) {
            defaultChild.component = vueRoute.defaultChild
          } else if (!vueRoute.frame) {
            // 如果该路由不是一个frame，则将自己的组件作为默认页，然后用路由组件替换 component
            defaultChild.component = vueRoute.component
            vueRoute.component = null
          }

          if (defaultChild.component) {
            children.unshift(defaultChild)
          }
        }

        if (!vueRoute.component) {
          vueRoute.component = RouterView
        }

        vueRoute.children = this.toVueRoutes(children)
      }

      return vueRoute
    })
  }

  findRoute (key, value, routes = null) {
    routes = routes || this.routes
    let targetRoute

    routes.some(route => {
      if (route[key] === value ||
        (key === 'path' &&
        pathToRegexp(route[key]).exec(value))) {
        targetRoute = route
        return targetRoute
      } else if (route.children && route.children.length) {
        targetRoute = this.findRoute(key, value, route.children)
        return targetRoute
      }
    })

    return targetRoute
  }

  deleteRoute (key, value, routes = null) {
    routes = routes || this.routes
    let targetRoute

    routes.some((route, i) => {
      if (route[key] === value ||
        (key === 'path' &&
        pathToRegexp(route[key]).exec(value))) {
        routes.splice(i, 1)
        targetRoute = route
        return targetRoute
      } else if (route.children && route.children.length) {
        targetRoute = this.deleteRoute(key, value, route.children)
        return targetRoute
      }
    })

    return targetRoute
  }

  getMetaMatched (route = null) {
    route = route || this.currentRoute
    const fullPath = route.fullPath

    let meta = route.meta

    // 解析路径中的参数
    const keys = []
    const result = pathToRegexp(route.path, keys).exec(fullPath)
    const params = {}
    if (result) {
      keys.forEach((item, i) => {
        params[item.name] = result[i + 1]
      })
    }

    meta.path = fullPath
    const matched = [meta]

    while (meta.parentPath) {
      const route = this.findRoute('path', meta.parentPath)
      if (!route) break
      meta = route.meta
      meta.path = pathToRegexp.compile(route.path)(params)
      matched.push(meta)
    }

    return matched.reverse()
  }
}

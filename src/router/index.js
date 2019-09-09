import Vue from 'vue'
import Router from '@bjj/vue/Router'
import { baseRoutes, asyncRoutes } from './routes'
import interceptor from './interceptor'
import { generatePermissionMap, perm } from '@/core/permission'
import _403 from '@/views/exception/403'

Vue.use(Router)

Router.prototype.isAvailableRoute = function (route) {
  if (!route) return false

  if (route.redirect) {
    return this.isAvailableRoute(router.findRoute('path', route.redirect))
  }

  return !route.meta._403
}

Router.create = function () {
  const router = new Router({
    mode: 'history',
    base: process.env.VUE_APP_BASE_URL,
    scrollBehavior: () => ({ y: 0 })
  })
  router.setRoutes(baseRoutes)
  return router
}

const router = Router.create()
interceptor(router)

export function resetRoutesByRole (role, merchantStatus) {
  generatePermissionMap(role, merchantStatus)
  let routes = Router.initRoutes(asyncRoutes)
  routes = Router.mapRoutes(routes, route => {
    if (!perm(route.meta && route.meta.perm)) {
      route.meta._403 = true
      route.meta.menuHidden = true
      route.component = _403
    }
    return route
  })
  router.reset().setRoutes(routes)

  return routes
}

export default router

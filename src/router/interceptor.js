import store from '@/store'
import { Message } from 'element-ui'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['login'] // no redirect whitelist

export default function (router) {
  router.beforeEach(async (to, from, next) => {
    // start progress bar
    NProgress.start()

    // determine whether the user has logged in
    const token = store.getters['user/token']

    if (token) {
      if (to.name === 'login') {
        // if is logged in, redirect to the home page
        next({ name: 'home' })
        NProgress.done()
      } else {
        try {
          if (store.getters['user/routes']) {
            next()
          } else {
            const routes = await store.dispatch('user/resetRouter')
            const target = findAvailableRoute(to, routes)

            // hack method to ensure that addRoutes is complete
            // set the replace: true, so the navigation will not leave a history record
            next({
              path: target.fullPath || target.path,
              params: target.params,
              query: target.query,
              replace: true
            })
            NProgress.done()
          }
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/logout')
          Message.error(error || 'Has Error')
          next({ name: 'login', query: { redirect: to.fullPath } })
          NProgress.done()
        }
      }
    } else {
      if (whiteList.includes(to.name)) {
        // in the free login whitelist, go directly
        next()
      } else {
        // other pages that do not have permission to access are redirected to the login page.
        next({ name: 'login', query: { redirect: to.fullPath } })
        NProgress.done()
      }
    }
  })

  router.afterEach(() => {
    // finish progress bar
    NProgress.done()
  })

  function findAvailableRoute (to, routes) {
    // 首先判断当前目标路由是否可用
    let target = router.findRoute('path', to.path)

    if (target) {
      target.fullPath = target.fullPath || to.fullPath
    }

    if (target && target.redirect && !router.findRoute('path', target.redirect)) {
      // 路由不可用
      target = null
    }

    if (!target) {
      // 找到第一个可访问路由
      target = router.findFirstAvailableRoute(routes)
    }

    if (!target) {
      target = to
    }

    return target
  }
}

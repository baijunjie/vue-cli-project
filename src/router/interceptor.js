import store from '@/store'
import { Message } from 'element-ui'
import { asyncRoutes } from './routes'

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
          let permissionMap = store.getters['user/permissionMap']
          if (permissionMap) {
            next()
          } else {
            permissionMap = await store.dispatch('user/generatePermissionMap')
            const routes = router.filterRoutes(asyncRoutes, route => {
              const perm = route.meta && route.meta.perm
              return !perm || permissionMap[perm]
            })
            router.reset().setRoutes(routes)

            // hack method to ensure that addRoutes is complete
            // set the replace: true, so the navigation will not leave a history record
            next({ path: to.fullPath, params: to.params, query: to.query, replace: true })
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
}

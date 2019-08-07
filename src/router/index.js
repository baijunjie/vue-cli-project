import Vue from 'vue'
import Router from '@bjj/vue/Router'
import { baseRoutes } from './routes'
import interceptor from './interceptor'

Vue.use(Router)

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

export default router

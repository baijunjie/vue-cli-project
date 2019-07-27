import Vue from 'vue'
import Router from '@bjj/vue/Router'
import { baseRoutes } from './routes'
import interceptor from './interceptor'

Vue.use(Router)

const router = createRouter()
router.setRoutes(baseRoutes)
interceptor(router)

function createRouter () {
  return new Router({
    mode: 'history',
    base: process.env.VUE_APP_BASE_URL,
    scrollBehavior: () => ({ y: 0 })
  })
}

export function resetRouter () {
  router.replace(createRouter()) // reset router
}

export default router

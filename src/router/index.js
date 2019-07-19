import Vue from 'vue'
import Router from '@bjj/vue/Router'
import routes from './routes'
import interceptor from './interceptor'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.VUE_APP_BASE_URL
})

router.setRoutes(routes)
interceptor(router)

export default router

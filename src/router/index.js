import Vue from 'vue'
import Router from './Router'
import routes from './routes'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.VUE_APP_BASE_URL
})

router.setRoutes(routes)

export default router

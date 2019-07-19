import '@/core/meta'
import '@/core/filter'
import '@/core/ui'
import '@/core/permissions'
import Vue from 'vue'
import router from '@/router'
import store from '@/store'
import i18n from '@/i18n'
import App from './App.vue'

Vue.config.productionTip = false

// 登录验证钩子
router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !store.getters.userData) {
    router.push({
      name: 'login'
    })
  } else if (to.name === 'login' && store.getters.userData) {
    router.push({
      name: 'home'
    })
  } else {
    next()
  }
})

i18n.setLanguage('ja')
i18n.on('ready', () => {
  /* eslint-disable no-new */
  new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
  }).$mount('#app')
})

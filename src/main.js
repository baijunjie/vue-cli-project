import Vue from 'vue'
import router from '@/router'
import store from '@/store'
import i18n from '@/i18n'
import App from './App.vue'
import {
  sessionTimeoutValidate,
  getStorage,
  removeStorage
} from '@/utils'
import '@/core/meta'
import '@/core/ui'

Vue.config.productionTip = false

// 读取本地缓存的用户数据
if (!sessionTimeoutValidate('userData')) {
  removeStorage('userData')
}

// 登录验证钩子
router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !getStorage('userData')) {
    router.push({
      name: 'login'
    })
  } else {
    next()
  }
})

i18n.setLanguage('ja').finally(() => {
  /* eslint-disable no-new */
  new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
  }).$mount('#app')
})

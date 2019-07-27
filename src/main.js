import '@/core/meta'
import '@/core/filter'
import '@/core/ui'
import '@/core/permission'
import Vue from 'vue'
import router from '@/router'
import store from '@/store'
import i18n from '@/i18n'
import App from './App.vue'

Vue.config.productionTip = false

i18n.setLanguage(store.getters['app/language'])

i18n.on('ready', () => {
  /* eslint-disable no-new */
  new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
  }).$mount('#app')
})

import Vue from 'vue'
import ElementUI from 'element-ui'
import i18n from '@/i18n'
// import Popup from '@/components/Popup'

// Vue.use(Popup)

Vue.use(ElementUI, {
  i18n (...args) {
    return i18n.t(...args)
  }
})

i18n.on('loadLanguageDone', (e, locale) => {
  import(/* webpackChunkName: "element-ui-lang-[request]" */ `element-ui/lib/locale/lang/${locale}`)
    .then(messages => {
      i18n.setMessages(locale, messages.default)
    })
})

import Vue from 'vue'
import ElementUI from 'element-ui'
import i18n from '@/i18n'
// import Popup from '@/components/Popup'

// Vue.use(Popup)

Vue.use(ElementUI, {
  i18n (...args) {
    return i18n.t(args)
  }
})

i18n.on('requireLangDone', (e, locale) => {
  i18n.setMessages(locale, import(/* webpackChunkName: "element-ui-lang-[request]" */ `element-ui/lib/locale/lang/${locale}`))
})

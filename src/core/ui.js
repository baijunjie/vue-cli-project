import Vue from 'vue'
import ElementUI from 'element-ui'
import ja from 'element-ui/lib/locale/lang/ja'
import en from 'element-ui/lib/locale/lang/en'
import zhCN from 'element-ui/lib/locale/lang/zh-CN'
import i18n from '@/i18n'
// import Popup from '@/components/Popup'

// Vue.use(Popup)

Vue.use(ElementUI, {
  i18n (...args) {
    return i18n.t(args)
  }
})

i18n.on('requireLangDone', (e, locale) => {
  let messages
  switch (locale) {
    case 'ja':
      messages = ja
      break
    case 'en':
      messages = en
      break
    case 'zh-CN':
      messages = zhCN
      break
  }

  i18n.setMessages(locale, messages)
})

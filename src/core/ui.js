import Vue from 'vue'
import i18n from '@/i18n'
import ElementUI from 'element-ui'
import moment from 'moment'

// import Popup from '@/components/Popup'
// Vue.use(Popup)

// you do not need `import EsMenu from '@/components/ui/EsMenu'`
// it will auto require all UI components from components file
// const modulesFiles = require.context('@/components/elestyle', true, /\.vue$/)
// modulesFiles.keys().forEach(modulePath => {
//   const moduleName = modulePath
//     // './EsMenu.vue'       => 'EsMenu'
//     // './EsMenu/index.vue' => 'EsMenu'
//     // './EsMenu/Item.vue'  => 'EsMenu/Item'
//     .replace(/^\.\/(.*?)(\/index)?\.\w+$/, '$1')
//     // 'EsMenu/Item'  => 'EsMenuItem'
//     .replace('/', '')

//   // Shielding private child components
//   if (moduleName.indexOf('_') >= 0) return

//   const value = modulesFiles(modulePath)
//   Vue.component(moduleName, value.default)
// })

Vue.use(ElementUI, {
  i18n (...args) {
    return i18n.t(...args)
  }
})

export const momentLocaleMap = {
  'ja': 'ja',
  'en': 'en-au',
  'zh-CN': 'zh-cn',
  'zh-TW': 'zh-tw'
}

i18n.on('loadLanguageDone', (e, locale) => {
  import(/* webpackChunkName: "element-ui-lang-[request]" */ `element-ui/lib/locale/lang/${locale}`)
    .then(messages => {
      i18n.setMessages(locale, messages.default)
    })

  import(/* webpackChunkName: "moment-lang-[request]" */ `moment/locale/${momentLocaleMap[locale] || locale}`)
})

i18n.on('change', (e, locale) => {
  moment.locale(locale)
  // setTimeout(() => {
  //   console.log(moment().add(3, 'days').calendar())
  // }, 1000)
})

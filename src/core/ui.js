import Vue from 'vue'
import ElementUI from 'element-ui'
import i18n from '@/i18n'

// import Popup from '@/components/Popup'
// Vue.use(Popup)

// you do not need `import Switch from '@/components/ui/EsSwitch'`
// it will auto require all UI components from components file
const modulesFiles = require.context('@/components/elestyle', true, /\.vue$/)
modulesFiles.keys().forEach(modulePath => {
  // set './EsSwitch.vue'       => 'EsSwitch'
  // set './EsSwitch/index.vue' => 'EsSwitch'
  const moduleName = modulePath.replace(/^\.\/(.*?)(\/index)?\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  Vue.component(moduleName, value.default)
})

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

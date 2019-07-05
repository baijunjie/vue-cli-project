import Vue from 'vue'
import I18n from './I18n'
import i18nMixin from './mixin'

Vue.use(I18n)
Vue.mixin(i18nMixin)

I18n.prototype.getLanguage = function (locale) {
  return import(/* webpackChunkName: "lang-[request]" */ `../../public/data/i18n/${locale}.json`)
}

const numberFormats = {
  'en': {
    currency: {
      style: 'currency', currency: 'USD'
    }
  },
  'ja': {
    currency: {
      style: 'currency', currency: 'JPY', currencyDisplay: 'symbol'
    }
  }
}

const i18n = new I18n({
  numberFormats
})

i18n.config({
  fallbackLocale: 'ja',
  paths: {
    'ja': 'ja',
    'en': 'en',
    'zh-CN': 'zh-CN'
  }
})

export default i18n

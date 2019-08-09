import Vue from 'vue'
import I18n from '@bjj/vue/I18n'
import i18nMixin from '@bjj/vue/I18n/mixin'

Vue.use(I18n)
Vue.mixin(i18nMixin)

I18n.prototype.loadLanguage = function (locale) {
  return import(/* webpackChunkName: "lang-[request]" */ `../../public/data/i18n/${locale}.json`).then(res => res.default)
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
  locale: 'ja',
  fallbackLocale: 'ja',
  localePaths: {
    'ja': 'ja',
    'en': 'en',
    'zh-CN': 'zh-CN',
    'zh-TW': 'zh-TW'
  },
  numberFormats
})

Object.defineProperty(i18n, 'languageMap', {
  get () {
    return {
      'ja': '日本語',
      'en': 'English',
      'zh-CN': '简体中文',
      'zh-TW': '繁體中文'
    }
  }
})

export default i18n

import Vue from 'vue'
import moment from 'moment'
import get from 'lodash/get'
import padEnd from 'lodash/padEnd'

const filters = {
  number (val, fraction) {
    if (val) {
      const parts = (val + '').split('.')
      if (fraction) {
        return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' + padEnd(parts[1] || '', fraction, '0').substring(0, fraction)
      } else {
        return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      }
    } else {
      return val
    }
  },

  currency (val, currency) {
    return filters.number(val, currency === 'JPY' ? 0 : 2)
  },

  date (val, format = 'YYYY/MM/DD HH:mm:ss') {
    if (val) {
      return moment(val).format(format)
    } else {
      return val
    }
  },

  day (val, format = 'DD') {
    if (val) {
      return moment(val).format(format)
    } else {
      return val
    }
  },

  path (val, path) {
    if (val) {
      return get(val, path)
    } else {
      return val
    }
  },

  cdn (val) {
    if (val && val.indexOf('http') !== 0) {
      return process.env.VUE_APP_IMAGE_CDN + val
    } else {
      return val
    }
  },

  cdnReplace (val) {
    if (val && val.indexOf(process.env.VUE_APP_IMAGE_CDN) === 0) {
      return val.replace(process.env.VUE_APP_IMAGE_CDN, '')
    } else {
      return val
    }
  }
}

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.prototype.$filters = filters

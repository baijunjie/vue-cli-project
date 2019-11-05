import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
import i18n from '@/i18n'
import store from '@/store'

// set default headers
// ?statusSet[]=20&statusSet[]=10 => ?statusSet=20&statusSet=10
axios.defaults.paramsSerializer = function (params) {
  return qs.stringify(params, { arrayFormat: 'repeat' })
}

// create an axios instance
const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production'
    ? process.env.VUE_APP_API_URL
    : '/api', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
  headers: {
    'Content-Type': 'application/json'
  }
})

const err = (error) => {
  console.log('error :', error) // for debug

  if (error.response) {
    const { data, status } = error.response
    let message = i18n.isDefine(key) && i18n.t(key)

    if (!message) {
      if (status === 401) {
        message = i18n.t('error.unauthorized')
        if (store.getters['user/token']) {
          store.dispatch('user/logout').then(() => {
            setTimeout(() => {
              window.location.reload()
            }, 1500)
          })
        }
      } else {
        message = data.message || i18n.t('error.unknown')
      }
    }

    Message({
      message,
      type: 'error',
      duration: 5 * 1000
    })
  }

  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (i18n.locale) config.headers['Accept-Language'] = i18n.locale

    const token = store.getters['user/token']
    if (token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['X-Token'] = token
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  err
)

// response interceptor
service.interceptors.response.use(
  response => response.data,
  err
)

export default service

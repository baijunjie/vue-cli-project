import _ from 'lodash'
import store from '@/store'
export * from '@bjj/utils'
export * from '@bjj/utils-browser'

// 打印log (用于过滤 vue 生成的 getter、setter)
export function log () {
  let args = []
  Array.prototype.forEach.call(arguments, arg => {
    if (typeof arg === 'object') {
      args.push(_.merge({}, arg))
    } else {
      args.push(arg)
    }
  })
  /* eslint-disable no-console */
  console.log(...args)
}

// 退出登录
export function logout () {
  store.commit('SET_USER', null)
  location.reload()
}

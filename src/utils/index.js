import _ from 'lodash'
export * from '@bjj/utils'
export * from '@bjj/utils-browser'
export { default as request } from './request'

// 打印log (用于过滤 vue 生成的 getter、setter)
export function log () {
  if (process.env.NODE_ENV === 'production') return

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

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

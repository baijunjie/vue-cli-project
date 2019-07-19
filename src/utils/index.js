import _ from 'lodash'
import store from '@/store'
export { default as cache } from './cache'

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

/**
 * 为对象的 key 排序，返回一个新对象
 * @param src
 * @param order {Array} 一个 key 数组，对象将会按照数组中 key 的顺序为对象排序
 * @returns {Object}
 */
export function sortKey (src, order = null) {
  let arr = _.toPairs(src)
  arr = _.orderBy(arr, [0]).sort((a, b) => {
    const ak = a[0]
    const bk = b[0]
    if (_.isEmpty(order)) return ak.localeCompare(bk)

    const ai = order.indexOf(ak)
    const bi = order.indexOf(bk)
    if (ai < 0 && bi < 0) return ak.localeCompare(bk)
    else if (ai === bi) return 0
    else return ai < bi ? -1 : 1
  })
  return _.fromPairs(arr)
}

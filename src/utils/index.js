import _ from 'lodash'

// 获取本地存储数据
export function getStorage (key) {
  let value = localStorage.getItem(key)
  try {
    value = JSON.parse(value)
  } catch (err) {}
  return value
}

// 本地存储数据
export function setStorage (key, value) {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  return localStorage.setItem(key, value)
}

// 移除本地存储数据
export function removeStorage (key) {
  return localStorage.removeItem(key)
}

// Session timeout validate
export function sessionTimeoutValidate (key) {
  let validTime = 8.64e7

  let data = getStorage(key)
  if (data &&
    data.createDate &&
    data.createDate + validTime > Date.now()) {
    return data
  } else {
    removeStorage(key)
    return null
  }
}

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
  console.log(...args)
}

// 退出登录
export function logout () {
  removeStorage('userData')
  location.reload()
}

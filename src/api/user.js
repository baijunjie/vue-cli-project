import { request } from '@/utils'

export function login (data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function logout () {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

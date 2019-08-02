import { cache } from '@bjj/utils-browser'
import { generatePermissionsMap } from '@/core/permission'
// import { login, logout } from '@/api/user'

export default {
  namespaced: true,
  state () {
    const userData = cache.get('userData') || {}
    return {
      info: userData.info,
      token: userData.token,
      role: userData.role,
      permissionMap: null
    }
  },
  getters: {
    info (state) {
      return state.info
    },
    token (state) {
      return state.token
    },
    role (state) {
      return state.role
    },
    permissionMap (state) {
      return state.permissionMap
    }
  },
  mutations: {
    SET_USER (state, data) {
      const { token, role, ...info } = data
      state.info = info
      state.token = token
      state.role = role

      cache.set(
        'userData',
        {
          info,
          token,
          role
        }
        // 8.64e7
      )
    },
    CLEAR_USER (state) {
      state.info = null
      state.token = ''
      state.role = ''
      cache.del('userData')
    },
    SET_PERMISSIONS_MAP (state, data) {
      state.permissionMap = data
    }
  },
  actions: {
    async login ({ commit }, { username, password }) {
      // const res = await login({ username: username.trim(), password })
      // 模拟登陆
      const res = await new Promise(resolve => {
        setTimeout(() => {
          resolve({
            token: 'xxx',
            role: 'ROLE_ADMIN'
          })
        }, 1000)
      })
      commit('SET_USER', res)
    },
    async logout ({ commit }) {
      commit('CLEAR_USER')
      // await logout()
    },
    generatePermissionMap ({ commit, getters }) {
      const permissionsMap = generatePermissionsMap(getters.role)
      commit('SET_PERMISSIONS_MAP', permissionsMap)
      return permissionsMap
    }
  }
}

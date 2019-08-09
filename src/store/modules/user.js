import { cache } from '@bjj/utils-browser'
import { generatePermissionMap } from '@/core/permission'
// import { login, logout } from '@/api/user'

export default {
  namespaced: true,
  state () {
    const userData = cache.get('userData') || {}
    return {
      info: userData.info || {},
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
      state.info = {}
      state.token = ''
      state.role = ''
      state.permissionMap = null
      cache.del('userData')
    },
    SET_PERMISSION_MAP (state, data) {
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
      const permissionsMap = generatePermissionMap(getters.role)
      commit('SET_PERMISSION_MAP', permissionsMap)
      return permissionsMap
    }
  }
}

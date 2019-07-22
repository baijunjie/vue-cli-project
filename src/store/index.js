import Vue from 'vue'
import Vuex from 'vuex'
import storeMixin from './mixin'
import { cache } from '@/utils'

Vue.use(Vuex)
Vue.mixin(storeMixin)

export default new Vuex.Store({
  state: () => ({
    userData: null
  }),
  getters: {
    userData (state) {
      // 这里必需有 state 的读取操作，否则返回结果会被缓存
      // 也就是说这个 getter 永远只会返回第一次访问的值
      state.userData = cache.get('userData')
      return state.userData
    }
  },
  mutations: {
    SET_USER (state, userData) {
      state.userData = userData
      cache.set('userData', userData, 8.64e7)
    }
  },
  actions: {

  }
})

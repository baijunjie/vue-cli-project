import { cache } from '@bjj/utils-browser'

export default {
  namespaced: true,
  state: () => ({
    sidebar: {
      opened: cache.get('sidebarStatus') ? !!+cache.get('sidebarStatus') : true,
      withoutAnimation: false
    },
    device: 'desktop',
    language: cache.get('language') || 'ja'
  }),
  getters: {
    language (state) {
      return state.language
    }
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
      if (state.sidebar.opened) {
        cache.set('sidebarStatus', 1)
      } else {
        cache.set('sidebarStatus', 0)
      }
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      cache.set('sidebarStatus', 0)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
      cache.set('language', language)
    }
  },
  actions: {
    toggleSideBar ({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    closeSideBar ({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice ({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    setLanguage ({ commit }, language) {
      commit('SET_LANGUAGE', language)
    }
  }
}

import store from '@/store'

export default function (router) {
  router.beforeEach((to, from, next) => {
    if (to.name !== 'login' && !store.getters.userData) {
      router.push({
        name: 'login'
      })
    } else if (to.name === 'login' && store.getters.userData) {
      router.push({
        name: 'home'
      })
    } else {
      next()
    }
  })
}

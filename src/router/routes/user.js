export default {
  path: 'user',
  redirect: 'user/login',
  children: [
    {
      name: 'login',
      meta: {
        title: 'views.Login.name'
      },
      component: () => import(/* webpackChunkName: "user" */ '@/views/Login')
    }
  ]
}

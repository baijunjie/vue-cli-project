import user from './user'
import admin from './admin'

export const baseRoutes = [
  user,
  {
    name: '404',
    meta: {
      title: 'views.404.name',
      menuHidden: true
    },
    component: () => import('@/views/404')
  }
]

export const asyncRoutes = [
  admin,
  {
    path: '*', redirect: '/404'
  }
]

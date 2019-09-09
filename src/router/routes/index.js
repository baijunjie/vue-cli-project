import user from './user'
import admin from './admin'

export const baseRoutes = [
  user
]

export const asyncRoutes = [
  admin,
  {
    name: '404',
    path: '*',
    meta: {
      title: 'views.404.name',
      menuHidden: true
    },
    component: () => import('@/views/exception/404')
  }
]

import { Frame } from '@/layouts'

export default {
  name: 'home',
  path: '',
  meta: {
    title: 'views.Home.name',
    icon: 'tachometer-alt'
  },
  layout: Frame,
  component: () => import('@/views/Home'),
  children: [
    {
      path: 'demo',
      redirect: 'demo/foo',
      meta: {
        title: 'views.demo.name',
        icon: 'file',
        perm: 'admin__demo_read',
        breadcrumbHidden: true
      },
      children: [
        {
          name: 'foo',
          meta: {
            title: 'views.demo.Foo.name',
            icon: 'file',
            perm: 'admin__demo_read'
          },
          component: () => import('@/views/demo/Foo')
        },
        {
          name: 'bar',
          meta: {
            title: 'views.demo.Bar.name',
            icon: 'file',
            perm: 'admin__demo_read'
          },
          component: () => import('@/views/demo/Bar')
        }
      ]
    }
  ]
}

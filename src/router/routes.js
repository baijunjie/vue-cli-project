const Login = {
  name: 'login',
  meta: {
    i18n: 'views.Login.name'
  },
  component: () => import('@/views/Login')
}

const Home = {
  name: 'home',
  path: '',
  meta: {
    i18n: 'views.Home.name',
    icon: 'fa fa-home',
    frame: true
  },
  component: () => import('@/components/Frame'),
  defaultChild: () => import('@/views/Home')
}

const Foo = {
  name: 'foo',
  meta: {
    i18n: 'views.demo.Foo.name',
    icon: 'fa fa-file'
  },
  component: () => import('@/views/demo/Foo')
}

const Bar = {
  name: 'bar',
  meta: {
    i18n: 'views.demo.Bar.name',
    icon: 'fa fa-file'
  },
  component: () => import('@/views/demo/Bar')
}

const P404 = {
  name: '404',
  path: '/*',
  meta: {
    i18n: 'views.404.name',
    hide: true
  },
  component: () => import('@/views/404')
}

// 定义页面之间的父子关系
export default [
  Login,
  {
    ...Home,
    children: [
      {
        ...Foo,
        children: [
          Bar
        ]
      },
      P404
    ]
  }
]

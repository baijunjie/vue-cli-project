const Login = {
  name: 'login',
  meta: {
    title: 'views.Login.name'
  },
  component: () => import('@/views/Login')
}

const Home = {
  name: 'home',
  path: '',
  meta: {
    title: 'views.Home.name',
    icon: 'fa fa-home'
  },
  component: () => import('@/views/Home'),
  layout: () => import('@/layouts/Frame')
}

const demo = {
  path: 'demo',
  redirect: 'demo/foo',
  meta: {
    title: 'menu.demo',
    icon: 'fa fa-file'
  }
}

const Foo = {
  name: 'foo',
  meta: {
    title: 'views.demo.Foo.name',
    icon: 'fa fa-file'
  },
  component: () => import('@/views/demo/Foo')
}

const Bar = {
  name: 'bar',
  meta: {
    title: 'views.demo.Bar.name',
    icon: 'fa fa-file'
  },
  component: () => import('@/views/demo/Bar')
}

const P404 = {
  name: '404',
  path: '/*',
  meta: {
    title: 'views.404.name',
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
        ...demo,
        children: [
          Foo,
          Bar
        ]
      },
      P404
    ]
  }
]

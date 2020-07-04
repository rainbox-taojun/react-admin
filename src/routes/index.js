const routes = [
  {
    path: '/home',
    name: 'home',
    component: '../../views/Home',
  },

  {
    path: '/bar',
    name: 'bar',
    children: [
      {
        path: '/bar/index',
        name: 'barIndex',
        component: '../../views/Bar',
      },
      {
        path: '/bar/foo',
        name: 'foo',
        component: '../../views/Bar/Foo'
      }
    ]
  }
]

export default routes
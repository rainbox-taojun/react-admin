import React from 'react'
import Loadable from 'react-loadable'

const MyLoadingComponent = ({ isLoading, error }) => {
  // Handle the loading state
  if (isLoading) {
    return <div>Loading...</div>
  } else if (error) {
    console.log(error)
    return <div>Sorry, there was a problem loading the page.</div>

  } else {
    return null
  }
}

const Home = Loadable({
  loader: () => import('../views/Home'),
  loading: MyLoadingComponent
})
const Bar = Loadable({
  loader: () => import('../views/Bar'),
  loading: MyLoadingComponent
})
const Foo = Loadable({
  loader: () => import('../views/Bar/Foo'),
  loading: MyLoadingComponent
})

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home
  },

  {
    path: '/bar',
    name: 'bar',
    children: [
      {
        path: '/bar/index',
        name: 'barIndex',
        component: Bar
      },
      {
        path: '/bar/foo',
        name: 'foo',
        component: Foo
      }
    ]
  }
]

export default routes
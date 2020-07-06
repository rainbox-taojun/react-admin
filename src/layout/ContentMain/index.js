import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import routes from '../../routes/'

function getRoute(route) {
  if (Reflect.has(route, 'children') && route.children.length > 0) {
    return route.children.map(item => getRoute(item))
  } else {
    return (
      <Route 
        exact
        path={route.path}
        key={route.path}
        component={route.component}
      />
    )
  }
}

class ContentMain extends React.Component {
  render() {
    return (
      <Switch>
        {routes.map(item => getRoute(item))}
        <Redirect exact from='/' to='/home'/>
      </Switch>
    )
  }
}

export default ContentMain
import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from '../../views/Home'
import Bar from '../../views/Bar'
import Foo from '../../views/Bar/Foo'

class ContentMain extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/home' component={Home}/>

        <Route exact path='/bar/index' component={Bar}/>
        <Route exact path='/bar/foo' component={Foo}/>

        <Redirect exact from='/' to='/home'/>
      </Switch>
    )
  }
}

export default ContentMain
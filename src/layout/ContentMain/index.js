import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from '../../routes/Home'
import Bar from '../../routes/Bar'
import Foo from '../../routes/Bar/Foo'

class ContentMain extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/home' component={Home}/>

        <Route exact path='/bar' component={Bar}/>
        <Route exact path='/bar/foo' component={Foo}/>

        <Redirect exact from='/' to='/home'/>
      </Switch>
    )
  }
}

export default ContentMain
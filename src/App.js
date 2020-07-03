import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Index from './routes/Index/index'

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' component={Index}/>
      </Switch>
    </Router>
  );
}

export default App

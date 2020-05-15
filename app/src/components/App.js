import React, { Component } from 'react'
import CreateSession from './CreateSession'
import Home from './Home'
import Header from './Header'
import Login from './Login'
import Session from './Session'
import { Switch, Route } from 'react-router-dom'

class App extends Component {
  render () {
    return (
      <div className='center w85'>
        <Header />
        <div className='ph3 pv1 background-gray'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/session/:id' component={Session} />
            <Route exact path='/create_session' component={CreateSession} />
            <Route exact path='/login' component={Login} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App

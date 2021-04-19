import { Home } from 'pages/Home/Home'
import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

export const AuthRouter = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/home" component={Home} />
        <Redirect to="/" />
      </Switch>
    </div>
  )
}

import React from 'react'
import { BrowserRouter, Switch, Redirect } from 'react-router-dom'
import Home from 'pages/Home/Home'
import Login from 'pages/Login/Login'
import AppRouter from 'components/AppRoute/AppRouter'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/inicio" />
        <AppRouter path="/:page?" exact component={Home} />
        <AppRouter path="/login" exact component={Login} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes

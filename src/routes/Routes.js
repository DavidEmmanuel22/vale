import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import Home from 'pages/Home/Home'
import AppRouter from 'components/AppRoute/AppRouter'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <AppRouter path="/:page?" exact component={Home} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes

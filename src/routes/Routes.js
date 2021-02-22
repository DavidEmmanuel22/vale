import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import Home from 'pages/Home/Home'
import AppRouter from 'components/AppRoute/AppRouter'
import Dashboard from 'pages/Dashboard/Dashboard'
import DashboardPerfil from 'pages/DashboardPerfil/DashboardPerfil'
import DashboardLayout from 'components/Layouts/DashboardLayout/DashboardLayout'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <AppRouter exact path="/" component={Home} />
        <AppRouter
          exact
          path="/dashboard/perfil"
          component={DashboardPerfil}
          layout={DashboardLayout}
        />
        <AppRouter
          exact
          path="/dashboard/"
          component={Dashboard}
          layout={DashboardLayout}
        />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes

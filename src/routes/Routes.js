import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from 'pages/Home/Home'
import AppRouter from 'components/AppRoute/AppRouter'
import Dashboard from 'pages/Dashboard/Dashboard'
import DashboardPerfil from 'pages/DashboardPerfil/DashboardPerfil'
import DashboardLayout from 'components/Layouts/DashboardLayout/DashboardLayout'
import GeneralLayout from 'components/Layouts/DashboardLayout/GeneralLayout'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/dashboard/profile">
          <GeneralLayout>
            <DashboardPerfil></DashboardPerfil>
          </GeneralLayout>
        </Route>

        <Route path="/dashboard/valedores">
          <GeneralLayout>
            <h1>Valedores</h1>
          </GeneralLayout>
        </Route>

        <Route path="/dashboard/negocios">
          <GeneralLayout>
            <h1>Negocios</h1>
          </GeneralLayout>
        </Route>

        <Route path="/dashboard">
          <GeneralLayout>
            <Dashboard></Dashboard>
          </GeneralLayout>
        </Route>

        <Route path="/">
          <Home></Home>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Routes

import React, { useContext, Fragment } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Dashboard from 'pages/Dashboard/Dashboard'
import DashboardPerfil from 'pages/DashboardPerfil/DashboardPerfil'
import GeneralLayout from 'components/Layouts/DashboardLayout/GeneralLayout'
import { UserContext } from '../context/userContext'
import PrivateRoute from './PrivateRoute'

const Routes = () => {
  const { isAuthenticated } = useContext(UserContext)

  return (
    <Switch>
      <PrivateRoute exact path="/dashboard/profile">
        <GeneralLayout>
          <DashboardPerfil></DashboardPerfil>
        </GeneralLayout>
      </PrivateRoute>

      <PrivateRoute exact path="/dashboard/valedores">
        <GeneralLayout>
          <h1>Valedores</h1>
        </GeneralLayout>
      </PrivateRoute>

      <PrivateRoute exact path="/dashboard/negocios">
        <GeneralLayout>
          <h1>Negocios</h1>
        </GeneralLayout>
      </PrivateRoute>

      <PrivateRoute path="/dashboard">
        <GeneralLayout>
          <Dashboard></Dashboard>
        </GeneralLayout>
      </PrivateRoute>

      <Route exact path="/">
        <Home></Home>
      </Route>
    </Switch>
  )
}

export default Routes

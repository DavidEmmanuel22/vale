import React, { useContext } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Home } from '../pages/Home/Home'
import { Dashboard } from 'pages/Dashboard/Dashboard'
import ForgotPassword from 'components/ForgotPasword/ForgotPassword'
import UpdatePassword from 'components/ResetPassword/UpdatePassword'
import { DashboardPerfil } from 'pages/DashboardPerfil/DashboardPerfil'
import GeneralLayout from 'components/Layouts/DashboardLayout/GeneralLayout'
import Historial from 'pages/valedores/Historial'
import { UserContext } from '../context/userContext'
import PrivateRoute from './PrivateRoute'
import Valedores from 'pages/valedores/Valedores'
import Negocios from 'pages/negocios/Negocios'

const Routes = () => {
  const { isAuthenticated } = useContext(UserContext)

  return (
    <Switch>
      <PrivateRoute
        isAuthenticated={isAuthenticated}
        exact
        path="/dashboard/profile"
      >
        <GeneralLayout>
          <DashboardPerfil></DashboardPerfil>
        </GeneralLayout>
      </PrivateRoute>

      <PrivateRoute
        exact
        isAuthenticated={isAuthenticated}
        path="/dashboard/valedores"
      >
        <GeneralLayout>
          <Valedores></Valedores>
        </GeneralLayout>
      </PrivateRoute>

      <PrivateRoute
        exact
        isAuthenticated={isAuthenticated}
        path="/valedores/history"
      >
        <GeneralLayout>
          <Historial></Historial>
        </GeneralLayout>
      </PrivateRoute>

      <PrivateRoute
        isAuthenticated={isAuthenticated}
        exact
        path="/dashboard/negocios"
      >
        <GeneralLayout>
          <Negocios></Negocios>
        </GeneralLayout>
      </PrivateRoute>

      <PrivateRoute isAuthenticated={isAuthenticated} path="/dashboard">
        <GeneralLayout>
          <Dashboard></Dashboard>
        </GeneralLayout>
      </PrivateRoute>

      <Route exact path="/forgot-password">
        <ForgotPassword></ForgotPassword>
      </Route>

      <Route exact path="/update-password/:token">
        <UpdatePassword></UpdatePassword>
      </Route>

      <Route exact path="/">
        <Home></Home>
      </Route>
    </Switch>
  )
}

export default Routes

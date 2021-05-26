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
import Contact from 'pages/Contact/Contact'
import dashboardRoutes from './dashboardRoutes'
import historyRoute from './history'
import { Mail } from 'pages/Mail/Mail'

const Routes = () => {
  const { isAuthenticated } = useContext(UserContext)
  console.log(isAuthenticated)

  return (
    <Switch>
      {dashboardRoutes.map((route, index) => (
        <PrivateRoute
          key={index}
          isAuthenticated={isAuthenticated}
          exact
          path={route.path}
        >
          <GeneralLayout routes={dashboardRoutes}>
            <route.component></route.component>
          </GeneralLayout>
        </PrivateRoute>
      ))}

      <PrivateRoute
        exact
        isAuthenticated={isAuthenticated}
        path="/valedores/history"
      >
        <GeneralLayout routes={dashboardRoutes}>
          <Historial />
        </GeneralLayout>
      </PrivateRoute>
      <Route exact path="/forgot-password">
        <ForgotPassword />
      </Route>

      <Route exact path="/update-password/:token">
        <UpdatePassword />
      </Route>

      <Route exact path="/mail">
        <Mail />
      </Route>

      <Route exact path="/contact">
        <Contact />
      </Route>

      <Route exact path="/">
        <Home />
      </Route>
    </Switch>
  )
}

export default Routes

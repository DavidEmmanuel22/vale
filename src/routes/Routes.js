import React, { useContext } from 'react'
import { Switch, Route } from 'react-router-dom'
import { ClientNavBar, Home } from '../pages/Home/Home'
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
import valedorRoutes from './valedorDashboardRoute'
import historyRoute from './history'
import { Mail } from 'pages/Mail/Mail'
import { Vale } from 'pages/valedores/Vale'
import { Business } from 'components/Business/Business'

const Routes = () => {
  const { isAuthenticated, user } = useContext(UserContext)

  return (
    <Switch>
      {user.role === 'Admin' &&
        dashboardRoutes.map((route, index) => (
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

      {user.role === 'Valedor' &&
        valedorRoutes.map((route, index) => (
          <PrivateRoute
            key={index}
            isAuthenticated={isAuthenticated}
            exact
            path={route.path}
          >
            <GeneralLayout routes={valedorRoutes}>
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
        <ClientNavBar />
        <Mail />
      </Route>

      <Route exact path="/business">
        <Business />
      </Route>

      <Route exact path="/contact">
        <Contact />
      </Route>

      <Route exact path="/vale">
        <GeneralLayout routes={valedorRoutes}>
          <Vale />
        </GeneralLayout>
      </Route>

      <Route exact path="/">
        <Home />
      </Route>
    </Switch>
  )
}

export default Routes

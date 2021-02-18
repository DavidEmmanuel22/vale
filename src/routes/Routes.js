import React from 'react'
// import UserContext from 'hooks/UserContext'
import { BrowserRouter, Switch } from 'react-router-dom'
import Home from 'pages/Home/Home'
import AppRouter from 'components/AppRoute/AppRouter'
import DashboardLayout from 'components/Layouts/DashboardLayout/DashboardLayout'
// import Inicio from 'pages/Inicio/Inicio'

const Routes = () => {
  /* const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  }) */

  return (
    <BrowserRouter>
      <Switch>
        <AppRouter exact path="/" component={Home} />
        <AppRouter exact path="/dashboard" component={DashboardLayout} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes

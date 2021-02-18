import React, { useState } from 'react'
import UserContext from 'hooks/UserContext'
import { BrowserRouter, Switch } from 'react-router-dom'
// import Home from 'pages/Home/Home'
// import Login from 'pages/Login/Login'
import AppRouter from 'components/AppRoute/AppRouter'
import DashboardLayout from 'components/Layouts/DashboardLayout/DashboardLayout'
import TopBar from 'components/TopBar/TopBar'
import Home from 'pages/Home/Home'

const Routes = () => {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  })

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Switch>
          <AppRouter exact path="/api" component={TopBar} />
          <AppRouter exact path="/" component={Home} />
          <AppRouter exact path="/dashboard" component={DashboardLayout} />
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  )
}

export default Routes

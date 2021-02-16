import React, { useState } from 'react'
import UserContext from 'hooks/UserContext'
import { BrowserRouter, Switch, Redirect } from 'react-router-dom'
import Home from 'pages/Home/Home'
import Login from 'pages/Login/Login'
import AppRouter from 'components/AppRoute/AppRouter'

const Routes = () => {
  const [userData, setUserData] = useState({
    token: '',
    user: ''
  })

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Switch>
          <Redirect exact from="/" to="/inicio" />
          <AppRouter path="/:page?" exact component={Home} />
          <AppRouter path="/login" exact component={Login} />
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  )
}

export default Routes

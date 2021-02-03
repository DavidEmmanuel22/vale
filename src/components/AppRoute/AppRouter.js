import React from 'react'
import { Route } from 'react-router-dom'

const AppRouter = ({ exact, path, component: Component, ...rest }) => (
  <Route {...rest} render={(props) => <Component {...props} />}></Route>
)

export default AppRouter

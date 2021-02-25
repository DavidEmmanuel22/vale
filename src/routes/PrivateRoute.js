import React, { useContext } from 'react'
import { UserContext } from '../context/userContext'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ children, ...rest }) => {
  const { isAuthenticated } = useContext(UserContext)
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute

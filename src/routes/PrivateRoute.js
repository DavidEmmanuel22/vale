import React, { useRef, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ children, isAuthenticated, ...rest }) => {
  const refToScroll = useRef(null)

  const scrollToTop = () => {
    refToScroll.current.scrollIntoView({ behavior: 'smooth' })
  }
  useEffect(() => {
    scrollToTop()
  }, [])
  return (
    <div ref={refToScroll}>
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
    </div>
  )
}

export default PrivateRoute

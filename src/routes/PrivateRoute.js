import React, { useRef, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ children, isAuthenticated, ...rest }) => {
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }
  useEffect(() => {
    scrollToBottom()
  }, [])
  return (
    <div ref={messagesEndRef}>
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

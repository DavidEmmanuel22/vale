import React, { useState, useEffect, useMemo } from 'react'
import { UserContext } from './userContext'
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'

const ContextProvider = (props) => {
  const [user, setUser] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  useEffect(() => {
    if (user) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }, [user])

  const login = (token) => {
    localStorage.setItem('auth-token', token)
    const decoded = jwt_decode(token)
    setUser(decoded)
  }

  const logout = () => {
    localStorage.removeItem('auth-token')
    setUser(false)
  }

  useEffect(() => {
    const token = localStorage.getItem('auth-token')
    if (token) {
      const decoded = jwt_decode(token)
      console.log(decoded)
      setUser(decoded.user)
    } else {
      setUser(false)
    }
  }, [])

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        login,
        logout
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

export default ContextProvider

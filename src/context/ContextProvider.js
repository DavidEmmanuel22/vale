import React, { useState, useEffect, useMemo } from 'react'
import { UserContext } from './userContext'
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'

const ContextProvider = (props) => {
  const [user, setUser] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const [hasLoad, setHasLoad] = useState(false)

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
    setUser(decoded.user)
    setHasLoad(true)
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
      console.log(decoded.user)
    } else {
      setUser(false)
    }
    setHasLoad(true)
  }, [])

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        login,
        logout,
        hasLoad
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

export default ContextProvider

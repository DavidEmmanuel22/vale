import React, { useState, useEffect, useMemo } from 'react'
import { UserContext } from './userContext'
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'
import { func } from 'prop-types'

const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(false)
    const [loading, setLoading] = useState(true)
    const [drawOpen, setDrawOpen] = useState(false)
    const [showContact, setShowContact] = useState(true)

    // eslint-disable-next-line no-unneeded-ternary
    const isAuthenticated = user ? true : false

    useEffect(() => {
        const token = localStorage.getItem('auth-token')
        if (token) {
            const decoded = jwt_decode(token)
            setUser(decoded.user)
        } else {
            setUser(false)
        }
        setLoading(false)
    }, [])

    function login(token) {
        if (!token) {
            throw new Error('The token in neccessary to login')
        }
        localStorage.setItem('auth-token', token)
        const decoded = jwt_decode(token)
        setUser(decoded.user)
    }

    function logout() {
        localStorage.removeItem('auth-token')
        localStorage.removeItem('idChat')
        localStorage.removeItem('email')
        setUser(false)
    }

    const hiddeContactView = () => {
        setShowContact(false)
    }

    const showContactView = () => {
        setShowContact(true)
    }

    const handleDrawerOpen = () => {
        setDrawOpen(!drawOpen)
    }

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                isAuthenticated,
                login,
                logout,
                handleDrawerOpen,
                drawOpen,
                showContact,
                hiddeContactView,
                showContactView,
                hasLoad: !loading
            }}
        >
            {loading ? null : children}
        </UserContext.Provider>
    )
}

export default ContextProvider

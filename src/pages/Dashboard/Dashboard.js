import React, { useContext } from 'react'
import { UserContext } from '../../context/userContext'

const Dashboard = () => {
  const { isAuthenticated, user } = useContext(UserContext)

  return <h1>Dashboard</h1>
}

export default Dashboard

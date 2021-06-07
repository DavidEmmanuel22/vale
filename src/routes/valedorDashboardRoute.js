import {
  Contacts,
  Dashboard as DashboardIcon,
  Loyalty,
  People,
  Person,
  Store
} from '@material-ui/icons'
import { DashboardPerfil } from 'pages/DashboardPerfil/DashboardPerfil'
import Negocios from 'pages/negocios/Negocios'
import React from 'react'
import { Dashboard } from 'pages/Dashboard/Dashboard'
import { Mail } from 'pages/Mail/Mail'

const valedorDashboardRoute = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    component: Dashboard,
    user: 'administrator',
    icon: DashboardIcon
  },
  {
    name: 'Perfil',
    path: '/dashboard/perfil',
    component: DashboardPerfil,
    user: 'administrator',
    icon: Person
  },
  {
    name: 'Negocios',
    path: '/dashboard/negocios',
    component: Negocios,
    user: 'administrator',
    icon: Store
  },

  {
    name: 'Contactos',
    path: '/dashboard/contactos',
    component: Mail,
    user: 'administrator',
    icon: Contacts
  }
]

export default valedorDashboardRoute

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
import Valedores from 'pages/valedores/Valedores'
import History from 'pages/valedores/Historial'
import React from 'react'
import { Dashboard } from 'pages/Dashboard/Dashboard'

const dashboardRoutes = [
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
    name: 'Valedores',
    path: '/dashboard/valedores',
    component: Valedores,
    user: 'administrator',
    icon: People
  },
  {
    name: 'Negocios',
    path: '/dashboard/negocios',
    component: Negocios,
    user: 'administrator',
    icon: Store
  },
  {
    name: 'Compras',
    path: '/dashboard/compras',
    component: Dashboard,
    user: 'administrator',
    icon: Loyalty
  },
  {
    name: 'Contactos',
    path: '/dashboard/contactos',
    component: Dashboard,
    user: 'administrator',
    icon: Contacts
  },
  {
    name: 'History',
    path: '/history',
    component: History,
    user: 'administrator',
    icon: DashboardIcon
  }
]

export default dashboardRoutes

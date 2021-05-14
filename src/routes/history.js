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

const historyRoute = [
  {
    name: 'History',
    path: '/valedores/history',
    component: History,
    user: 'administrator',
    icon: DashboardIcon
  }
]

export default historyRoute

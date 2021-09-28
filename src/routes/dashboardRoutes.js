import { Contacts, Dashboard as DashboardIcon, Loyalty, People, Person, Store } from '@material-ui/icons'
import { DashboardPerfil } from 'pages/DashboardPerfil/DashboardPerfil'
import Negocios from 'pages/negocios/Negocios'
import Valedores from 'pages/valedores/Valedores'
import History from 'pages/valedores/Historial'
import React from 'react'
import { Dashboard } from 'pages/Dashboard/Dashboard'
import DashboardMessages from '../components/DashboardMessages/index'
import PaymentHistoryPage from 'pages/PaymentHistory'

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
        component: PaymentHistoryPage,
        user: 'administrator',
        icon: Loyalty
    },
    {
        name: 'Contactos',
        path: '/dashboard/contactos',
        component: DashboardMessages,
        user: 'administrator',
        icon: Contacts
    }
]

export default dashboardRoutes

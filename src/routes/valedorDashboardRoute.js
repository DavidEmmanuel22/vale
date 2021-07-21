import {
  Contacts,
  Dashboard as DashboardIcon,
  Loyalty,
  People,
  Person,
  Store
} from '@material-ui/icons'
import ValedorDashboardProfile from 'pages/DashboardPerfil/ValedorDashboardProfile'
import Negocios from 'pages/negocios/Negocios'
import ValedorDashboard from '../pages/Dashboard/ValedorDashboard'
import { Mail } from 'pages/Mail/Mail'

const valedorDashboardRoute = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    // eslint-disable-next-line react/display-name
    component: ValedorDashboard,
    user: 'valedor',
    icon: DashboardIcon
  },
  {
    name: 'Perfil',
    path: '/dashboard/perfil',
    component: ValedorDashboardProfile,
    user: 'valedor',
    icon: Person
  },
  {
    name: 'Negocios',
    path: '/dashboard/negocios',
    component: Negocios,
    user: 'valedor',
    icon: Store
  },

  {
    name: 'Contactos',
    path: '/dashboard/contactos',
    component: Mail,
    user: 'valedor',
    icon: Contacts
  }
]

export default valedorDashboardRoute

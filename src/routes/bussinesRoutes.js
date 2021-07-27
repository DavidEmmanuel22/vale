import {
  Contacts,
  Dashboard as DashboardIcon,
  Loyalty,
  People,
  Person,
  Store
} from '@material-ui/icons'
import BussinesProfile from 'pages/DashboardPerfil/BussinesProfile'
import ValedoresBussines from 'pages/negocios/ValedoresBussinesPage'
import BussinesDashboard from '../pages/Dashboard/BussinesDashboard'
import { Mail } from 'pages/Mail/Mail'

const BussinesRoutes = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    // eslint-disable-next-line react/display-name
    component: BussinesDashboard,
    user: 'valedor',
    icon: DashboardIcon
  },
  {
    name: 'Perfil',
    path: '/dashboard/perfil',
    component: BussinesProfile,
    user: 'valedor',
    icon: Person
  },
  {
    name: 'Negocios',
    path: '/dashboard/negocios',
    component: ValedoresBussines,
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

export default BussinesRoutes

import { Contacts, Dashboard as DashboardIcon, Loyalty, People, Person, Store } from '@material-ui/icons'
import HistoryIcon from '@material-ui/icons/History'
import BussinesProfile from 'pages/DashboardPerfil/BussinesProfile'
import ValedoresBussines from 'pages/negocios/ValedoresBussinesPage'
import BussinesDashboard from '../pages/Dashboard/BussinesDashboard'
import { Mail } from 'pages/Mail/Mail'
import SalesHistory from 'pages/BusinessSales/history'

const BussinesRoutes = [
    {
        name: 'Dashboard',
        path: '/dashboard',
        // eslint-disable-next-line react/display-name
        component: BussinesDashboard,
        icon: DashboardIcon
    },
    {
        name: 'Perfil',
        path: '/dashboard/perfil',
        component: BussinesProfile,
        icon: Person
    },
    {
        name: 'Negocios',
        path: '/dashboard/negocios',
        component: ValedoresBussines,
        icon: Store
    },
    {
        name: 'Historial de compras',
        path: '/dashboard/historial',
        component: SalesHistory,
        icon: HistoryIcon
    },
    {
        name: 'Contactos',
        path: '/dashboard/contactos',
        component: Mail,
        icon: Contacts
    }
]

export default BussinesRoutes

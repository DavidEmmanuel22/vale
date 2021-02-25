import React, { useContext } from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { Dashboard, Person, People, Store } from '@material-ui/icons'
import LoyaltyIcon from '@material-ui/icons/Loyalty'
import ContactsIcon from '@material-ui/icons/Contacts'
import { Link } from 'react-router-dom'
import HeaderRoutes from 'components/HeaderRoutes/HeaderRoutes'
import { Container, Button } from '@material-ui/core'
import { UserContext } from '../../../context/userContext'
import './Styles.css'

const drawerWidth = 280

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />
}

const Styles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    height: '100px',
    backgroundColor: 'white',
    position: 'absolute'
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    height: '100px',
    backgroundColor: 'white'
  },
  menuButton: {
    margin: '-7px -9px -39px',
    color: '#007772'
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: '#e5e5e5',
    height: '1000px',
    margin: '101px 0px 0px'
  },
  dividerLine: {
    margin: '30px 0px'
  },
  ButtonLogin: {
    marginLeft: 'auto',
    position: 'absolute',
    top: '21px',
    left: '84%',
    color: 'white',
    padding: '5px 11px',
    fontSize: '22px',
    boxShadow: '0 7px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%)',
    borderRadius: '20px',
    textTransform: 'capitalize',
    backgroundColor: '#f9a02b'
  }
}))

// eslint-disable-next-line react/prop-types
export default function GeneralLayout({ children }) {
  const classes = Styles()
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)
  const [selectedIndex, setSelectedIndex] = React.useState(1)

  const { isAuthenticated, user, logout } = useContext(UserContext)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open
            })}
          >
            <MenuIcon />
          </IconButton>
          <div style={{ display: 'flex', width: '100%' }}>
            <Typography variant="h6" noWrap></Typography>
            <Button
              className={classes.ButtonLogin}
              variant="contained"
              onClick={logout}
            />
            Logout
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
      >
        <div className={classes.toolbar}>
          <img style={{ width: '80%' }} src="/logo-appbar.png"></img>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <List style={{ marginTop: '62px', padding: '10px' }}>
          {/*     ADMIN ROUTES		*/}
          {
            <Link className="listLink" to="/dashboard">
              <ListItem
                button
                selected={selectedIndex === 0}
                onClick={(event) => handleListItemClick(event, 0)}
              >
                <ListItemIcon>
                  <Dashboard style={{ color: '#007772' }}></Dashboard>
                </ListItemIcon>
                <ListItemText style={{ color: 'grey' }} primary={'Dashboard'} />
              </ListItem>
            </Link>
          }
          {
            <Link className="listLink" to="/dashboard/profile">
              <ListItem
                button
                selected={selectedIndex === 1}
                onClick={(event) => handleListItemClick(event, 1)}
              >
                <ListItemIcon>
                  <Person style={{ color: '#007772' }} />
                </ListItemIcon>
                <ListItemText style={{ color: 'grey' }} primary={'Perfil'} />
              </ListItem>
            </Link>
          }
          {
            <Link className="listLink" to="/dashboard/valedores">
              <ListItem
                button
                selected={selectedIndex === 2}
                onClick={(event) => handleListItemClick(event, 2)}
              >
                <ListItemIcon>
                  <People style={{ color: '#007772' }} />
                </ListItemIcon>
                <ListItemText style={{ color: 'grey' }} primary={'Valedores'} />
              </ListItem>
            </Link>
          }
          {
            <Link className="listLink" to="/dashboard/negocios">
              <ListItem
                button
                selected={selectedIndex === 3}
                onClick={(event) => handleListItemClick(event, 3)}
              >
                <ListItemIcon>
                  <Store style={{ color: '#007772' }} />
                </ListItemIcon>
                <ListItemText style={{ color: 'grey' }} primary={'Negocios'} />
              </ListItem>
            </Link>
          }
          {
            <Link className="listLink" to="/dashboard/compras">
              <ListItem
                button
                selected={selectedIndex === 4}
                onClick={(event) => handleListItemClick(event, 4)}
              >
                <ListItemIcon>
                  <LoyaltyIcon style={{ color: '#007772' }}></LoyaltyIcon>
                </ListItemIcon>
                <ListItemText
                  style={{ color: 'grey' }}
                  primary={'Lista Compras'}
                />
              </ListItem>
            </Link>
          }
          {
            <Link className="listLink" to="/dashboard/contactos">
              <ListItem
                button
                selected={selectedIndex === 5}
                onClick={(event) => handleListItemClick(event, 5)}
              >
                <ListItemIcon>
                  <ContactsIcon style={{ color: '#007772' }}></ContactsIcon>
                </ListItemIcon>
                <ListItemText style={{ color: 'grey' }} primary={'Contactos'} />
              </ListItem>
            </Link>
          }
        </List>
      </Drawer>
      <main className={classes.content}>
        <HeaderRoutes />
        <Container maxWidth={false}>{children}</Container>
      </main>
    </div>
  )
}

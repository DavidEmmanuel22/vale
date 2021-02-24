import React from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import { Dashboard, Person, People, Store } from '@material-ui/icons'
import MailIcon from '@material-ui/icons/Mail'
import DashboardIcon from '@material-ui/icons/Dashboard'
import PersonIcon from '@material-ui/icons/Person'
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter'
import LoyaltyIcon from '@material-ui/icons/Loyalty'
import ContactsIcon from '@material-ui/icons/Contacts'
import { Link } from 'react-router-dom'
import HeaderRoutes from 'components/HeaderRoutes/HeaderRoutes'
import { Container, Button } from '@material-ui/core'

const drawerWidth = 280

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
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
    marginRight: 36
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
    ...theme.mixins.toolbar,
    minHeight: '100px'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}))

// eslint-disable-next-line react/prop-types
export default function GeneralLayout({ children }) {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

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
            <Typography variant="h6" noWrap>
            
            </Typography>
            <Button
              variant="contained"
              style={{ marginLeft: 'auto' }}
              color="secondary"
            >
              Logout
            </Button>
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
          <img style={{ width: '90%' }} src="/logo-appbar.png"></img>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List style={{ marginTop: '50px' }}>
          {/*     ADMIN ROUTES		*/}
          {
            <Link className="listLink" to="/dashboard">
              <ListItem button
               selected={selectedIndex === 0}
               onClick={(event) => handleListItemClick(event, 0)}
              >
                <ListItemIcon>
                  <Dashboard></Dashboard>
                </ListItemIcon>
                <ListItemText primary={'Dashboard'} />
              </ListItem>
            </Link>
          }
          {
            <Link className="listLink" to="/dashboard/profile">
              <ListItem button
              selected={selectedIndex === 1}
              onClick={(event) => handleListItemClick(event, 1)}
              >
                <ListItemIcon>
                  <Person/>
                </ListItemIcon>
                <ListItemText primary={'Perfil'} />
              </ListItem>
            </Link>
          }
          {
            <Link className="listLink" to="/dashboard/valedores">
              <ListItem button
               selected={selectedIndex === 2}
               onClick={(event) => handleListItemClick(event, 2)}
              >
                <ListItemIcon>
                  <People/>
                </ListItemIcon>
                <ListItemText primary={'Valedores'} />
              </ListItem>
            </Link>
          }
          {
            <Link className="listLink" to="/dashboard/negocios">
              <ListItem button
               selected={selectedIndex === 3}
               onClick={(event) => handleListItemClick(event, 3)}
              >
                <ListItemIcon>
                  <Store/>
                </ListItemIcon>
                <ListItemText primary={'Negocios'} />
              </ListItem>
            </Link>
          }
          {
            <Link className="listLink" to="/dashboard/compras">
              <ListItem button
               selected={selectedIndex === 4}
               onClick={(event) => handleListItemClick(event, 4)}
              >
                <ListItemIcon>
                  <LoyaltyIcon></LoyaltyIcon>
                </ListItemIcon>
                <ListItemText primary={'Lista Compras'} />
              </ListItem>
            </Link>
          }
          {
            <Link className="listLink" to="/dashboard/contactos">
              <ListItem button
              selected={selectedIndex === 5}
               onClick={(event) => handleListItemClick(event, 5)}
              >
                <ListItemIcon>
                  <ContactsIcon></ContactsIcon>
                </ListItemIcon>
                <ListItemText primary={'Contactos'} />
              </ListItem>
            </Link>
          }
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container maxWidth={false}>
          <HeaderRoutes />
          {children}
        </Container>
      </main>
    </div>
  )
}

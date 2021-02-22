import React, { useState } from 'react'
import clsx from 'clsx'
import {
  AppBar,
  Container,
  Toolbar,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  Button,
  Hidden
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { Dashboard, Person, People, Store } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import { ToastContextProvider } from 'hooks/ToastContext'
import Logo from 'components/Logo/Logo'
import HeaderRoutes from 'components/HeaderRoutes/HeaderRoutes'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import Styles from './Styles'

const sidebarConfig = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: Dashboard
  },
  {
    title: 'Perfil',
    href: '/dashboard/perfil',
    icon: Person
  },
  {
    title: 'Valedores',
    href: '/dashboard/valedor',
    icon: People
  },
  {
    title: 'Negocios',
    href: '/dashboard/negocio',
    icon: Store
  }
]

const DashboardLayout = ({ children }) => {
  const history = useHistory()

  const handleClick = (href) => () => {
    history.push(href)
  }

  const classes = Styles()
  const [open, setOpen] = useState(true)

  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }

  const LogOut = () => {
    localStorage.clear()
    history.push('/')
  }

  const content = (
    <Box height="1150px" display="flex" flexDirection="column">
      <Box
        p={2}
        display="flex"
        justifyContent="center"
        className={classes.MuiBox}
      >
        <List disablePadding component="nav" className={classes.w100}>
          {sidebarConfig.map(({ title, href, icon: Icon }, index) => (
            <ListItem button key={index}>
              <ListItemIcon className={classes.minWidth}>
                <Icon />
              </ListItemIcon>
              <ListItemText
                primary={title}
                className={classes.MuiItemText}
                onClick={handleClick(href)}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  )

  return (
    <ToastContextProvider>
      <div className={classes.root}>
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            ></Typography>
            <Hidden smDown>
              <Button
                className={classes.ButtonAppBar}
                size="small"
                onClick={LogOut}
              >
                Cerrar Sesión
              </Button>
            </Hidden>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <Logo />
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          {content}
        </Drawer>
        <div className={classes.wrapper}>
          <div className={classes.contentContainer}>
            <div className={classes.contentHeader}>
              <Container maxWidth={false}>
                <HeaderRoutes />
                {children}
              </Container>
            </div>
          </div>
        </div>
      </div>
    </ToastContextProvider>
  )
}

export default DashboardLayout

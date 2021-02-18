import React, { useState } from 'react'
import clsx from 'clsx'
import {
  AppBar,
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
import { Person, People, Store } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import Logo from 'components/Logo/Logo'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import Styles from './Styles'

const sidebarConfig = [
  {
    title: 'Perfil',
    href: '/dashboard',
    icon: Person
  },
  {
    title: 'Valedores',
    href: '/dashboard/Vales',
    icon: People
  },
  {
    title: 'Negocios',
    href: '/dashboard/Negocio',
    icon: Store
  }
]

const DashboardLayout = () => {
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
      <Box p={2} display="flex" justifyContent="center">
        <List disablePadding component="nav" className={classes.w100}>
          {sidebarConfig.map(({ title, href, icon: Icon }, index) => (
            <ListItem button key={index}>
              <ListItemIcon className={classes.minWidth}>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={title} onClick={handleClick(href)} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  )
  return (
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
    </div>
  )
}

export default DashboardLayout

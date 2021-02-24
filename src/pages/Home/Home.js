import React, { useState, useContext } from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import {
  Tabs,
  Tab,
  AppBar,
  Button,
  Hidden,
  SvgIcon,
  IconButton
} from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import Login from 'pages/Login/Login'
import PopUp from 'components/Dialog/PopUp'
import Logo from 'images/logo-appbar.png'
// import ContactUs from 'pages/ContactUs/Contact'
// import AboutUs from 'pages/AboutUs/AboutUs'
// import Business from 'pages/Business/Business'
// import Valedor from 'pages/Valedor/Valedor'
import Inicio from 'pages/Inicio/Inicio'
import Styles from './Styles'
import StylesTheme from './StylesTheme'
import { UserContext } from '../../context/userContext'

const Home = () => {
  const classes = Styles()

  const [openDialog, setOpenDialog] = useState(false)

  const { isAuthenticated, logout } = useContext(UserContext)

  const handleNavButton = () => {
    if (isAuthenticated) {
      logout()
    } else {
      setOpenDialog(true)
    }
  }

  return (
    <div>
      <ThemeProvider theme={StylesTheme}>
        <div className={classes.ContentLogo}>
          <img className={classes.ImgLogo} src={Logo} alt="logo"></img>
        </div>
        <AppBar position="static" color="transparent">
          <Hidden lgUp>
            <IconButton color="inherit">
              <SvgIcon fontSize="large" className={classes.SvgIconHam}>
                <Menu />
              </SvgIcon>
            </IconButton>
          </Hidden>
          <Hidden smDown>
            <Tabs indicatorColor="primary">
              <Tab label="Acerca de" />
              <Tab label="Valedor" />
              <Tab label="Negocios" />
              <Tab label="Contáctanos" />
            </Tabs>
          </Hidden>
        </AppBar>
        <Hidden smDown>
          <Button
            className={classes.ButtonAppBar}
            size="small"
            onClick={() => handleNavButton()}
          >
            {isAuthenticated ? 'Cerrar Sesion' : 'Iniciar Sesion'}
          </Button>
        </Hidden>
        <Inicio />
      </ThemeProvider>
      <div>
        <PopUp openDialog={openDialog} setOpenDialog={setOpenDialog}>
          <Login />
        </PopUp>
      </div>
    </div>
  )
}

export default Home

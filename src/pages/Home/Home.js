import React, { useState } from 'react'
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
import Drawer from 'components/Drawer/Drawer'
import PopUp from 'components/Dialog/PopUp'
import Inicio from 'pages/Inicio/Inicio'
import ContactUs from 'pages/ContactUs/Contact'
import AboutUs from 'pages/AboutUs/AboutUs'
import Business from 'pages/Business/Business'
import Valedor from 'pages/Valedor/Valedor'
import StylesTheme from './StylesTheme'
import Logo from 'images/logo-appbar.png'
import Styles from './Styles'

const Home = (props) => {
  const classes = Styles()
  const { match, history, onMobileOpen } = props
  const { params } = match
  const { page } = params

  const tabNameToIndex = {
    0: 'inicio',
    1: 'about',
    2: 'valedor',
    3: 'negocio',
    4: 'contáctanos'
  }

  const indexToTabName = {
    inicio: 0,
    about: 1,
    valedor: 2,
    negocio: 3,
    contáctanos: 4
  }

  const [selectedTab, setSelectedTab] = React.useState(indexToTabName[page])
  const [openDialog, setOpenDialog] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const handleMobileOpen = () => setIsMobile(() => true)

  const handleMobileClose = () => setIsMobile(() => false)

  const handleChange = (event, newValue) => {
    history.push(`/${tabNameToIndex[newValue]}`)
    setSelectedTab(newValue)
  }

  return (
    <div>
      <ThemeProvider theme={StylesTheme}>
        <Hidden>
          <div className={classes.ContentLogo}>
            <img className={classes.ImgLogo} src={Logo} alt="logo"></img>
          </div>
        </Hidden>
        <AppBar
          position="static"
          color="transparent"
          onMobileOpen={handleMobileOpen}
        >
          <Hidden lgUp>
            <IconButton color="inherit" onClick={onMobileOpen}>
              <SvgIcon fontSize="large" className={classes.SvgIconHam}>
                <Menu />
              </SvgIcon>
            </IconButton>
          </Hidden>
          <Drawer onMobileClose={handleMobileClose} openMobile={isMobile} />
          <Hidden smDown>
            <Tabs
              value={selectedTab}
              onChange={handleChange}
              indicatorColor="primary"
            >
              <Tab value={0} label="Inicio" />
              <Tab value={1} label="Acerca de" />
              <Tab value={2} label="Valedor" />
              <Tab value={3} label="Negocios" />
              <Tab value={4} label="Contáctanos" />
            </Tabs>
          </Hidden>
        </AppBar>
        <Hidden smDown>
          <Button
            className={classes.ButtonAppBar}
            size="small"
            onClick={() => setOpenDialog(true)}
          >
            Inicia Sesión
          </Button>
        </Hidden>
      </ThemeProvider>
      {selectedTab === 0 && <Inicio />}
      {selectedTab === 1 && <AboutUs />}
      {selectedTab === 2 && <Valedor />}
      {selectedTab === 3 && <Business />}
      {selectedTab === 4 && <ContactUs />}
      <div>
        <PopUp openDialog={openDialog} setOpenDialog={setOpenDialog}>
          <Login />
        </PopUp>
      </div>
    </div>
  )
}

export default Home

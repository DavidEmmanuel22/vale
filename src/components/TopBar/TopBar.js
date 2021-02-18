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
import PopUp from 'components/Dialog/PopUp'
import ContactUs from 'pages/ContactUs/Contact'
import AboutUs from 'pages/AboutUs/AboutUs'
import Business from 'pages/Business/Business'
import Valedor from 'pages/Valedor/Valedor'
import StylesTheme from './StylesTheme'
import Logo from 'images/logo-appbar.png'
import Styles from './Styles'

const Home = (props) => {
  const classes = Styles()
  const { match, history } = props
  const { params } = match
  const { page } = params

  const tabNameToIndex = {
    0: 'about',
    1: 'valedor',
    2: 'negocio',
    3: 'contáctanos'
  }

  const indexToTabName = {
    about: 0,
    valedor: 1,
    negocio: 2,
    contáctanos: 3
  }

  const [selectedTab, setSelectedTab] = React.useState(indexToTabName[page])
  const [openDialog, setOpenDialog] = useState(false)

  const handleChange = (event, newValue) => {
    history.push(`/${tabNameToIndex[newValue]}`)
    setSelectedTab(newValue)
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
            <Tabs
              value={selectedTab}
              onChange={handleChange}
              indicatorColor="primary"
            >
              <Tab value={0} label="Acerca de" />
              <Tab value={1} label="Valedor" />
              <Tab value={2} label="Negocios" />
              <Tab value={3} label="Contáctanos" />
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
      {selectedTab === 0 && <AboutUs />}
      {selectedTab === 1 && <Valedor />}
      {selectedTab === 2 && <Business />}
      {selectedTab === 3 && <ContactUs />}
      <div>
        <PopUp openDialog={openDialog} setOpenDialog={setOpenDialog}>
          <Login />
        </PopUp>
      </div>
    </div>
  )
}

export default Home

import React, { useState } from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import { Tabs, Tab, AppBar, Button } from '@material-ui/core'
import Login from 'pages/Login/Login'
import PopUp from 'components/Dialog/PopUp'
import ContactUs from 'pages/ContactUs/Contact'
import AboutUs from 'pages/AboutUs/AboutUs'
import Business from 'pages/Business/Business'
import Valedor from 'pages/Valedor/Valedor'
import StylesTheme from './StylesTheme'
import Logo from 'images/logo-appbar.png'
import Green from 'images/valedor-green.jpg'
import Map from 'images/location-map.png'
import Hero from 'images/valedor-hero.jpg'
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
        </AppBar>
        <Button
          className={classes.ButtonAppBar}
          size="small"
          onClick={() => setOpenDialog(true)}
        >
          Inicia Sesión
        </Button>
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
      <div className={classes.ContentHero}>
        <img className={classes.ImageHero} src={Hero} alt="Hero"></img>
      </div>
      <div>
        <div>
          <img src={Green} alt="logo"></img>
        </div>
        <div></div>
      </div>
      <div className={classes.ContentMap}>
        <div></div>
        <div className={classes.LocationMap}>
          <img className={classes.ImageMap} src={Map} alt="Map"></img>
        </div>
      </div>
    </div>
  )
}

export default Home

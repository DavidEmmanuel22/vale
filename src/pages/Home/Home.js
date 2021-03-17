import React, { useState, useContext } from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import {
  Tabs,
  Tab,
  AppBar,
  Button,
  Hidden,
  SvgIcon,
  IconButton,
  Toolbar,
  Typography
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
import './home.css'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { SliderData } from './slider/SliderData'

const Home = () => {
  const classes = Styles()
  const { isAuthenticated, logout } = useContext(UserContext)

  return (
    <>
      <AppBar className={classes.AppBar} position="static">
        <Toolbar className={classes.ToolBar}>
          <img height="100%" src="/logo-appbar.png"></img>
          <Hidden smDown>
            <div className={classes.linksContainer}>
              <a className="nav-link-item" href="#">
                Acerca De
              </a>
              <a className="nav-link-item">Valedores</a>
              <a className="nav-link-item">Negocios</a>
              <a className="nav-link-item">Contactos</a>
              <Button
                className="nav-button-item"
                style={{ marginLeft: '20px', backgroundColor: 'black' }}
                startIcon={<AccountCircleIcon></AccountCircleIcon>}
                variant="contained"
                color="secondary"
              >
                Login
              </Button>
            </div>
          </Hidden>
        </Toolbar>
      </AppBar>
      <section className="hero-section">
        <div className="hero-wraper">
          {SliderData.map((slide, index) => (
            <div className="hero-slide" key={index}>
              <div className="hero-slider">
                <img src={slide.image}></img>
                <div className="hero-content">
                  <h1>{slide.title}</h1>
                  <p>{slide.text}</p>
                  <Button variant="contained" color="primary">
                    Ver más
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <h1>hello</h1>
    </>
  )
}

export default Home

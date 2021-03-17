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
  Typography,
  Grid
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
import ValedorHero from './slider/valedor-hero.jpg'

const Home = () => {
  const classes = Styles()
  const { isAuthenticated, logout } = useContext(UserContext)
  const [showLogin, setShowLogin] = useState(false)

  const handleLogin = () => {
    if (!isAuthenticated) {
      setShowLogin(true)
    } else {
      window.location.href = '/dashboard'
    }
  }

  return (
    <>
      <AppBar className={classes.AppBar} position="static">
        <Toolbar className={classes.ToolBar}>
          <img height="100%" src="/images/white-logo.png"></img>
          <Hidden smDown>
            <div className={classes.linksContainer}>
              <a className="nav-link-item" href="#">
                Acerca De
              </a>
              <a className="nav-link-item">Valedores</a>
              <a className="nav-link-item">Negocios</a>
              <a className="nav-link-item">Contactos</a>
              <button className="login-button" onClick={handleLogin}>
                <AccountCircleIcon></AccountCircleIcon>
                {isAuthenticated ? 'Ir al escritorio' : 'Iniciar Sesion'}
              </button>
            </div>
          </Hidden>
        </Toolbar>
      </AppBar>
      <div className="main-content">
        <Hidden smDown>
          <Grid
            container
            spacing={0}
            style={{ height: '100vh', width: '100vw' }}
          >
            <Grid
              item
              xs={12}
              md={6}
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                height: '100%'
              }}
            >
              <div className="hero-text-section">
                <p>¿Necesitas presupuesto para emprender tu negocio?</p>
                <h1>
                  Únete a <span>Vale Valedor</span>
                </h1>
                <button>Conocer más</button>
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              style={{
                display: 'flex',
                justifyContent: 'center',
                height: '100%'
              }}
            >
              <img
                style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                src={ValedorHero}
              ></img>
            </Grid>
          </Grid>
        </Hidden>
        <Hidden mdUp>
          <Grid
            container
            spacing={0}
            style={{ height: '100vh', width: '100vw' }}
          >
            <Grid
              item
              xs={12}
              md={6}
              style={{
                display: 'flex',
                justifyContent: 'center',
                height: '100%'
              }}
            >
              <div className="hero-section-movil">
                <img
                  style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                  src={ValedorHero}
                ></img>
                <div className="hero-text-section-movil">
                  <p>¿Necesitas presupuesto para emprender tu negocio?</p>
                  <h1>
                    Únete a <span>Vale Valedor</span>
                  </h1>
                  <button>Conocer más</button>
                </div>
              </div>
            </Grid>
          </Grid>
        </Hidden>
      </div>
      <footer>
        <div className="footer-logo">
          <img width="70%" height="70%" src="/images/white-logo.png"></img>
        </div>
        <div className="footer-icons">
          <a href="#">
            <img src="/images/Elements email-07.png"></img>
          </a>
          <a href="#">
            <img src="/images/Elements email-08.png"></img>
          </a>
          <a href="#">
            <img src="/images/Elements email-10.png"></img>
          </a>
        </div>
        <div className="footer-about">
          <h4>Acerca De</h4>
          <a href="#">¿Quienes somos?</a>
          <a href="#">Aviso de Privacidad</a>
          <a href="#">Terminos y condiciones</a>
        </div>
        <div className="footer-contact">
          <h4>Contacto</h4>
          <a href="#">844 123 45 67</a>
          <a href="#">info@valevaledor.com</a>
        </div>
      </footer>
      <PopUp openDialog={showLogin} setOpenDialog={setShowLogin}>
        <Login />
      </PopUp>
    </>
  )
}

export default Home

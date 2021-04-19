import React, { useState, useContext } from 'react'
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
import Tooltip from '@material-ui/core/Tooltip'
import Fab from '@material-ui/core/Fab'
import Login from 'pages/Login/Login'
import PopUp from 'components/Dialog/PopUp'
import Popover from '@material-ui/core/Popover'
import Box from '@material-ui/core/Box'
import ChatIcon from '@material-ui/icons/Chat'
import Styles from './Styles'
import { UserContext } from '../../context/userContext'
import './home.css'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ValedorHero from './slider/valedor-hero.jpg'
import { HomeChat } from 'pages/HomeChat/HomeChat'

export const Home = () => {
  const classes = Styles()
  const { isAuthenticated, logout } = useContext(UserContext)
  const [showLogin, setShowLogin] = useState(false)
  const [anchorEl, setanchorEl] = useState(false)

  const handleLogin = () => {
    if (!isAuthenticated) {
      setShowLogin(true)
    } else {
      window.location.href = '/dashboard'
    }
  }

  const openChat = (event) => {
    setanchorEl(event.currentTarget)
  }

  const closeChat = () => {
    setanchorEl(null)
  }
  const open = Boolean(anchorEl)

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
              {
                <Tooltip title="Chat" arrow>
                  <Fab
                    style={{
                      position: 'absolute',
                      right: '6%',
                      bottom: '3%'
                    }}
                    color="primary"
                    onClick={openChat}
                  >
                    <ChatIcon fontSize="large" />
                  </Fab>
                </Tooltip>
              }
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
                {
                  <Tooltip title="Chat">
                    <Fab
                      style={{
                        position: 'absolute',
                        right: '6%',

                        bottom: '3%'
                      }}
                      color="primary"
                      onClick={openChat}
                    >
                      <ChatIcon fontSize="large" />
                    </Fab>
                  </Tooltip>
                }
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
      <Popover
        anchorEl={anchorEl}
        open={open}
        onClose={closeChat}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
      >
        <Box p={2}>
          <Typography style={{ textAlign: 'center' }}>Ingresar</Typography>
          <HomeChat />
        </Box>
      </Popover>
    </>
  )
}

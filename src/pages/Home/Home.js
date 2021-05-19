import React, { useState, useContext } from 'react'
import { AppBar, Hidden, Toolbar, Grid } from '@material-ui/core'
import Slide from '@material-ui/core/Slide'
import Login from 'pages/Login/Login'
import PopUp from 'components/Dialog/PopUp'
import Grow from '@material-ui/core/Grow'
import Styles from './Styles'
import { UserContext } from '../../context/userContext'
import IconButton from '@material-ui/core/IconButton'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ValedorHero from './slider/valedor-hero.jpg'
import MenuIcon from '@material-ui/icons/Menu'
import { Link } from 'react-router-dom'
import CloseIcon from '@material-ui/icons/Close'
import './home.css'

export const ClientNavBar = () => {
  const classes = Styles()
  const [showMenu, setShowMenu] = useState(false)
  const { isAuthenticated, logout } = useContext(UserContext)
  const [showLogin, setShowLogin] = useState(false)
  const userMessageHistory = localStorage.getItem('idChat')

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
        <Toolbar className={`${showMenu ? 'toolbar' : classes.ToolBar}`}>
          <img className={classes.nav__img} src="/images/white-logo.png" />
          <Hidden smUp>
            <IconButton
              style={{ color: 'white' }}
              onClick={() => setShowMenu(!showMenu)}
            >
              {showMenu ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Hidden>
          <Hidden xsDown={!showMenu}>
            <Slide timeout={showMenu ? 360 : 0} in direction="down">
              <div
                className={`${
                  showMenu ? 'links-container' : classes.linksContainer
                }`}
              >
                <Link to="/" className="nav-link-item">
                  Acerca de
                </Link>
                <a className="nav-link-item">Valedores</a>
                <a className="nav-link-item">Negocios</a>
                <Link
                  to={`${userMessageHistory ? '/mail' : '/contact'}`}
                  className="nav-link-item"
                >
                  Contáctanos
                </Link>
                <button className="login-button" onClick={handleLogin}>
                  <AccountCircleIcon></AccountCircleIcon>
                  {isAuthenticated ? 'Ir al escritorio' : 'Iniciar Sesion'}
                </button>
              </div>
            </Slide>
          </Hidden>
        </Toolbar>
      </AppBar>
      <PopUp openDialog={showLogin} setOpenDialog={setShowLogin}>
        <Login />
      </PopUp>
    </>
  )
}

export const Footer = () => {
  return (
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
  )
}

export const Home = () => {
  const classes = Styles()

  const ValedorInfoContent = (
    <>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <div className="row">
            <div className="column">
              <h2>Column 1</h2>
              <p>Some text..</p>
            </div>
            <div className="column">
              <h2>Column 2</h2>
              <p>Some text..</p>
            </div>
            <div className="column">
              <h2>Column 3</h2>
              <p>Some text..</p>
            </div>
            <div className="column">
              <h2>Column 4</h2>
              <p>Some text..</p>
            </div>
          </div>
        </Grid>
        <Grid className="home__content-valedor" item xs={12} md={6}>
          <div
            className="hero-text-section"
            style={{
              padding: '6em',
              color: 'white',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <p data-aos="zoom-in">Descubre las ventajas de ser un Valedor</p>
            <span>
              {' '}
              amet consectetur adipisicing elit. Deserunt recusandae quae vel
              sit obcaecati mollitia similique consequatur libero adipisci,
              incidunt harum perspiciatis doloremque repudiandae optio quis
              facilis officiis qui cupiditate.
            </span>
            <button style={{ marginTop: '3em' }}>Conocer más</button>
          </div>
        </Grid>
      </Grid>
    </>
  )

  const homeContent = (
    <>
      <Grid container>
        <Grid className="home__content" item xs={12} sm={6}>
          <Slide direction="right" in timeout={1230}>
            <div className="hero-text-section">
              <p>¿Necesitas presupuesto para emprender tu negocio?</p>
              <h1>
                Únete a <span>Vale Valedor</span>
              </h1>
              <button>Conocer más</button>
            </div>
          </Slide>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grow in timeout={1120}>
            <img className={classes.home__img} src={ValedorHero} />
          </Grow>
        </Grid>
      </Grid>
    </>
  )
  return (
    <>
      <ClientNavBar />

      <div className="main-content">
        {homeContent}
        {ValedorInfoContent}
      </div>
      <Footer />
    </>
  )
}

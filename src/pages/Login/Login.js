import React from 'react'
import {
  TextField,
  Button,
  makeStyles,
  InputAdornment,
  ThemeProvider
} from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import LockIcon from '@material-ui/icons/Lock'
import decorationimg from 'images/vale-ribbn.png'
import logologin from 'images/valedor-logo.png'
import './Login.css'
import StylesTheme from './StylesTheme'

const styles = makeStyles(() => ({
  widthnew: {
    width: 300,
    display: 'flex',
    'flex-direction': 'column',
    marginTop: 30,
    margin: 'auto'
  },
  widthbutton: {
    width: '300px',
    borderRadius: 10,
    margin: '35px 0px 0px',
    height: '40px',
    backgroundColor: '#007772',
    color: '#ffff'
  },
  '&:hover': {
    backgroundColor: '#007772'
  }
}))

const Login = () => {
  const classes = styles()

  return (
    <ThemeProvider theme={StylesTheme}>
      <div className="content">
        <div className="foto-tom">
          <img
            className="decoration"
            src={decorationimg}
            alt="Logo-Login"
          ></img>
          <div className="logo-content">
            <img className="logo-login" src={logologin} alt="Logo-Login"></img>
          </div>
        </div>
        <div>
          <form className="content-form">
            <div className="bienvenido-content">
              <h1 className="inicia-sesion"></h1>
            </div>
            <TextField
              className={classes.widthnew}
              id="input-with-icon-textfield"
              placeholder="Correo"
              type="email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                )
              }}
            />
            <TextField
              className={classes.widthnew}
              id="input-with-icon-password"
              placeholder="Contraseña"
              type="password"
              autoComplete="current-password"
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    className="MuiInputAdornment-root"
                  >
                    <LockIcon />
                  </InputAdornment>
                )
              }}
            />
            <div className="button-login">
              <Button
                className={`${classes.widthbutton} `}
                type="submit"
                color="primary"
              >
                Iniciar Sesión
              </Button>
            </div>
            <div className="forgot-password">
              <a href="https://reactjs.org/">¿Olvidaste tu contraseña?</a>
            </div>
          </form>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default Login

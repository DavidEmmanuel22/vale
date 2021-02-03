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
import decorationimg from 'image/vale-ribbn.png'
import logologin from 'image/valedor-logo.png'
import './Login.css'
import StylesTheme from './StylesTheme'

const styles = makeStyles(() => ({
  widthnew: {
    width: 300,
    display: 'flex',
    'flex-direction': 'column',
    marginTop: 20,
    margin: 'auto'
  },
  widthbutton: {
    width: '300px',
    borderRadius: 10,
    margin: '35px 0px 0px',
    height: '40px'
  },
  MuiButtonoutlinedPrimary: {
    color: '#2d6a4f',
    border: '1px solid #2d6a4f'
  }
}))

const Login = () => {
  const classes = styles()

  return (
    <ThemeProvider theme={StylesTheme}>
      <div className="content">
        <div className="foto-tom">
          <img className="decoration" src={decorationimg}></img>
          <div className="logo-content">
            <img className="logo-login" src={logologin}></img>
          </div>
        </div>
        <div>
          <form className="content-form">
            <div className="bienvenido-content">
              <h1 className="inicia-sesion">Inicia Sesión</h1>
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
              placeholder="Password"
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
                className={`${classes.widthbutton} ${classes.MuiButtonoutlinedPrimary}`}
                type="submit"
                variant="outlined"
                color="primary"
              >
                Iniciar Sesión
              </Button>
            </div>
            <div className="forgot-password">
              <a>¿Olvidaste tu contraseña?</a>
            </div>
          </form>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default Login

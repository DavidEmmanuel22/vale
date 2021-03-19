import React, { useState, useContext, useEffect } from 'react'
import Axios from 'axios'
import { useHistory } from 'react-router-dom'
import { TextField, Button, InputAdornment } from '@material-ui/core'
// import UserContext from 'hooks/UserContext'
import Alert from 'components/Alert/Alert'
import AccountCircle from '@material-ui/icons/AccountCircle'
import LockIcon from '@material-ui/icons/Lock'
import decorationimg from 'images/vale-ribbn.png'
import logologin from 'images/valedor-logo.png'
import './Login.css'
import Styles from './Styles'
import { UserContext } from '../../context/userContext'
import { loginUser } from 'requests/login'

const Login = () => {
  const classes = Styles()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState()

  const { isAuthenticated, user, login } = useContext(UserContext)
  const history = useHistory()

  const submit = async (event) => {
    event.preventDefault()
    const { success, response, error } = await loginUser(email, password)
    if (success && response) {
      if (response.error) {
        setError(response.error)
      } else {
        //console.log(response)
        login(response.data.token)
        setTimeout(() => {
          history.push('/dashboard')
        }, 7000)
      }
    }
    if (error) {
      setError(error)
    }
    setTimeout(() => {
      setError(false)
    }, 5000)
  }

  return (
    <div>
      {error && (
        <Alert message={error} clearError={() => setError(undefined)} />
      )}
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
          <form className="content-form" onSubmit={submit}>
            <TextField
              className={classes.widthnew}
              id="input-with-icon-textfield"
              placeholder="Correo"
              type="email"
              onChange={(event) => setEmail(event.target.value)}
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
              onChange={(event) => setPassword(event.target.value)}
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
              <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login

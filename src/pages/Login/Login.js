import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { TextField, Button, InputAdornment } from '@material-ui/core'
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
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isDone, setDone] = useState(false)

  const { login } = useContext(UserContext)
  const history = useHistory()

  useEffect(() => {
    if (isDone) {
      history.push('/dashboard')
    }
  }, [isDone])

  const passwordInputProps = {
    startAdornment: (
      <InputAdornment position="start" className="MuiInputAdornment-root">
        <LockIcon />
      </InputAdornment>
    )
  }

  const emailInputProps = {
    startAdornment: (
      <InputAdornment position="start">
        <AccountCircle />
      </InputAdornment>
    )
  }

  const submit = async (event) => {
    event.preventDefault()
    const { success, response, error } = await loginUser(email, password)
    if (success && response) {
      if (response.error) {
        setError(response.error)
      } else {
        //console.log(response)
        login(response.data.token)
        setDone(true)
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
          <img className="decoration" src={decorationimg} alt="Logo-Login" />
          <div className="logo-content">
            <img className="logo-login" src={logologin} alt="Logo-Login" />
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
              InputProps={emailInputProps}
            />
            <TextField
              className={classes.widthnew}
              id="input-with-icon-password"
              placeholder="Contraseña"
              type="password"
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
              InputProps={passwordInputProps}
            />
            <div className="button-login">
              <Button
                className={classes.widthbutton}
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

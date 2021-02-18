import React, { useState } from 'react'
import Axios from 'axios'
import { useHistory } from 'react-router-dom'
import { TextField, Button, InputAdornment } from '@material-ui/core'
// import UserContext from 'hooks/UserContext'
import AccountCircle from '@material-ui/icons/AccountCircle'
import LockIcon from '@material-ui/icons/Lock'
import decorationimg from 'images/vale-ribbn.png'
import logologin from 'images/valedor-logo.png'
import './Login.css'
import Styles from './Styles'

const Login = () => {
  const classes = Styles()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  // const [error, setError] = useState()

  // const setUserData = useContext(UserContext)
  const history = useHistory()

  const submit = async (event) => {
    event.preventDefault()
    try {
      const loginUser = { email, password }
      console.log(loginUser)
      const loginRes = await Axios.post('', loginUser)
      console.log(loginRes)
      /* setUserData({
        token: loginRes.token,
        user: loginRes.user
      }) */
      localStorage.setItem('auth-token', loginRes.data.token)
      history.push('/dashboard')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
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
              <a href="https://reactjs.org/">¿Olvidaste tu contraseña?</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login

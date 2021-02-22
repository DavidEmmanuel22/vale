import React, { useState } from 'react'
import Axios from 'axios'
import { useHistory } from 'react-router-dom'
import { TextField, Button, InputAdornment } from '@material-ui/core'
// import UserContext from 'hooks/UserContext'
import Alert from '../Alert/Alert'
import AccountCircle from '@material-ui/icons/AccountCircle'
import LockIcon from '@material-ui/icons/Lock'
import decorationimg from '../../images/vale-ribbn.png'
import logologin from '../../images/valedor-logo.png'
import './Login.css'
import Styles from './Styles'

const RegisterValedor = () => {
  const classes = Styles()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState()

  // const setUserData = useContext(UserContext)
  const history = useHistory()

  const submit = async (event) => {
    event.preventDefault()
    try {
      const loginUser = {
        email,
        password,
        passwordCheck: password,
        firstName,
        lastName
      }
      console.log(loginUser)
      const loginRes = await Axios.post(
        'https://devbackend.valevaledor.com/register',
        loginUser
      )
      console.log(loginRes.data)
      setError('El valedor ha sido creado satisfactoriamente')
    } catch (error) {
      error.response.data.msg && setError(error.response.data.msg)
    }
  }

  return (
    <div className="register-valedor">
      {error && (
        <Alert message={error} clearError={() => setError(undefined)} />
      )}
      <div className="content">
        <div className="foto-tom">
          <div className="logo-content">
            <img className="logo-login" src={logologin} alt="Logo-Login"></img>
          </div>
        </div>
        <div>
          <h4 className="modal-title">Registra un valedor</h4>
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
              id="input-with-icon-textfield"
              placeholder="Nombre"
              type="string"
              // onChange={(event) => setEmail(event.target.value)}
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
              id="input-with-icon-textfield"
              placeholder="Apellido"
              type="string"
              // onChange={(event) => setEmail(event.target.value)}
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
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterValedor

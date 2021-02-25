import React, { useState } from 'react'
import Axios from 'axios'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Alert from 'components/Alert/Alert'
import { TextField, Button, InputAdornment, Grid } from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import LockIcon from '@material-ui/icons/Lock'
import logologin from '../../images/valedor-logo.png'
import './Login.css'
import Styles from './Styles'

const NameExpression = /^[a-zA-ZÀ-ÿñÑ\s]*$/
// const creditsExpression = /^[0-9]$/

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Correo Electronico Invalido')
    .required('Email es requerido'),
  firstName: yup
    .string()
    .min(5, 'Mínimo 5 caracteres')
    .max(25, 'Maxímo 25 caracteres')
    .matches(NameExpression, 'Solo se permiten letras para este campo')
    .required('Nombre es requerido'),
  lastName: yup
    .string()
    .matches(NameExpression, 'Solo se permiten letras para este campo')
    .required('Apellido es requerido'),
  credits: yup
    .number()
    // .matches( creditsExpression,"Solo se permiten letras para este campo")
    .required('Credito es requerido')
})

const RegisterValedor = (props) => {
  const classes = Styles()
  const [alert, setAlert] = useState()

  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      credits: ''
    },
    onSubmit: async (valedorUser, { resetForm }) => {
      console.log(JSON.stringify(valedorUser))
      // event.preventDefault()
      try {
        const registerRes = await Axios.post(
          'https://devbackend.valevaledor.com/register',
          valedorUser
        )
        console.log(registerRes.data)

        setAlert('El valedor ha sido creado satisfactoriamente')
      } catch (error) {
        console.log(error)
      }
      resetForm({ valedorUser: '' })
    },
    validationSchema: validationSchema
  })

  return (
    <div className="register-valedor">
      {alert && (
        <Alert message={alert} clearError={() => setAlert(undefined)} />
      )}
      <Grid className="content" container direction="column">
        <h4 className="modal-title">Registra un Valedor</h4>
        <form className="content-form" onSubmit={formik.handleSubmit}>
          <TextField
            className={classes.widthnew}
            id="email"
            placeholder="Correo"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
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
            id="firstName"
            placeholder="Nombre"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
            type="text"
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
            id="lastName"
            placeholder="Apellido"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
            type="text"
            // onChange={(event) => setLastName(event.target.value)}
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
            id="credits"
            placeholder="Credito"
            type="number"
            value={formik.values.credits}
            onChange={formik.handleChange}
            error={formik.touched.credits && Boolean(formik.errors.credits)}
            helperText={formik.touched.credits && formik.errors.credits}
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
              Registrar Valedor{' '}
            </Button>
          </div>
        </form>
      </Grid>
    </div>
  )
}

export default RegisterValedor

import React, { useState, useContext } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { TextField, Button, InputAdornment, Grid } from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import './registerValedor.css'
import Styles from './Styles'
import EmailIcon from '@material-ui/icons/Email'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import { AlertContext } from '../popUp/responsivePopUp'
import { createValedor } from 'requests/allValedores'

const NameExpression = /^\S/
const creditsExpression = /^\d+$/

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Correo electronico invalido')
    .matches(NameExpression, 'No se permiten espacios vacios')
    .required('Email es requerido'),
  firstName: yup
    .string()
    .min(3, 'Mínimo 3 caracteres')
    .max(65, 'Maxímo 65 caracteres')
    .matches(NameExpression, 'No se permiten espacios vacios')
    .required('Nombre es requerido'),
  lastName: yup
    .string()
    .min(3, 'Mínimo 3 caracteres')
    .max(65, 'Maxímo 65 caracteres')
    .matches(NameExpression, 'No se permiten espacios vacios')
    .required('Apellido es requerido'),
  credits: yup
    .string()
    .matches(creditsExpression, 'Solo nùmeros enteros positivos')
    .required('Credito es requerido')
})

const RegisterValedor = (props) => {
  const classes = Styles()

  const { alertText, alertColor, setAlertText, setAlertColor } = useContext(
    AlertContext
  )

  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      credits: ''
    },
    onSubmit: async (valedorUser, { resetForm }) => {
      const { success, response, error } = await createValedor(valedorUser)
      if (success && response) {
        if (response.msg) {
          setAlertColor('error')
          setAlertText(response.msg)
        } else {
          setAlertColor('success')
          setAlertText('El valedor fue creado correctamente')
          resetForm({ valedorUser: '' })
        }
      }
    },
    validationSchema: validationSchema
  })

  return (
    <div className="register-valedor">
      <form className={classes.root} onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
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
                    <EmailIcon></EmailIcon>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              className={classes.widthnew}
              id="firstName"
              placeholder="Nombre"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
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
          </Grid>
          <Grid item xs={12} md={6}>
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
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              className={classes.widthnew}
              id="credits"
              placeholder="Credito"
              type="text"
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
                    <MonetizationOnIcon></MonetizationOnIcon>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <div className="button-login">
              <Button
                className={`${classes.widthbutton} `}
                type="submit"
                color="primary"
              >
                Registrar Valedor{' '}
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default RegisterValedor

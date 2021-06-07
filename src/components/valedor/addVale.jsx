import React, { useState, useContext } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { TextField, Button, InputAdornment, Grid } from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import './registerValedor.css'
import Styles from './Styles'
import EmailIcon from '@material-ui/icons/Email'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid'
import { AlertContext } from '../popUp/responsivePopUp'
import { createVale } from 'requests/allValedores'
import { UserContext } from 'context/userContext'

const NameExpression = /^\S/
const creditsExpression = /^\d+$/

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Correo electronico invalido')
    .matches(NameExpression, 'No se permiten espacios vacios')
    .trim()
    .required('Email requerido'),
  firstName: yup
    .string()
    .min(3, 'Mínimo 3 caracteres')
    .max(65, 'Maxímo 65 caracteres')
    .matches(/^[a-zA-ZÀ-ÿñÑ\s]*$/, 'El nombre contiene caractéres invalidos')
    .required('Nombre requerido'),
  lastName: yup
    .string()
    .min(3, 'Mínimo 3 caracteres')
    .max(65, 'Maxímo 65 caracteres')
    .matches(/^[a-zA-ZÀ-ÿñÑ\s]*$/, 'El nombre contiene caractéres invalidos')
    .required('Apellido requerido'),
  credits: yup
    .string()
    .matches(creditsExpression, 'Solo nùmeros enteros positivos')
    .required('Credito requerido'),
  telefono: yup
    .string()
    .matches(creditsExpression, 'Solo nùmeros enteros positivos')
    .required('Telefono requerido')
})

export const AddVale = () => {
  const classes = Styles()

  const { alertText, alertColor, setAlertText, setAlertColor } = useContext(
    AlertContext
  )
  const { user } = useContext(UserContext)

  const formik = useFormik({
    initialValues: {
      emailUser: user.email,
      firstName: '',
      lastName: '',
      credits: '',
      telefono: '',
      email: ''
    },
    onSubmit: async (valedorUser, { resetForm }) => {
      const { success, response, error } = await createVale(valedorUser)
      if (success && response) {
        if (response.error) {
          setAlertColor('error')
          setAlertText(response.error)
        } else {
          setAlertColor('success')
          setAlertText('El vale fue creado correctamente')
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
              inputProps={{
                maxLength: 65
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
              inputProps={{
                maxLength: 65
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
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                )
              }}
              inputProps={{
                maxLength: 65
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
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
                    <MonetizationOnIcon></MonetizationOnIcon>
                  </InputAdornment>
                )
              }}
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 10)
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              className={classes.widthnew}
              id="telefono"
              placeholder="Telefono"
              type="number"
              value={formik.values.telefono}
              onChange={formik.handleChange}
              error={formik.touched.telefono && Boolean(formik.errors.telefono)}
              helperText={formik.touched.telefono && formik.errors.telefono}
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    className="MuiInputAdornment-root"
                  >
                    <PhoneAndroidIcon />
                  </InputAdornment>
                )
              }}
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 10)
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
                Asignar Vale{' '}
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

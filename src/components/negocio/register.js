import React, { useState, useContext } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { TextField, Button, InputAdornment, Grid } from '@material-ui/core'
import './registerNegocio.css'
import Styles from './Styles'
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter'
import EmailIcon from '@material-ui/icons/Email'
import DirectionsIcon from '@material-ui/icons/Directions'
import AssignmentIcon from '@material-ui/icons/Assignment'
import { AlertContext } from '../popUp/responsivePopUp'
import { createNegocio } from 'requests/allNegocios'

const NameExpression = /^\S/
const RfcExpression = /^(([ÑA-Z|ña-z|&amp;]{3}|[A-Z|a-z]{4})\d{2}((0[1-9]|1[012])(0[1-9]|1\d|2[0-8])|(0[13456789]|1[012])(29|30)|(0[13578]|1[02])31)(\w{2})([A|a|0-9]{1}))$|^(([ÑA-Z|ña-z|&amp;]{3}|[A-Z|a-z]{4})([02468][048]|[13579][26])0229)(\w{2})([A|a|0-9]{1})$/
const validationSchema = yup.object({
  email: yup
    .string()
    .email('Correo Electronico Invalido')
    .matches(NameExpression, 'No se permiten espacios vacios')
    .required('Email es requerido'),
  bussinesName: yup
    .string()
    .min(3, 'Mínimo 3 caracteres')
    .max(30, 'Maxímo 30 caracteres')
    .matches(NameExpression, 'No se permiten espacios vacios')
    .required('Negocio es requerido'),
  bussinesAdress: yup
    .string()
    .min(3, 'Mínimo 3 caracteres')
    .max(30, 'Maxímo 30 caracteres')
    .matches(NameExpression, 'No se permiten espacios vacios')
    .required('Dirección es requerida'),
  bussinesRfc: yup
    .string()
    .min(13, 'Mínimo 13 caracteres')
    .matches(RfcExpression, 'Ingrese un RFC valido')
    .required('RFC es requerido')
})

const RegisterNegocio = (props) => {
  const classes = Styles()
  const { alertText, alertColor, setAlertText, setAlertColor } = useContext(
    AlertContext
  )
  //setAlertColor("error")
  //setAlertText("hello")
  const formik = useFormik({
    initialValues: {
      email: '',
      bussinesName: '',
      bussinesAdress: '',
      bussinesRfc: ''
    },
    onSubmit: async (negocio, { resetForm }) => {
      const { success, response, error } = await createNegocio(negocio)
      if (success && response) {
        if (response.error) {
          setAlertColor('error')
          setAlertText(response.error)
        } else {
          setAlertText('El Negocio ha sido creado satisfactoriamente')
          setAlertColor('success')
          resetForm({ negocio: '' })
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
              placeholder="Email"
              type="email"
              value={formik.values.email || ''}
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
              id="bussinesName"
              placeholder="Negocio"
              type="text"
              value={formik.values.bussinesName || ''}
              onChange={formik.handleChange}
              error={
                formik.touched.bussinesName &&
                Boolean(formik.errors.bussinesName)
              }
              helperText={
                formik.touched.bussinesName && formik.errors.bussinesName
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BusinessCenterIcon></BusinessCenterIcon>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              className={classes.widthnew}
              id="bussinesAdress"
              placeholder="Direcciòn del negocio"
              value={formik.values.bussinesAdress || ''}
              onChange={formik.handleChange}
              error={
                formik.touched.bussinesAdress &&
                Boolean(formik.errors.bussinesAdress)
              }
              helperText={
                formik.touched.bussinesAdress && formik.errors.bussinesAdress
              }
              type="text"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DirectionsIcon></DirectionsIcon>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              className={classes.widthnew}
              id="bussinesRfc"
              placeholder="RFC"
              value={formik.values.bussinesRfc || ''}
              onChange={formik.handleChange}
              error={
                formik.touched.bussinesRfc && Boolean(formik.errors.bussinesRfc)
              }
              helperText={
                formik.touched.bussinesRfc && formik.errors.bussinesRfc
              }
              type="text"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AssignmentIcon></AssignmentIcon>
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
                Registrar Negocio
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default RegisterNegocio

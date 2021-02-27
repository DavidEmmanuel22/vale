import React, { useState, useContext } from 'react'
import Axios from 'axios'
import Alert from 'components/Alert/Alert'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { TextField, Button, InputAdornment, Grid } from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import logologin from '../../images/valedor-logo.png'
import './registerNegocio.css'
import Styles from './Styles'
import Paper from '@material-ui/core/Paper'
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter'
import EmailIcon from '@material-ui/icons/Email'
import DirectionsIcon from '@material-ui/icons/Directions'
import AssignmentIcon from '@material-ui/icons/Assignment'
import { AlertContext } from '../popUp/responsivePopUp'

const NameExpression = /^[a-zA-ZÀ-ÿñÑ\s]*$/
// const RfcExpression = /^[A-Z0-9]$/
// const AdressExpression = /^[a-zA-ZÀ-ÿñÑ\s]*$/
const validationSchema = yup.object({
  email: yup
    .string()
    .email('Correo Electronico Invalido')
    .required('Email es requerido'),
  bussinesName: yup
    .string()
    .matches(NameExpression, 'Solo se permiten letras para este campo')
    .min(5, 'Mínimo 5 caracteres')
    .max(25, 'Maxímo 25 caracteres')
    .required('Negocio es requerido'),
  bussinesAdress: yup
    .string()
    // .matches( AdressExpression,"Solo se permiten letras Y numeros para este campo")
    .min(5, 'Mínimo 5 caracteres')
    .max(25, 'Maxímo 25 caracteres')
    .required('Dirección es requerida'),
  bussinesRfc: yup
    .string()
    // .matches( RfcExpression,"Solo se permiten letras mayusculas y nùmeros enteros")
    .min(7, 'Mínimo 5 caracteres')
    .max(14, 'Maxímo 25 caracteres')
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
    onSubmit: async (values, { resetForm }) => {
      console.log(JSON.stringify(values))
      // event.preventDefault()
      try {
        const registerRes = await Axios.post(
          'https://devbackend.valevaledor.com/register',
          values
        )
        console.log(registerRes.data)
        setAlertText('El Negocio ha sido creado satisfactoriamente')
        setAlertColor('success')
        console.log('doneee')
        // console.log('El Negocio ha sido creado satisfactoriamente')
      } catch (error) {
        console.log(error)
        setAlertText('An error was ocurred, please try latter')
        setAlertColor('error')
      }
      resetForm({ values: '' })
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

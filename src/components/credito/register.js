import React, { useState, useContext } from 'react'
import Axios from 'axios'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Alert from 'components/Alert/Alert'
import { TextField, Button, InputAdornment, Grid } from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import EmailIcon from '@material-ui/icons/Email'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import { AlertContext } from '../popUp/responsivePopUp'
import { createValedor } from 'requests/allValedores'
import { makeStyles } from '@material-ui/core/styles'
import { createVale } from 'requests/allVales'

const Styles = makeStyles(() => ({
  widthnew: {
    display: 'flex',
    'flex-direction': 'column',
    margin: 'auto'
  },
  widthbutton: {
    width: '300px',
    borderRadius: 10,
    height: '40px',
    backgroundColor: '#007772',
    color: '#ffff',
    '&:hover': {
      backgroundColor: '#007772'
    }
  },
  root: {
    flexGrow: 1
  },
  paper: {
    textAlign: 'center'
  }
}))

const NameExpression = /^[a-zA-ZÀ-ÿñÑ\s]*$/

const validationSchema = yup.object({
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

const RegisterCredit = (props) => {
  const classes = Styles()

  const { alertText, alertColor, setAlertText, setAlertColor } = useContext(
    AlertContext
  )

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      credits: ''
    },
    onSubmit: async (vale, { resetForm }) => {
      const some = { ...vale, emailUser: 'angelacevedo975@gmail.com' }
      console.log(some)
      const { success, response, error } = await createVale(some)
      if (success && response) {
        if (response.msg) {
          setAlertColor('error')
          setAlertText(response.msg)
        } else {
          setAlertColor('success')
          setAlertText('El vale fue creado correctamente')
          //resetForm({ vale: '' })
        }
      }
      console.log(vale)
      console.log('jejeje')
      console.log(response)
    },
    validationSchema: validationSchema
  })

  return (
    <div className="register-vale">
      <form className={classes.root} onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
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

export default RegisterCredit

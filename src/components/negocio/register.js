import React, { useState } from 'react'
import Axios from 'axios'
import Alert from 'components/Alert/Alert'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { TextField, Button, InputAdornment } from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import logologin from '../../images/valedor-logo.png'
import './registerNegocio.css'
import Styles from './Styles'

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
  const [alert, setAlert] = useState()

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
        setAlert('El Negocio ha sido creado satisfactoriamente')
        // console.log('El Negocio ha sido creado satisfactoriamente')
      } catch (error) {
        console.log(error)
      }
      resetForm({ values: '' })
    },
    validationSchema: validationSchema
  })

  return (
    <div className="register-valedor">
      {alert && (
        <Alert message={alert} clearError={() => setAlert(undefined)} />
      )}
      <div className="content">
        <div className="foto-tom">
          <div className="logo-content">
            <img className="logo-login" src={logologin} alt="Logo-Login"></img>
          </div>
        </div>
        <div>
          <h4 className="modal-title">Registra un Negocio</h4>
          <form className="content-form" onSubmit={formik.handleSubmit}>
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
                    <AccountCircle />
                  </InputAdornment>
                )
              }}
            />
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
                    <AccountCircle />
                  </InputAdornment>
                )
              }}
            />
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
                    <AccountCircle />
                  </InputAdornment>
                )
              }}
            />
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
                    <AccountCircle />
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
                Registrar Negocio
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterNegocio

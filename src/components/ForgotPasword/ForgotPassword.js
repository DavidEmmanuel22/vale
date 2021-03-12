import React, { useState } from 'react'
import { forgotPassword } from 'requests/forgotPassword'
import { useFormik } from 'formik'
import * as yup from 'yup'
import {
  TextField,
  Button,
  InputAdornment,
  Grid,
  Paper,
  Typography,
  Collapse
} from '@material-ui/core'
import Logo from 'images/logo-appbar.png'
import Styles from './Styles'
import EmailIcon from '@material-ui/icons/Email'
import { Alert } from '@material-ui/lab'

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Correo Electronico Invalido')
    .required('Email es requerido')
})

const ForgotPassword = () => {
  const classes = Styles()
  const [alertText, setAlertText] = useState('')
  const [alertColor, setAlertColor] = useState('success')
  const [showAlert, setShowAlert] = useState(false)

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    onSubmit: async (updatedPassword, { resetForm }) => {
      console.log(updatedPassword.email)
      const { success, response, error } = await forgotPassword(
        updatedPassword.email
      )
      if (success && response) {
        if (response.error) {
          setAlertColor('error')
          setAlertText(response.error)
        } else {
          setAlertColor('success')
          setAlertText(response.data)
        }
        setShowAlert(true)
      }
    },
    validationSchema: validationSchema
  })

  return (
    <div>
      <Grid className={classes.GridContent} item md={12}>
        <Paper className={classes.PaperContent}>
          <Collapse in={showAlert}>
            <Alert severity={alertColor}>{alertText}</Alert>
          </Collapse>
          <form className={classes.FormContent} onSubmit={formik.handleSubmit}>
            <img className={classes.ImageLogo} src={Logo} alt="Logo"></img>
            <h2 className={classes.H2Password}>Recuperar Contraseña</h2>
            <Typography className={classes.TypoEmail}>
              Ingrese su correo, para cambiar su contraseña
            </Typography>
            <TextField
              className={classes.InputEmail}
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
            <div>
              <Button
                className={classes.ButtonPassword}
                type="submit"
                color="primary"
              >
                Enviar para restablecer contraseña
              </Button>
            </div>
          </form>
          <div>
            <div className={classes.FooterText}>
              <Typography className={classes.TextInicia}>
                <a href="/">Inicia Sesión</a>
              </Typography>
            </div>
          </div>
        </Paper>
      </Grid>
    </div>
  )
}

export default ForgotPassword

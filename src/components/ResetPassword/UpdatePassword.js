import React, { useState } from 'react'
import { resetPassword } from 'requests/forgotPassword'
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
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import CheckIcon from '@material-ui/icons/Check'
import { Alert } from '@material-ui/lab'

const validationSchema = yup.object({
  password: yup.string().required('La contraseña es requerida'),
  passwordCheck: yup
    .string()
    .required('La contraseña de confirmación es requerida')
})

const UpdatePassword = () => {
  const classes = Styles()

  const [showAlert, setShowAlert] = useState(false)
  const [alertText, setAlertText] = useState('')
  const [alertColor, setAlertColor] = useState('success')

  const formik = useFormik({
    initialValues: {
      password: '',
      passwordCheck: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (data) => {
      const { success, response, error } = await resetPassword(data)
      if (response && success) {
        if (response.error) {
          setAlertColor('error')
          setAlertText(response.error)
        } else {
          setAlertColor('success')
          setAlertText('Tu contraseña se ha reestablecido')
        }
        setShowAlert(true)
        setTimeout(() => {
          setShowAlert(false)
          window.location.href = '/'
        }, 8000)
        //resetForm({ resetpassword: '' })
      }
    }
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
            <h2 className={classes.H2Password}>Cambiar Contraseña</h2>
            <Typography className={classes.TypoEmail}>
              Ingrese su nueva contraseña
            </Typography>
            <TextField
              className={classes.InputEmail}
              id="password"
              placeholder="Contraseña"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VpnKeyIcon></VpnKeyIcon>
                  </InputAdornment>
                )
              }}
            />
            <TextField
              className={classes.InputEmail}
              id="passwordCheck"
              placeholder="Confirmar contraseña"
              type="password"
              value={formik.values.passwordCheck}
              onChange={formik.handleChange}
              error={
                formik.touched.passwordCheck &&
                Boolean(formik.errors.passwordCheck)
              }
              helperText={
                formik.touched.passwordCheck && formik.errors.passwordCheck
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CheckIcon></CheckIcon>
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
                Click para restablecer contraseña
              </Button>
            </div>
          </form>
        </Paper>
      </Grid>
    </div>
  )
}

export default UpdatePassword

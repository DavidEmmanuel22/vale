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
import { addCredit } from 'requests/allValedores'

const NameExpression = /^\S/
const creditsExpression = /^\d+$/

const validationSchema = yup.object({
  credits: yup
    .string()
    .matches(creditsExpression, 'Solo nùmeros enteros positivos')
    .required('Credito es requerido')
})

const AddCredits = ({ email }) => {
  const {
    alertText,
    alertColor,
    setAlertText,
    setAlertColor,
    handleClose
  } = useContext(AlertContext)
  const classes = Styles()

  const formik = useFormik({
    initialValues: {
      credits: ''
    },
    onSubmit: async (valedorUser, { resetForm }) => {
      const { success, response, error } = await addCredit(
        email,
        parseInt(valedorUser.credits)
      )
      if (success && response) {
        if (response.error) {
          setAlertColor('error')
          setAlertText(response.error)
        } else {
          setAlertColor('success')
          setAlertText('El crédito fue agregado correctamente')
          resetForm({ valedorUser: '' })
          setTimeout(() => {
            handleClose()
          }, 2000)
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
              value={email}
              disabled
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
                Agregar nuevo credito
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default AddCredits

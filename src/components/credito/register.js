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
import { addCredit, createValedor } from 'requests/allValedores'
import { makeStyles } from '@material-ui/core/styles'
import { createVale } from 'requests/allVales'
import { addCreditSchema } from 'yupSchemas'

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

const RegisterCredit = (props) => {
  const classes = Styles()

  const { alertText, alertColor, setAlertText, setAlertColor } = useContext(
    AlertContext
  )

  const formik = useFormik({
    initialValues: {
      email: '',
      credits: ''
    },
    onSubmit: async (values, { resetForm }) => {
      const { success, response, error } = await addCredit(
        values.email,
        values.credits
      )
      if (success && response) {
        if (response.error) {
          setAlertColor('error')
          setAlertText(response.error)
        } else {
          setAlertColor('success')
          setAlertText('Se ha añadido el credito correctamente')
        }
      }
    },
    validationSchema: addCreditSchema
  })

  return (
    <div className="register-vale">
      <form className={classes.root} onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              className={classes.widthnew}
              id="email"
              placeholder="Correo electronico"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
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
          <Grid item xs={12}>
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
                Agregar Credito{' '}
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default RegisterCredit

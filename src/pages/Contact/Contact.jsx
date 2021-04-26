import {
  Grid,
  TextField,
  Slide,
  Button,
  InputAdornment
} from '@material-ui/core'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import SendIcon from '@material-ui/icons/Send'
import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import valeThor from '../../assets/Contact/ValeThor.png'
import EmailIcon from '@material-ui/icons/Email'
import PersonIcon from '@material-ui/icons/Person'
import { useFormik } from 'formik'
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid'
import MessageIcon from '@material-ui/icons/Message'
import { contactValidation } from './ContactValidation'
import './Contact.css'
import { ClientNavBar } from 'pages/Home/Home'

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    message: ''
  })
  const [openAlert, setOpenAlert] = useState(false)

  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />
  }

  const contactFormikValidation = useFormik({
    initialValues: form,
    onSubmit: async (formValue) => {
      // console.log(
      //   formValue.name,
      //   formValue.email,
      //   formValue.phoneNumber,
      //   formValue.message
      // )

      setOpenAlert(true)
      contactFormikValidation.resetForm({
        values: {
          name: '',
          email: '',
          phoneNumber: '',
          message: ''
        }
      })
    },
    validationSchema: contactValidation
  })

  const contactContent = (
    <>
      <ClientNavBar />
      <Grid container>
        <Grid className="contact__section" item xs={12} sm={6} md={6}>
          <Slide timeout={1230} in direction="right" mountOnEnter unmountOnExit>
            <div className="contact__img-shadow">
              <img className="contact__img" src={valeThor} />
            </div>
          </Slide>
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <form
            onSubmit={contactFormikValidation.handleSubmit}
            className="contact__form"
          >
            <Typography className="contact__input" variant="h4">
              Contáctanos
            </Typography>
            <TextField
              className="contact__input"
              label="Nombre"
              variant="filled"
              name="name"
              value={contactFormikValidation.values.name}
              onChange={contactFormikValidation.handleChange}
              error={
                contactFormikValidation.touched.name &&
                Boolean(contactFormikValidation.errors.name)
              }
              helperText={
                contactFormikValidation.touched.name &&
                contactFormikValidation.errors.name
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color="primary" />
                  </InputAdornment>
                )
              }}
            />
            <TextField
              className="contact__input"
              label="Correo Electrónico"
              type="email"
              variant="filled"
              name="email"
              value={contactFormikValidation.values.email}
              onChange={contactFormikValidation.handleChange}
              error={
                contactFormikValidation.touched.email &&
                Boolean(contactFormikValidation.errors.email)
              }
              helperText={
                contactFormikValidation.touched.email &&
                contactFormikValidation.errors.email
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="primary" />
                  </InputAdornment>
                )
              }}
            />
            <TextField
              className="contact__input"
              label="Teléfono"
              variant="filled"
              type="number"
              name="phoneNumber"
              value={contactFormikValidation.values.phoneNumber}
              onChange={contactFormikValidation.handleChange}
              error={
                contactFormikValidation.touched.phoneNumber &&
                Boolean(contactFormikValidation.errors.phoneNumber)
              }
              helperText={
                contactFormikValidation.touched.phoneNumber &&
                contactFormikValidation.errors.phoneNumber
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneAndroidIcon color="primary" />
                  </InputAdornment>
                )
              }}
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 10)
              }}
            />
            <TextField
              className="contact__input"
              label="Mensaje"
              multiline
              rows={3}
              variant="filled"
              name="message"
              value={contactFormikValidation.values.message}
              onChange={contactFormikValidation.handleChange}
              error={
                contactFormikValidation.touched.message &&
                Boolean(contactFormikValidation.errors.message)
              }
              helperText={
                contactFormikValidation.touched.message &&
                contactFormikValidation.errors.message
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MessageIcon color="primary" />
                  </InputAdornment>
                )
              }}
            />
            <div>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                endIcon={<SendIcon />}
              >
                Enviar
              </Button>
            </div>
          </form>
        </Grid>
      </Grid>
    </>
  )
  return (
    <>
      {contactContent}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        open={openAlert}
        onClose={() => {
          setOpenAlert(false)
        }}
        autoHideDuration={6000}
      >
        <Alert severity="success">Mensaje enviado</Alert>
      </Snackbar>
    </>
  )
}

export default Contact

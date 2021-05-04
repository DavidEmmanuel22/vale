import {
  Grid,
  TextField,
  Slide,
  Button,
  InputAdornment,
  Hidden,
  Zoom
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
import { contactValidation, loginValidation } from './ContactValidation'
import './Contact.css'
import { ClientNavBar, Footer } from 'pages/Home/Home'
import { Link, useHistory } from 'react-router-dom'
import { createMail } from 'requests/createMail'
import CircularProgress from '@material-ui/core/CircularProgress'

const Contact = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    message: ''
  })

  const history = useHistory()
  const [loginForm, setLoginForm] = useState({
    email: '',
    phoneNumber: ''
  })
  const [openAlert, setOpenAlert] = useState(false)
  const [openErrorAlert, setOpenErrorAlert] = useState(false)
  const [loginHistoryMessages, setLoginHistoryMessages] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />
  }

  const contactFormikValidation = useFormik({
    initialValues: loginHistoryMessages ? loginForm : contactForm,
    onSubmit: async (formValue) => {
      setLoading(true)
      const { success, response, error } = await createMail({
        name: formValue.name,
        emailUser: formValue.email,
        telUser: formValue.phoneNumber,
        messageData: formValue.message
      })
      if (success && response) {
        if (response.error) {
          //console.log(response.error)
        } else {
          //console.log(response)
          setOpenAlert(true)
          setLoading(false)
          //console.log(response.data)
          setTimeout(() => {
            history.push({
              pathname: '/mail',
              state: response.data
            })
            localStorage.setItem('idChat', response.data.message.idChat)
          }, 3000)
        }
      }
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

  const loginFormikValidation = useFormik({
    initialValues: loginForm,
    onSubmit: async (formValue) => {
      setLoading(true)
      const { success, response, error } = await createMail({
        emailUser: formValue.email,
        telUser: formValue.phoneNumber
      })
      if (error) {
        //console.log(error)
      }
      if (success && response) {
        if (response.error) {
          //console.log(response.error)
          const message = response.error[0].message
          setTimeout(() => {
            if (typeof response.error !== 'string') {
              localStorage.setItem('idChat', message.idChat)
              history.push({
                pathname: '/mail',
                state: response.error
              })
            }
          }, 3000)

          setTimeout(() => {
            if (typeof response.error === 'string') {
              //console.log('error: ', response.error)
              setError(true)
              setOpenErrorAlert(true)
            }

            setTimeout(() => {
              setError(false)
              setOpenErrorAlert(false)
              setLoading(false)
            }, 6000)
          }, 1000)
        } else {
          //console.log(response.message)
        }
      }
      loginFormikValidation.resetForm({
        values: {
          email: '',
          phoneNumber: ''
        }
      })
    },
    validationSchema: loginValidation
  })

  const contactContent = (
    <>
      <ClientNavBar />

      <Grid container style={{ height: '100vh' }}>
        <Hidden xsDown>
          <Grid
            className="contact__section"
            style={loginHistoryMessages ? { backgroundColor: '#003634' } : null}
            item
            xs={12}
            sm={6}
            md={6}
          >
            <div className="contact__img-shadow">
              <Hidden lgDown={loginHistoryMessages}>
                <Zoom
                  timeout={600}
                  in
                  direction="down"
                  mountOnEnter
                  unmountOnExit
                >
                  <div className="contact__welcome-message">
                    <h2>
                      Lorem ipsum dolor sit,
                      <span
                        className="contact__welcome-login"
                        onClick={() => setLoginHistoryMessages(true)}
                      >
                        {' '}
                        Historial{' '}
                      </span>
                      amet consectetur adipisicing elit. Deserunt recusandae
                      quae vel sit obcaecati mollitia similique consequatur
                      libero adipisci, incidunt harum perspiciatis doloremque
                      repudiandae optio quis facilis officiis qui cupiditate.
                    </h2>
                  </div>
                </Zoom>

                <img className="contact__img" src={valeThor} />
              </Hidden>
            </div>
          </Grid>
        </Hidden>

        <Grid item xs={12} sm={6} md={6}>
          <form
            onSubmit={
              loginHistoryMessages
                ? loginFormikValidation.handleSubmit
                : contactFormikValidation.handleSubmit
            }
            className={`contact__form ${
              loginHistoryMessages ? 'contact__form-login' : ''
            }`}
          >
            <Typography className="contact__input" variant="h4">
              {`${loginHistoryMessages ? 'Historial Mensajes' : 'Contáctanos'}`}
            </Typography>
            <Hidden lgDown={loginHistoryMessages}>
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
            </Hidden>

            <TextField
              className="contact__input"
              label="Correo Electrónico"
              type="email"
              variant="filled"
              name="email"
              value={
                loginHistoryMessages
                  ? loginFormikValidation.values.email
                  : contactFormikValidation.values.email
              }
              onChange={
                loginHistoryMessages
                  ? loginFormikValidation.handleChange
                  : contactFormikValidation.handleChange
              }
              error={
                loginHistoryMessages
                  ? loginFormikValidation.touched.email
                  : contactFormikValidation.touched.email &&
                    loginHistoryMessages
                  ? Boolean(loginFormikValidation.errors.email)
                  : Boolean(contactFormikValidation.errors.email)
              }
              helperText={
                loginHistoryMessages
                  ? loginFormikValidation.touched.email &&
                    loginFormikValidation.errors.email
                  : !loginHistoryMessages &&
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
              value={
                loginHistoryMessages
                  ? loginFormikValidation.values.phoneNumber
                  : contactFormikValidation.values.phoneNumber
              }
              onChange={
                loginHistoryMessages
                  ? loginFormikValidation.handleChange
                  : contactFormikValidation.handleChange
              }
              error={
                loginHistoryMessages
                  ? loginFormikValidation.touched.phoneNumber
                  : contactFormikValidation.touched.phoneNumber &&
                    loginHistoryMessages
                  ? Boolean(loginFormikValidation.errors.phoneNumber)
                  : Boolean(contactFormikValidation.errors.phoneNumber)
              }
              helperText={
                loginHistoryMessages
                  ? loginFormikValidation.touched.phoneNumber &&
                    loginFormikValidation.errors.phoneNumber
                  : !loginHistoryMessages &&
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
            <Hidden lgDown={loginHistoryMessages}>
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
            </Hidden>

            <div style={{ position: 'relative' }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading && !error}
                endIcon={<SendIcon />}
              >
                {`${loginHistoryMessages ? 'Entrar' : 'Enviar'}`}
              </Button>
              {loading && !error && (
                <CircularProgress
                  style={{
                    position: 'absolute',
                    top: '18%',
                    left: '46%'
                  }}
                  size={24}
                />
              )}
            </div>
          </form>
        </Grid>
      </Grid>
      {/* <Footer /> */}
    </>
  )
  return (
    <>
      {contactContent}

      {!loginHistoryMessages && (
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={openAlert}
          onClose={() => {
            setOpenAlert(false)
          }}
          autoHideDuration={6000}
        >
          <Slide timeout={600} in mountOnEnter unmountOnExit>
            <div>
              <Alert severity="success">Mensaje enviado correctamente</Alert>
            </div>
          </Slide>
        </Snackbar>
      )}

      {error && (
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={openErrorAlert}
          onClose={() => {
            setOpenErrorAlert(false)
          }}
          autoHideDuration={6000}
        >
          <Slide timeout={600} in mountOnEnter unmountOnExit>
            <div>
              <Alert severity="warning">
                Usuario no encontrado, le invitamos a{' '}
                {
                  <span
                    onClick={() => setLoginHistoryMessages(false)}
                    style={{ cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    registrarse
                  </span>
                }
                .
              </Alert>
            </div>
          </Slide>
        </Snackbar>
      )}
    </>
  )
}

export default Contact

import React, { useContext, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { Button, Collapse, InputAdornment, Typography } from '@material-ui/core'
import { UserContext } from '../../context/userContext'
import BackgroundPaper from 'components/BackgroundPaper'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter'
import ResponsivePopUp from 'components/popUp/responsivePopUp'
import RegisterNegocio from 'components/negocio/register'
import RegisterValedor from 'components/valedor/register'
import Hidden from '@material-ui/core/Hidden'
import { updateUser } from 'requests/allValedores'
import { Alert } from '@material-ui/lab'
import { Link } from 'react-router-dom'
import { forgotPassword } from 'requests/forgotPassword'
import { updateUserSelfSchema } from 'yupSchemas'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { AccountCircle } from '@material-ui/icons'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const NameExpression = /^\S/

const validationSchema = yup.object({
  firstName: yup
    .string()
    .min(3, 'Mínimo 3 caracteres')
    .max(65, 'Maxímo 65 caracteres')
    .matches(NameExpression, 'No se permiten espacios vacios')
    .required('Nombre es requerido'),
  lastName: yup
    .string()
    .min(3, 'Mínimo 3 caracteres')
    .max(65, 'Maxímo 65 caracteres')
    .matches(NameExpression, 'No se permiten espacios vacios')
    .required('Apellido es requerido')
})

export const DashboardPerfil = () => {
  const { isAuthenticated, user, login, logout } = useContext(UserContext)
  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [email, setEmail] = useState(user.email)
  const [onEdit, setOnEdit] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [modalTitle, setModalTitle] = useState('valedor')
  const [alertText, setAlertText] = useState('')
  const [alertColor, setAlertColor] = useState('success')
  const [showAlert, setShowAlert] = useState(false)

  const matches = useMediaQuery('(min-width:600px)')

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: matches ? theme.spacing(3) : theme.spacing(1),
      textAlign: 'center',
      borderRadius: '15px',
      color: theme.palette.text.secondary
    }
  }))

  const classes = useStyles()

  const formik = useFormik({
    initialValues: {
      firstName,
      lastName
    },
    onSubmit: (userUpdated) => {
      handleUpdate(userUpdated.firstName, userUpdated.lastName)
    },
    handleChange: (u) => {
      console.log(u)
    },
    validationSchema: updateUserSelfSchema
  })

  useEffect(() => {
    setEmail(user.email)
    setFirstName(user.firstName)
    setLastName(user.lastName)
  }, [user])

  const handleEdit = () => {
    if (onEdit) {
      //handleUpdate()
      formik.handleSubmit()
    } else {
      setOnEdit(true)
    }
  }

  const handleChangePassword = async () => {
    //console.log(user.email)
    const { success, response, error } = await forgotPassword(user.email)
    if (response) {
      if (response.error) {
        setAlertColor('error')
        setAlertText(response.error)
      } else {
        setAlertColor('success')
        setAlertText(
          `Se te ha enviado un correo a ${user.email}, sigue las instrucciones para cambiar contraseña`
        )
      }
      setShowAlert(true)
      setTimeout(() => {
        logout()
      }, 3000)
    }
  }

  const handleUpdate = async (firstName, lastName) => {
    const body = {
      firstName: firstName.trim(),
      lastName: lastName.trim()
    }
    console.log(body)
    const { success, response, error } = await updateUser(user._id, body)
    console.log(response)
    if (success && response) {
      if (response.data.error) {
        setAlertColor('error')
        setAlertText(response.data.error)
        setShowAlert(true)
        login('hello')
      } else {
        setAlertColor('success')
        setAlertText(response.data.message)
        setShowAlert(true)
        login(response.data.token)
        setOnEdit(false)
      }
      setTimeout(() => {
        setShowAlert(false)
      }, 8000)
    }
    if (error) {
      setAlertColor('error')
      setAlertText('Un error ha ocurrido')
      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false)
      }, 8000)
    }
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={9}>
          <Paper className={classes.paper}>
            <form onSubmit={formik.handleSubmit} className={classes.root}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h5" component="h4" gutterBottom>
                    Perfil de Usuario
                  </Typography>
                  <Collapse in={showAlert}>
                    <Alert severity={alertColor}>{alertText}</Alert>
                  </Collapse>
                </Grid>
                <Grid item xs={12} md={2}>
                  <img
                    width="100"
                    src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png"
                  ></img>
                </Grid>
                <Grid item xs={12} sm={6} md={5}>
                  <TextField
                    id="firstName"
                    placeholder="Nombre"
                    fullWidth
                    label="Nombre"
                    disabled={!onEdit}
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.firstName &&
                      Boolean(formik.errors.firstName)
                    }
                    helperText={
                      formik.touched.firstName && formik.errors.firstName
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
                    id="lastName"
                    placeholder="Apellido"
                    fullWidth
                    label="Apellido"
                    style={{ marginTop: '15px' }}
                    disabled={!onEdit}
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.lastName && Boolean(formik.errors.lastName)
                    }
                    helperText={
                      formik.touched.lastName && formik.errors.lastName
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
                </Grid>
                <Grid item xs={12} sm={6} md={5}>
                  <TextField
                    style={{ width: '100%' }}
                    id="standard-basic"
                    label="Email"
                    value={user.email}
                    disabled
                  />
                  <TextField
                    style={{ width: '100%', marginTop: '15px' }}
                    id="standard-basic"
                    label="Rol"
                    value={user.role}
                    disabled
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid
                  item
                  xs={12}
                  style={{
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    flexWrap: 'wrap-reverse'
                  }}
                >
                  {onEdit && (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ marginLeft: '10px' }}
                        type="submit"
                      >
                        Guardar
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        style={{}}
                        onClick={() => setOnEdit(false)}
                      >
                        Cancelar
                      </Button>
                    </>
                  )}
                  {!onEdit && (
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ marginLeft: '10px' }}
                      onClick={(e) => handleEdit(e)}
                    >
                      Edit
                    </Button>
                  )}
                  <a
                    href="#"
                    onClick={handleChangePassword}
                    style={{ marginRight: 'auto' }}
                  >
                    Cambiar contraseña
                  </a>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3} lg={3} style={{}}>
          <Hidden smDown>
            <BackgroundPaper></BackgroundPaper>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                setModalTitle('valedor')
                setShowModal(true)
              }}
              startIcon={<MonetizationOnIcon></MonetizationOnIcon>}
              style={{
                width: '100%',
                marginTop: '10px',
                marginBottom: '10px',
                borderRadius: '15px',
                height: '21%'
              }}
            >
              Registrar Valedor
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setModalTitle('negocio')
                setShowModal(true)
              }}
              startIcon={<BusinessCenterIcon></BusinessCenterIcon>}
              style={{ width: '100%', borderRadius: '15px', height: '21%' }}
            >
              Registrar Negocio
            </Button>
          </Hidden>
          <Hidden mdUp>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                setModalTitle('valedor')
                setShowModal(true)
              }}
              startIcon={<MonetizationOnIcon></MonetizationOnIcon>}
              style={{ width: '100%', padding: '10px', marginBottom: '15px' }}
            >
              Registrar Valedor
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setModalTitle('negocio')
                setShowModal(true)
              }}
              startIcon={<BusinessCenterIcon></BusinessCenterIcon>}
              style={{ width: '100%', padding: '10px', marginBottom: '15px' }}
            >
              Registrar Negocio
            </Button>
          </Hidden>
        </Grid>
      </Grid>
      {modalTitle === 'valedor' ? (
        <ResponsivePopUp
          open={showModal}
          setOpen={setShowModal}
          title="Registra un valedor"
        >
          <RegisterValedor></RegisterValedor>
        </ResponsivePopUp>
      ) : (
        <ResponsivePopUp
          open={showModal}
          setOpen={setShowModal}
          title={'Registra un negocio'}
        >
          <RegisterNegocio></RegisterNegocio>
        </ResponsivePopUp>
      )}
    </div>
  )
}

import React, { useContext, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { Button, Collapse, Typography } from '@material-ui/core'
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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'center',
    borderRadius: '15px',
    color: theme.palette.text.secondary
  }
}))

const DashboardPerfil = () => {
  const classes = useStyles()
  const { isAuthenticated, user } = useContext(UserContext)
  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [email, setEmail] = useState(user.email)
  const [onEdit, setOnEdit] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [modalTitle, setModalTitle] = useState('valedor')
  const [alertText, setAlertText] = useState('')
  const [alertColor, setAlertColor] = useState('success')
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    console.log(firstName, lastName)
  }, [firstName, lastName])

  const handleEdit = () => {
    if (onEdit) {
      handleUpdate()
    } else {
      setOnEdit(true)
    }
  }

  const handleUpdate = async () => {
    const body = {
      firstName,
      lastName
    }
    const { success, response, error } = await updateUser(user._id, body)
    if (success && response) {
      console.log(response)
      setAlertColor('success')
      setAlertText('El usuario se actualizo correctamente')
      setShowAlert(true)
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
            <form noValidate autoComplete="off " className={classes.root}>
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
                    style={{ width: '100%' }}
                    id="standard-basic"
                    label="Nombre"
                    defaultValue={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={!onEdit}
                  />
                  <TextField
                    style={{ width: '100%', marginTop: '15px' }}
                    id="standard-basic"
                    label="Apellido"
                    defaultValue={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    disabled={!onEdit}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={5}>
                  <TextField
                    style={{ width: '100%' }}
                    id="standard-basic"
                    label="Email"
                    defaultValue={email}
                    disabled
                  />
                  <TextField
                    style={{ width: '100%', marginTop: '15px' }}
                    id="standard-basic"
                    label="Rol"
                    defaultValue={user.role}
                    disabled
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid
                  item
                  xs={12}
                  style={{ display: 'flex', flexDirection: 'row-reverse' }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginLeft: '10px' }}
                    onClick={() => handleEdit()}
                  >
                    {onEdit ? 'Save' : 'Edit'}
                  </Button>
                  {onEdit && (
                    <Button
                      variant="contained"
                      color="secondary"
                      style={{}}
                      onClick={() => setOnEdit(false)}
                    >
                      Cancel
                    </Button>
                  )}
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
        <Grid item xs={12} md={2}></Grid>
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

export default DashboardPerfil

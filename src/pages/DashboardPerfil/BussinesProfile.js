import React, { useState, useReducer, useEffect, useContext } from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { Button, Collapse, InputAdornment, Typography } from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail'
import AssignmentIcon from '@material-ui/icons/Assignment'
import StoreIcon from '@material-ui/icons/Store'
import Alert from '@material-ui/lab/Alert'
import Avatar from '@material-ui/core/Avatar'
import Map from './MapComponent'
import { UserContext } from '../../context/userContext'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { updateBussinesSchema } from '../../yupSchemas/bussinesSchemas'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete'
import DirectionsIcon from '@material-ui/icons/Directions'
import { GoogleApiWrapper } from 'google-maps-react'
import Geocode from 'react-geocode'
import { forgotPassword } from '../../requests/forgotPassword'
import useAlert from '../../hooks/useAlert'
import UserAvatar from '../../components/avatar'
import { updateUser } from '../../requests/allValedores'

const BussinesProfile = () => {
  const matches = useMediaQuery('(min-width:600px)')
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: matches ? theme.spacing(2) : theme.spacing(1),
      textAlign: 'center',
      borderRadius: '15px',
      color: theme.palette.text.secondary
    },
    input: {
      display: 'none'
    },
    TextField: {
      marginTop: '10px',
      width: '90%'
    },
    changePassword: {
      float: 'right',
      marginTop: '20px',
      marginRight: '20px'
    },
    avatar: {
      width: '100px',
      height: '100px'
    },
    avatarContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    mapButton: {
      borderRadius: 6,
      width: '12em',
      height: '3em',
      cursor: 'pointer',
      padding: '3px',
      backgroundColor: '#007772',
      color: '#ffff',
      '&:hover': {
        backgroundColor: '#007772'
      }
    }
  }))
  const classes = useStyles()

  const { user, login, logout } = useContext(UserContext)
  const [onEdit, setOnEdit] = useState(false)

  const initialValues = {
    bussinesName: user.bussinesName,
    bussinesAdress: user.bussinesAdress,
    bussinesRfc: user.bussinesRfc,
    email: user.email,
    role: user.role,
    urlImage: user.urlImage
  }

  const validationSchema = yup.object({
    bussinesName: yup
      .string('Enter your bissines name')
      .required('Bussines name is required')
  })

  const [alert, dispatchAlert] = useAlert()
  const avatarRef = React.useRef()
  const [adress, setAddress] = useState(initialValues.bussinesAdress.direction)
  const [latlng, setLatlng] = useState({
    lat: parseFloat(initialValues.bussinesAdress.latitude),
    lng: parseFloat(initialValues.bussinesAdress.longitude)
  })

  const formik = useFormik({
    initialValues,
    onSubmit: async (userUpdated, onS) => {
      setOnEdit(false)
      const newUser = {
        bussinesName: userUpdated.bussinesName,
        email: userUpdated.email,
        bussinesAdress: {
          direction: adress,
          latitude: latlng.lat,
          longitude: latlng.lng
        },
        urlImage: avatarRef.current.urlImage()
      }
      console.log(newUser)
      const { success, response, error } = await updateUser(user._id, newUser)
      if (success && response) {
        if (response.error) {
          dispatchAlert({
            type: 'error',
            payload: {
              content: response.error,
              show: true
            }
          })
        } else {
          login(response.data.token)
          dispatchAlert({
            type: 'success',
            payload: {
              content: `El usuario ha sido actualizado satisfactoriamente`,
              show: true
            }
          })
        }
        setTimeout(() => {
          dispatchAlert({
            type: 'show',
            payload: {
              show: true
            }
          })
        }, 10000)
      }
    },
    onReset: (userUpdated, onS) => {
      onS.setValues(initialValues)
      setAddress(initialValues.bussinesAdress.direction)
      setLatlng({
        lat: parseInt(initialValues.bussinesAdress.latitude),
        lng: parseInt(initialValues.bussinesAdress.longitude)
      })
      avatarRef.current.rollbackImage()
      setOnEdit(false)
    },
    validationSchema: updateBussinesSchema
  })

  useEffect(() => {
    console.log(initialValues)
    return () => {}
  }, [])

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value)
    const coors = await getLatLng(results[0])
    setLatlng(coors)
    console.log(coors)
  }

  const setMarkerPosition = (location) => {
    console.log('locatoin')
    console.log(location)
    setLatlng(location)
    Geocode.setApiKey('AIzaSyC43U2-wqXxYEk1RBrTLdkYt3aDoOxO4Fw')
    Geocode.fromLatLng(location.lat, location.lng).then(
      (response) => {
        console.log('directions')
        console.log(response)
        setAddress(response.results[0].formatted_address)
        setOnEdit(true)
      },
      (error) => {
        console.error(error)
      }
    )
  }

  const handleChangePassword = async () => {
    const { success, response, error } = await forgotPassword(user.email)
    if (response) {
      if (response.error) {
        dispatchAlert({
          type: 'error',
          payload: {
            content: response.error,
            show: true
          }
        })
      } else {
        dispatchAlert({
          type: 'success',
          payload: {
            content: `Se ha enviado un correo a ${initialValues.email}, por favor sigue las instrucciones para cambiar la contraseña.`,
            show: true
          }
        })
      }
      setTimeout(() => {
        dispatchAlert({
          type: 'show',
          payload: {
            show: false
          }
        })
      }, 5000)
    }
  }

  const errorImageHandler = (error) => {
    dispatchAlert({
      type: 'error',
      payload: {
        content: error,
        show: true
      }
    })

    setTimeout(() => {
      dispatchAlert({
        type: 'show',
        payload: {
          show: false
        }
      })
    }, 5000)
  }

  return (
    <div>
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item xs={12} lg={6} xl={7}>
            <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant="h5" component="h4" gutterBottom>
                    Datos del negocio
                  </Typography>
                </Grid>
                <Grid item xs={12} className={classes.avatarContainer}>
                  <UserAvatar
                    errorImageHandler={errorImageHandler}
                    onEdit={onEdit}
                    ref={avatarRef}
                  ></UserAvatar>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircleIcon />
                        </InputAdornment>
                      )
                    }}
                    disabled={!onEdit}
                    id="bussinesName"
                    placeholder="Nombre del negocio"
                    fullWidth
                    label="Nombre del negocio"
                    type="text"
                    className={classes.TextField}
                    value={formik.values.bussinesName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.bussinesName &&
                      Boolean(formik.errors.bussinesName)
                    }
                    helperText={
                      formik.touched.bussinesName && formik.errors.bussinesName
                    }
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    id="bussinesEmail"
                    placeholder="Correo electronico"
                    fullWidth
                    label="Correo electronico"
                    type="text"
                    className={classes.TextField}
                    disabled={!onEdit}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AlternateEmailIcon></AlternateEmailIcon>
                        </InputAdornment>
                      )
                    }}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.bussinesEmail &&
                      Boolean(formik.errors.bussinesEmail)
                    }
                    helperText={
                      formik.touched.bussinesEmail &&
                      formik.errors.bussinesEmail
                    }
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    id="bussinesRFC"
                    placeholder="RFC"
                    fullWidth
                    label="RFC"
                    type="text"
                    className={classes.TextField}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AssignmentIcon></AssignmentIcon>
                        </InputAdornment>
                      )
                    }}
                    value={initialValues.bussinesRfc}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    id="bussinesRole"
                    placeholder="Rol"
                    fullWidth
                    label="Rol"
                    type="text"
                    className={classes.TextField}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <StoreIcon></StoreIcon>
                        </InputAdornment>
                      )
                    }}
                    value={initialValues.role}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <PlacesAutocomplete
                    value={adress}
                    onChange={(value) => {
                      setAddress(value)
                    }}
                    onSelect={(value) => {
                      handleSelect(value)
                      setAddress(value)
                    }}
                  >
                    {({
                      getInputProps,
                      suggestions,
                      getSuggestionItemProps,
                      loading
                    }) => (
                      <div>
                        <TextField
                          className={classes.TextField}
                          label="Direccion del negocio"
                          onChange={(value) => {
                            setAddress(value)
                          }}
                          id="bussinesAdress"
                          {...getInputProps({
                            placeholder: 'Dirección del negocio'
                          })}
                          type="text"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <DirectionsIcon></DirectionsIcon>
                              </InputAdornment>
                            )
                          }}
                          disabled={!onEdit}
                        />
                        <div>
                          {loading ? <div>...Cargando</div> : null}
                          {suggestions.map((suggestion) => {
                            const style = {
                              cursor: 'pointer',
                              backgroundColor: suggestion.active
                                ? '#00777257'
                                : '#fff'
                            }
                            return (
                              <div
                                {...getSuggestionItemProps(suggestion, {
                                  style
                                })}
                                key={suggestion.description}
                              >
                                {suggestion.description}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </PlacesAutocomplete>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <a
                    href="#"
                    onClick={handleChangePassword}
                    className={classes.changePassword}
                  >
                    Cambiar contraseña
                  </a>
                </Grid>
                <Grid item xs={12}>
                  <Collapse in={alert.show}>
                    <Alert
                      style={{ marginTop: '10px' }}
                      severity={alert.severity}
                    >
                      {alert.content}
                    </Alert>
                  </Collapse>
                  <div
                    style={{
                      marginTop: '10px',
                      display: 'flex',
                      justifyContent: 'flex-end'
                    }}
                  >
                    {!onEdit && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setOnEdit(true)}
                      >
                        Editar
                      </Button>
                    )}
                    {onEdit && (
                      <Button variant="contained" color="primary" type="reset">
                        Cancelar
                      </Button>
                    )}
                    {onEdit && (
                      <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                        onClick={() => avatarRef.current.test()}
                      >
                        Guardar
                      </Button>
                    )}
                  </div>
                </Grid>
              </Grid>
            </form>
          </Grid>
          <Grid
            item
            xs={12}
            lg={6}
            xl={5}
            style={{ height: '400px', paddingLeft: '15px' }}
          >
            <Map
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC43U2-wqXxYEk1RBrTLdkYt3aDoOxO4Fw"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              position={latlng}
              setMarkerPosition={setMarkerPosition}
              classes={classes}
              showMarker={false}
            />
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyC43U2-wqXxYEk1RBrTLdkYt3aDoOxO4Fw'
})(BussinesProfile)

import React, { useState, useContext, useEffect } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { GoogleApiWrapper } from 'google-maps-react'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete'
import { TextField, Button, InputAdornment, Grid } from '@material-ui/core'
import './registerNegocio.css'
import Styles from './Styles'
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter'
import EmailIcon from '@material-ui/icons/Email'
import DirectionsIcon from '@material-ui/icons/Directions'
import AssignmentIcon from '@material-ui/icons/Assignment'
import { AlertContext } from '../popUp/responsivePopUp'
import { createNegocio } from 'requests/allNegocios'
import { compose, withStateHandlers } from 'recompose'
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  OverlayView
} from 'react-google-maps'
import Geocode from 'react-geocode'

const divStyle = {
  background: 'white',
  border: '1px solid #ccc',
  borderRadius: '9px'
}
const NameExpression = /^\S/
const RfcExpression = /^(([ÑA-Z|ña-z|&amp;]{3}|[A-Z|a-z]{4})\d{2}((0[1-9]|1[012])(0[1-9]|1\d|2[0-8])|(0[13456789]|1[012])(29|30)|(0[13578]|1[02])31)(\w{2})([A|a|0-9]{1}))$|^(([ÑA-Z|ña-z|&amp;]{3}|[A-Z|a-z]{4})([02468][048]|[13579][26])0229)(\w{2})([A|a|0-9]{1})$/
const validationSchema = yup.object({
  email: yup
    .string()
    .email('Correo Electronico Invalido')
    .matches(NameExpression, 'No se permiten espacios vacios')
    .required('Email es requerido')
    .trim(),
  bussinesName: yup
    .string()
    .min(3, 'Mínimo 3 caracteres')
    .max(30, 'Maxímo 30 caracteres')
    .matches(NameExpression, 'No se permiten espacios vacios')
    .required('Negocio es requerido'),
  bussinesRfc: yup
    .string()
    .matches(NameExpression, 'No se permiten espacios vacios')
    .min(13, 'Mínimo 13 caracteres')
    .matches(RfcExpression, 'Ingrese un RFC valido')
    .required('RFC es requerido')
})

export const RegisterNegocio = (props) => {
  const { alertText, alertColor, setAlertText, setAlertColor } = useContext(
    AlertContext
  )

  const classes = Styles()
  const [address, setAddress] = useState('')
  const [position, setPosition] = useState({
    lat: 0,
    lng: 0
  })
  const [showMap, setShowMap] = useState(false)

  const Map = compose(
    withStateHandlers(
      () => ({
        isMarkerShown: false,
        markerPosition: null
      }),
      {
        onMapClick: ({ isMarkerShown }) => (e) => ({
          markerPosition: {
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
          },
          isMarkerShown: true
        })
      }
    ),
    withScriptjs,
    withGoogleMap
  )((props) => (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={position}
      onClick={props.onMapClick}
    >
      {props.isMarkerShown === true ? (
        <>
          <Marker
            onClick={() => setMarkerPosition(props.markerPosition)}
            position={props.markerPosition}
          >
            {props.isMarkerShown && (
              <OverlayView
                position={props.markerPosition}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                onClick={() => setMarkerPosition(props.markerPosition)}
              >
                <div style={divStyle}>
                  <button
                    className={`${classes.mapButton} `}
                    onClick={() => setMarkerPosition(props.markerPosition)}
                  >
                    Seleccionar esta dirección
                  </button>
                </div>
              </OverlayView>
            )}
          </Marker>
        </>
      ) : (
        <Marker position={position} />
      )}
    </GoogleMap>
  ))

  const setMarkerPosition = (location) => {
    console.log('locatoin')
    console.log(location)
    setPosition(location)
    Geocode.setApiKey('AIzaSyC43U2-wqXxYEk1RBrTLdkYt3aDoOxO4Fw')
    Geocode.fromLatLng(location.lat, location.lng).then(
      (response) => {
        console.log('directions')
        console.log(response)
        setAddress(response.results[0].formatted_address)
      },
      (error) => {
        console.error(error)
      }
    )
  }
  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value)
    const latlng = await getLatLng(results[0])
    setPosition({ lat: latlng.lat, lng: latlng.lng })
  }
  const formik = useFormik({
    initialValues: {
      email: '',
      bussinesName: '',
      bussinesAdress: {
        direction: '',
        latitude: 0,
        longitude: 0
      },
      bussinesRfc: ''
    },
    onSubmit: async (negocio, { resetForm }) => {
      const updatedBusiness = {
        ...negocio,
        bussinesAdress: {
          direction: address,
          latitude: position.lat,
          longitude: position.lng
        }
      }
      const { success, response, error } = await createNegocio(updatedBusiness)
      if (success && response) {
        if (response.error) {
          setAlertColor('error')
          setAlertText(response.error)
        } else {
          setAlertText('El Negocio ha sido creado satisfactoriamente')
          setAlertColor('success')
          resetForm({ negocio: '' })
          setAddress('')
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
              onClick={() => setShowMap(false)}
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
                    <EmailIcon></EmailIcon>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              onClick={() => setShowMap(false)}
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
                    <BusinessCenterIcon></BusinessCenterIcon>
                  </InputAdornment>
                )
              }}
              inputProps={{
                maxLength: 30
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <PlacesAutocomplete
              value={address}
              onChange={(value) => {
                setAddress(value)
              }}
              onSelect={(value) => {
                handleSelect(value)
                setAddress(value)
                setShowMap(true)
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
                    className={classes.widthnew}
                    onClick={() => setShowMap(false)}
                    onChange={(value) => {
                      setAddress(value)
                    }}
                    id="bussinesAdress"
                    {...getInputProps({ placeholder: 'Dirección del negocio' })}
                    type="text"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <DirectionsIcon></DirectionsIcon>
                        </InputAdornment>
                      )
                    }}
                    inputProps={{
                      maxLength: 60
                    }}
                  />
                  <div>
                    {loading ? <div>...Cargando</div> : null}
                    {suggestions.map((suggestion) => {
                      const style = {
                        backgroundColor: suggestion.active
                          ? '#00777257'
                          : '#fff'
                      }

                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, { style })}
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
          <Grid item xs={12} md={6}>
            <TextField
              className={classes.widthnew}
              id="bussinesRfc"
              onClick={() => setShowMap(false)}
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
                    <AssignmentIcon></AssignmentIcon>
                  </InputAdornment>
                )
              }}
              inputProps={{
                maxLength: 13
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
                Registrar Negocio
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>

      {showMap && (
        <>
          <Map
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC43U2-wqXxYEk1RBrTLdkYt3aDoOxO4Fw"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={
              <div style={{ height: `400px`, marginTop: '1em' }} />
            }
            mapElement={<div style={{ height: `100%` }} />}
          />
        </>
      )}
    </div>
  )
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyC43U2-wqXxYEk1RBrTLdkYt3aDoOxO4Fw'
})(RegisterNegocio)

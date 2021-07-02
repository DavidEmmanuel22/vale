import React, { useState, useContext, useEffect } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
// import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
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
// import GoogleMap from 'components/Map/GoogleMap'
import GoogleMapExample from 'components/Map/GoogleMapExample'
import AnotherMap from 'components/Map/AnotherMap'
import { UserContext } from 'context/userContext'
import { compose, withStateHandlers } from 'recompose'
import {
  InfoWindow,
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker
} from 'react-google-maps'

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
  bussinesAdress: yup
    .string()
    .min(3, 'Mínimo 3 caracteres')
    .max(30, 'Maxímo 30 caracteres')
    .matches(NameExpression, 'No se permiten espacios vacios')
    .required('Dirección es requerida'),
  bussinesRfc: yup
    .string()
    .matches(NameExpression, 'No se permiten espacios vacios')
    .min(13, 'Mínimo 13 caracteres')
    .matches(RfcExpression, 'Ingrese un RFC valido')
    .required('RFC es requerido')
})

export const RegisterNegocio = (props) => {
  const classes = Styles()
  const [address, setAddress] = useState('')
  const [position, setPosition] = useState({
    lat: 0,
    lng: 0
  })

  const Map = compose(
    withStateHandlers(
      () => ({
        isMarkerShown: false,
        markerPosition: null
      }),
      {
        onMapClick: ({ isMarkerShown }) => (e) => ({
          markerPosition: e.latLng,
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
      {console.log(props.markerPosition)}
      {props.isMarkerShown && <Marker position={props.markerPosition} />}
    </GoogleMap>
  ))
  console.log(address, position)
  const { alertText, alertColor, setAlertText, setAlertColor } = useContext(
    AlertContext
  )
  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value)
    const latlng = await getLatLng(results[0])
    setPosition({ lat: latlng.lat, lng: latlng.lng })
  }
  const formik = useFormik({
    initialValues: {
      email: '',
      bussinesName: '',
      bussinesAdress: address,
      bussinesRfc: ''
    },
    onSubmit: async (negocio, { resetForm }) => {
      const { success, response, error } = await createNegocio(negocio)
      if (success && response) {
        if (response.error) {
          setAlertColor('error')
          setAlertText(response.error)
        } else {
          setAlertText('El Negocio ha sido creado satisfactoriamente')
          setAlertColor('success')
          resetForm({ negocio: '' })
        }
      }
    },
    validationSchema: validationSchema
  })

  const onMapClick = (t, map, coord) => {
    //console.log(map)
    const { latLng } = coord
    const lat = latLng.lat()
    const lng = latLng.lng()

    console.log(lat, lng)
  }

  return (
    <div className="register-valedor">
      <form className={classes.root} onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
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
                handleSelect(value)
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
      {/* <GoogleMap coordinates={position} /> */}

      {/* <GoogleMapExample /> */}
      {/* <Map google={window.google} zoom={18} initialCenter={position}>
        <Marker
          title={'The marker`s title will appear as a tooltip.'}
          name={'SOMA'}
          draggable={true}
          onDragend={(e) => console.log(e)}
          position={position}
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
        >
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
        </InfoWindow>
      </Map> */}
      {/* <AnotherMap /> */}

      {/* <Map
        google={window.google}
        initialCenter={{
          lat: position.lat,
          lng: position.lng
        }}
        center={{
          lat: position.lat,
          lng: position.lng
        }}
        zoom={16}
        onClick={onMapClick}
      >
        <Marker position={position} />
      </Map> */}

      <Map
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC43U2-wqXxYEk1RBrTLdkYt3aDoOxO4Fw"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  )
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyC43U2-wqXxYEk1RBrTLdkYt3aDoOxO4Fw'
  //LoadingContainer: LoadingContainer
})(RegisterNegocio)

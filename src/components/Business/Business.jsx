import React, { useEffect, useState } from 'react'
import { ClientNavBar } from 'pages/Home/Home'
import { compose, withStateHandlers } from 'recompose'
import {
  OverlayView,
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker
} from 'react-google-maps'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { DistanceMatrixService } from '@react-google-maps/api'
import Tooltip from '@material-ui/core/Tooltip'
import { getBusiness } from 'requests/externalUserAllBusiness'
import './Business.css'
import { TextField, InputAdornment } from '@material-ui/core'
import vv from '../../assets/Map/marker.jpg'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Zoom from '@material-ui/core/Zoom'
import Fab from '@material-ui/core/Fab'
import YoutubeSearchedForIcon from '@material-ui/icons/YoutubeSearchedFor'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    position: 'absolute',
    top: '-21em',
    left: '-10em',
    boxShadow: '0px 0px 15px 6px darkgrey'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
})

export default function OutlinedCard({ businessInfo }) {
  const classes = useStyles()
  const bull = <span className={classes.bullet}>•</span>

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Nombre
        </Typography>
        <Typography variant="h5" component="h2">
          {businessInfo.bussinesName}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          <br />
          Dirección del negocio
        </Typography>
        <Typography variant="body2" component="p">
          {businessInfo.direction}
        </Typography>
      </CardContent>
      <CardActions>
        <a href={businessInfo.urlMap} target="_blank" rel="noopener noreferrer">
          <h2>GOOGLE MAPS</h2>
        </a>
      </CardActions>
    </Card>
  )
}

export const Business = () => {
  const [geolocation, setGeolocation] = useState({})
  const matches = useMediaQuery('(min-width:525px)')
  const [business, setBusiness] = useState([])
  const [loadingMap, setLoadingMap] = useState(true)
  const [focusSelectedBusiness, setFocusSelectedBusiness] = useState({
    hiddeBusinesses: false,
    zoomFocus: false,
    lat: 0,
    lng: 0,
    bussinesName: '',
    direction: '',
    urlMap: '',
    businessMapSelected: false
  })
  const positionFocusSelectedBusiness = {
    lat: parseFloat(focusSelectedBusiness.lat),
    lng: parseFloat(focusSelectedBusiness.lng)
  }

  const position = {
    lat: geolocation.latitude,
    lng: geolocation.longitude
  }
  const showListBusinessStyle = {
    position: 'absolute',
    top: '21%',
    left: '1%',
    background: 'white',
    width: 300
  }

  const showRefreshBtn = {
    position: 'absolute',
    top: `${!matches ? '33%' : '30%'}`,
    left: `${!matches ? '80%' : '94%'}`,
    background: '#0c1821',
    color: 'orange'
  }
  const success = (data) => {
    setGeolocation(data.coords)
    setLoadingMap(false)
  }

  const errors = (data) => {
    console.log(data)
  }

  const options = (data) => {
    console.log(data)
  }

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
    <>
      {loadingMap ? (
        <div className="wrapper">
          <div className="loader-circle"></div>
        </div>
      ) : (
        <GoogleMap
          key={props._id}
          defaultZoom={focusSelectedBusiness.zoomFocus ? 18 : 14}
          defaultCenter={
            focusSelectedBusiness.zoomFocus
              ? positionFocusSelectedBusiness
              : position
          }
          onClick={props.onMapClick}
        >
          <Tooltip
            onClick={() => {
              window.location.reload(true)
            }}
            style={showRefreshBtn}
            TransitionComponent={Zoom}
            title="Recargar"
          >
            <Fab>
              <YoutubeSearchedForIcon />
            </Fab>
          </Tooltip>
          <Autocomplete
            autoHighlight
            id="combo-box-demo"
            filterSelectedOptions
            options={business}
            style={showListBusinessStyle}
            onChange={(event, business) => {
              setFocusSelectedBusiness({
                bussinesName: business.bussinesName,
                hiddeBusinesses: true,
                zoomFocus: true,
                lat: business.bussinesAdress.latitude,
                lng: business.bussinesAdress.longitude,
                direction: business.bussinesAdress.direction,
                urlMap: business.urlMap
              })
            }}
            getOptionLabel={(option) => {
              return option.bussinesName
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Lista de negocios"
                variant="outlined"
              />
            )}
          />
          <Marker position={position} />

          {focusSelectedBusiness.hiddeBusinesses ? (
            <div>
              <Marker
                icon={{
                  path:
                    'M8 12l-4.7023 2.4721.898-5.236L.3916 5.5279l5.2574-.764L8 0l2.3511 4.764 5.2574.7639-3.8043 3.7082.898 5.236z',
                  fillColor: 'yellow',
                  fillOpacity: 0.9,
                  scale: 2,
                  strokeColor: 'gold',
                  strokeWeight: 2
                }}
                onClick={() => console.log('test')}
                position={positionFocusSelectedBusiness}
              />
              <OverlayView
                position={positionFocusSelectedBusiness}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              >
                <OutlinedCard businessInfo={focusSelectedBusiness} />
              </OverlayView>
            </div>
          ) : (
            business.map((value, _) => {
              const pos = {
                lat: parseFloat(value.bussinesAdress.latitude),
                lng: parseFloat(value.bussinesAdress.longitude)
              }

              return !focusSelectedBusiness.hiddeBusinesses ? (
                <div key={_}>
                  <Marker
                    icon={{
                      url: vv
                    }}
                    onClick={() =>
                      setFocusSelectedBusiness({
                        bussinesName: value.bussinesName,
                        hiddeBusinesses: true,
                        zoomFocus: true,
                        lat: value.bussinesAdress.latitude,
                        lng: value.bussinesAdress.longitude,
                        direction: value.bussinesAdress.direction,
                        urlMap: value.urlMap,
                        businessMapSelected: true
                      })
                    }
                    position={pos}
                  />
                </div>
              ) : (
                <OverlayView
                  position={positionFocusSelectedBusiness}
                  mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                >
                  <OutlinedCard businessInfo={focusSelectedBusiness} />
                </OverlayView>
              )
            })
          )}
        </GoogleMap>
      )}
    </>
  ))

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then(function (result) {
          if (result.state === 'granted') {
            //console.log(result.state)
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(success)
          } else if (result.state === 'prompt') {
            navigator.geolocation.getCurrentPosition(success, errors, options)
          } else if (result.state === 'denied') {
            //If denied then you have to show instructions to enable location
          }
          result.onchange = function () {
            //console.log(result.state)
          }
        })
    } else {
      alert('Ubicacion no encontrada!')
    }
  }, [])

  useEffect(() => {
    async function getAllNegocios() {
      const { success, response, error } = await getBusiness()
      if (success && response) {
        setBusiness(response.data)
      } else {
        // console.log(error)
      }
    }

    if (business.length === 0) {
      getAllNegocios()
    }
  }, [business])

  return (
    <div>
      <ClientNavBar />
      <Map
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC43U2-wqXxYEk1RBrTLdkYt3aDoOxO4Fw"
        loadingElement={<div style={{ height: `100vh` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `90vh` }} />}
      />
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import { ClientNavBar } from 'pages/Home/Home'
import { compose, withStateHandlers } from 'recompose'
import {
  InfoWindow,
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker
} from 'react-google-maps'
import { getBusiness } from 'requests/externalUserAllBusiness'

export const Business = () => {
  const [geolocation, setGeolocation] = useState({})
  const [business, setBusiness] = useState([])

  const position = {
    lat: geolocation.latitude,
    lng: geolocation.longitude
  }
  const success = (data) => {
    setGeolocation(data.coords)
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
      <GoogleMap
        defaultZoom={14}
        defaultCenter={position}
        onClick={props.onMapClick}
      >
        <Marker position={position} />
        {business.map((value, _) => {
          const pos = {
            lat: parseFloat(value.bussinesAdress.latitude),
            lng: parseFloat(value.bussinesAdress.longitude)
          }

          return (
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
              onClick={() => console.log(value.urlMap)}
              key={_}
              position={pos}
            />
          )
        })}
      </GoogleMap>
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
      alert('Sorry Not available!')
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

  const style = {
    margin: '10px',
    zIndex: '0',
    position: 'absolute',
    cursor: 'pointer',
    left: '30px',
    top: '30px'
  }
  return (
    <div>
      <ClientNavBar />
      <Map
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC43U2-wqXxYEk1RBrTLdkYt3aDoOxO4Fw"
        loadingElement={<div style={{ height: `100vh` }} />}
        containerElement={
          <div style={{ height: `100%` }}>
            <h2 style={style}>test</h2>
          </div>
        }
        mapElement={<div style={{ height: `90vh` }} />}
      />
    </div>
  )
}

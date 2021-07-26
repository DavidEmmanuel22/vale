import React from 'react'
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

const Map = compose(
  withStateHandlers(
    ({ position, showMarker }) => ({
      showMarker,
      markerPosition: position
    }),
    {
      onMapClick: ({ isMarkerShown }) => (e) => ({
        markerPosition: {
          lat: e.latLng.lat(),
          lng: e.latLng.lng()
        },
        showMarker: true
      })
    }
  ),
  withScriptjs,
  withGoogleMap
)((props) => {
  const { position, setMarkerPosition, classes } = props
  return (
    <GoogleMap defaultZoom={15} center={position} onClick={props.onMapClick}>
      {props.showMarker ? (
        <>
          <Marker
            onClick={() => setMarkerPosition(props.markerPosition)}
            position={props.markerPosition}
          >
            {props.showMarker && (
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
  )
})

export default Map

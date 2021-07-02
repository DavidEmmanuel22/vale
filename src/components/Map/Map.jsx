import React, { useEffect, useState, useMemo, useRef, useCallback } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap
} from 'react-leaflet'
import './Map.css'

export const Map = () => {
  function LocationMarker() {
    const [position, setPosition] = useState(null)
    const [address, setAddress] = useState('')
    console.log(position)
    const [draggable, setDraggable] = useState(false)
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)

        map.flyTo(e.latlng, map.getZoom())
      }
    })

    const markerRef = useRef(null)
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current
          if (marker != null) {
            setPosition(marker.getLatLng())
          }
        }
      }),
      []
    )
    const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d)
    }, [])

    return position === null ? null : (
      <Marker
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}
      >
        <Popup>
          <span onClick={toggleDraggable}>
            {draggable
              ? 'Click para guardar posicion'
              : 'Click aqui para mover el apuntador'}
          </span>
        </Popup>
      </Marker>
    )
  }

  // function DraggableMarker() {
  //   const [draggable, setDraggable] = useState(false)
  //   const [position, setPosition] = useState([
  //     25.445658000260757,
  //     -100.99513944716507
  //   ])
  //   const markerRef = useRef(null)
  //   const eventHandlers = useMemo(
  //     () => ({
  //       dragend() {
  //         const marker = markerRef.current
  //         if (marker != null) {
  //           setPosition(marker.getLatLng())
  //         }
  //       }
  //     }),
  //     []
  //   )
  //   const toggleDraggable = useCallback(() => {
  //     setDraggable((d) => !d)
  //   }, [])

  //   return (
  //     <Marker
  //       draggable={draggable}
  //       eventHandlers={eventHandlers}
  //       position={position}
  //       ref={markerRef}
  //     >
  //       <Popup minWidth={90}>
  //         <span onClick={toggleDraggable}>
  //           {draggable
  //             ? 'El apuntador puede ser movido'
  //             : 'Click aqui para mover el apuntador'}
  //         </span>
  //       </Popup>
  //     </Marker>
  //   )
  // }

  // console.log(value?.coords?.latitude)
  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.permissions
  //       .query({ name: 'geolocation' })
  //       .then(function (result) {
  //         if (result.state === 'granted') {
  //           console.log(result.state)
  //           //If granted then you can directly call your function here
  //           navigator.geolocation.getCurrentPosition(success)
  //         } else if (result.state === 'prompt') {
  //           navigator.geolocation.getCurrentPosition(success, errors, options)
  //         } else if (result.state === 'denied') {
  //           //If denied then you have to show instructions to enable location
  //         }
  //         result.onchange = function () {
  //           console.log(result.state)
  //         }
  //       })
  //   } else {
  //     alert('Sorry Not available!')
  //   }
  // }, [])
  return (
    <MapContainer
      style={{ width: '100%', height: '70vh' }}
      center={[25.445658000260757, -100.99513944716507]}
      zoom={18}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  )
}

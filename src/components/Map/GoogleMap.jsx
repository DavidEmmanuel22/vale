import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete'
import { latLng } from 'leaflet'
import styles from './autocomplete.css'

const mapStyle = {
  width: '100%',
  height: '100%',
  featureType: 'landscape.man_made',
  elementType: 'geometry.fill',
  stylers: [
    {
      color: '#dceafa'
    }
  ]
}

// const containerStyle = {
//   position: 'absolute',
//   width: '100%',
//   height: '100%'
// }
export const LoadingContainer = (props) => <div>Fancy loading container!</div>
export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    position: {
      lat: null,
      lng: null
    },
    address: ''
  }

  componentDidMount() {
    this.renderAutoComplete()
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps.map) this.renderAutoComplete()
  }

  onSubmit(e) {
    e.preventDefault()
  }

  renderAutoComplete() {
    const { google, map } = this.props

    if (!google || !map) return

    const autocomplete = new google.maps.places.Autocomplete(this.autocomplete)
    autocomplete.bindTo('bounds', map)

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()

      if (!place.geometry) return

      if (place.geometry.viewport) map.fitBounds(place.geometry.viewport)
      else {
        map.setCenter(place.geometry.location)
        map.setZoom(17)
      }

      this.setState({ position: place.geometry.location })
    })
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    })

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  onChange = (e) => {
    this.setState({
      address: e
    })
  }

  _mapLoaded(mapProps, map) {
    map.setOptions({
      styles: mapStyle
    })
  }

  handleSelect = async (value) => {
    const results = await geocodeByAddress(value)
    const latlng = await getLatLng(results[0])
    this.setState({
      position: { lat: latlng.lat, lng: latlng.lng }
    })
  }

  render() {
    const { position } = this.state
    const { coordinates } = this.props
    console.log(coordinates)

    return (
      <Map
        google={this.props.google}
        zoom={18}
        style={mapStyle}
        initialCenter={{
          lat: 25.445658000260757 || coordinates.lat,
          lng: -100.99513944716507 || coordinates.lng
        }}
      >
        <Marker
          title={'The marker`s title will appear as a tooltip.'}
          name={'SOMA'}
          draggable={true}
          onDragend={(e) => console.log(e)}
          position={{
            lat: 25.445658000260757 || coordinates.lat,
            lng: -100.99513944716507 || coordinates.lng
          }}
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
        >
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
        </InfoWindow>
      </Map>
      // <div>
      //   <form onSubmit={this.onSubmit}>
      //     <input
      //       placeholder="Enter a location"
      //       ref={(ref) => (this.autocomplete = ref)}
      //       type="text"
      //     />

      //     <input type="submit" value="Go" />
      //   </form>

      //   <div>
      //     <div>Lat: {position && position.lat()}</div>
      //     <div>Lng: {position && position.lng()}</div>
      //   </div>

      //   <Map
      //     style={mapStyle}
      //     // containerStyle={containerStyle}
      //     onReady={(mapProps, map) => this._mapLoaded(mapProps, map)}
      //     onClick={this.onMapClicked}
      //     google={window.google}
      //   >
      //     <Marker
      //       draggable
      //       onClick={this.onMarkerClick}
      //       name={'Current location'}
      //     />

      //     <InfoWindow
      //       marker={this.state.activeMarker}
      //       visible={this.state.showingInfoWindow}
      //     >
      //       <div>
      //         <h1>{this.state.selectedPlace.name}</h1>
      //       </div>
      //     </InfoWindow>
      //   </Map>
      // </div>
      // <div>
      //   <PlacesAutocomplete
      //     value={this.state.address}
      //     onChange={this.onChange}
      //     onSelect={this.handleSelect}
      //   >
      //     {({
      //       getInputProps,
      //       suggestions,
      //       getSuggestionItemProps,
      //       loading
      //     }) => (
      //       <div>
      //         <p>Lat: {this.state.position.lat}</p>
      //         <p>Lng: {this.state.position.lng}</p>
      //         <input {...getInputProps({ placeholder: 'Direccion' })} />
      //         <div>
      //           {loading ? <div>...cargando</div> : null}
      //           {suggestions.map((suggestion) => {
      //             const style = {
      //               backgroundColor: suggestion.active ? '#41b6e6' : '#fff'
      //             }

      //             return (
      //               <div
      //                 {...getSuggestionItemProps(suggestion, { style })}
      //                 key={suggestion.description}
      //               >
      //                 {suggestion.description}
      //               </div>
      //             )
      //           })}
      //         </div>
      //       </div>
      //     )}
      //   </PlacesAutocomplete>
      // </div>

      ///////////////////
      // <div className={styles.flexWrapper}>
      //   <div className={styles.left}>
      //     <form onSubmit={this.onSubmit}>
      //       <input
      //         placeholder="Enter a location"
      //         ref={(ref) => (this.autocomplete = ref)}
      //         type="text"
      //       />

      //       <input className={styles.button} type="submit" value="Go" />
      //     </form>

      //     <div>
      //       {/* <div>Lat: {position && position.lat}</div>
      //       <div>Lng: {position && position.lng}</div> */}
      //     </div>
      //   </div>

      //   <div className={styles.right}>
      //     <Map
      //       {...this.props}
      //       center={position}
      //       centerAroundCurrentLocation={false}
      //       containerStyle={{
      //         height: '100vh',
      //         position: 'relative',
      //         width: '100%'
      //       }}
      //     >
      //       <Marker position={position} />
      //     </Map>
      //   </div>
      // </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyC43U2-wqXxYEk1RBrTLdkYt3aDoOxO4Fw',
  LoadingContainer: LoadingContainer
})(MapContainer)

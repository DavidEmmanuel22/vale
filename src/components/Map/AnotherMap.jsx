import React, { Component } from 'react'
import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete'

export class AnotherMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '',
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      mapCenter: {
        lat: 49.2827291,
        lng: -123.1207375
      },
      markers: [
        {
          title: 'The marker`s title will appear as a tooltip.',
          name: 'SOMA',
          position: { lat: 37.778519, lng: -122.40564 }
        }
      ]
    }
    this.onClickMap = this.onClickMap.bind(this)
  }

  componentDidMount() {
    this.position()
  }

  position = async () => {
    await navigator.geolocation.getCurrentPosition((position) =>
      this.setState({
        mapCenter: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
    )
    console.log(this.state.mapCenter)
  }

  handleChange = (address) => {
    this.setState({ address })
  }

  onClickMap(t, map, coord) {
    //console.log(map)
    const { latLng } = coord
    const lat = latLng.lat()
    const lng = latLng.lng()
    this.setState((previousState) => {
      return {
        markers: [
          ...previousState.markers,
          {
            title: '',
            name: '',
            position: { lat, lng }
          }
        ]
      }
    })

    console.log(lat, lng)
  }

  handleSelect = (address) => {
    this.setState({ address })
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        console.log('Success', latLng)

        // update center state
        this.setState({ mapCenter: latLng })
      })
      .catch((error) => console.error('Error', error))
  }

  render() {
    return (
      <div id="googleMaps">
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading
          }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: 'Search Places ...',
                  className: 'location-search-input'
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item'
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' }
                  return (
                    <div
                      key={suggestion.index}
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>

        <Map
          google={this.props.google}
          initialCenter={{
            lat: this.state.mapCenter.lat,
            lng: this.state.mapCenter.lng
          }}
          center={{
            lat: this.state.mapCenter.lat,
            lng: this.state.mapCenter.lng
          }}
          zoom={15}
          onClick={this.onClickMap}
        >
          {this.state.markers.map((marker, index) => (
            <Marker
              key={index}
              title={marker.title}
              name={marker.name}
              position={marker.position}
              draggable
              onDragend={() => console.log(marker.position)}
            />
          ))}
        </Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBLVHqBpK4pTUHkxRLctTj6a3nHrt1d-uI'
})(AnotherMap)

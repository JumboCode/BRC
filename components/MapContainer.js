import React from "react";
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import getConfig from 'next/config'
const {serverRuntimeConfig, publicRuntimeConfig} = getConfig()

const MyMapComponent = compose(
    withProps({
      googleMapURL: ("https://maps.googleapis.com/maps/api/js?key=" + publicRuntimeConfig.secret),
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `400px` }} />,
      mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
  )((props) =>
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: 42.4075, lng: -71.1190}}
    >
    {console.log(props.googleMapURL)}
      {props.isMarkerShown && <Marker position={{  lat: 42.4075, lng: -71.1190 }} onClick={props.onMarkerClick} />}
    </GoogleMap>
  )
  
  class MapContainer extends React.PureComponent {
    state = {
      isMarkerShown: false,
    }
  
    componentDidMount() {
      this.delayedShowMarker()
    }
  
    delayedShowMarker = () => {
      setTimeout(() => {
        this.setState({ isMarkerShown: true })
      }, 3000)
    }
  
    handleMarkerClick = () => {
      this.setState({ isMarkerShown: false })
      this.delayedShowMarker()
    }
  
    render() {
      return (
        <MyMapComponent
          isMarkerShown={this.state.isMarkerShown}
          onMarkerClick={this.handleMarkerClick}
        />
      )
    }
  }

export default MapContainer;
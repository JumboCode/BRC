import { Component } from "react";
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import getConfig from "next/config";
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const MyMapComponent = compose(
    withProps({
      googleMapURL: ("https://maps.googleapis.com/maps/api/js?key=" + publicRuntimeConfig.MAP_KEY),
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `400px` }} />,
      mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
  )((props) =>
    <GoogleMap
      defaultZoom={8}
      center={{ lat: props.currLocation.lat, lng: props.currLocation.lng }}
    >
      {props.isMarkerShown && <Marker position={{ lat: props.currLocation.lat, lng: props.currLocation.lng }} onClick={props.onMarkerClick} />}
    </GoogleMap>
  )

  class MapContainer extends Component {
    state = {
      isMarkerShown: false,
    }
  
    componentDidMount() {
      this.delayedShowMarker();
    }
  
    delayedShowMarker = () => {
      setTimeout(() => {
        this.setState({ isMarkerShown: true });
      }, 3000);
    }
  
    handleMarkerClick = () => {
      this.setState({ isMarkerShown: false });
      this.delayedShowMarker();
    }
  
    render() {
      return (
        <>
          <MyMapComponent
            isMarkerShown={this.state.isMarkerShown}
            onMarkerClick={this.handleMarkerClick}
            currLocation={this.props.currLocation}
          />
        </>
      );
    }
  }

export default MapContainer;

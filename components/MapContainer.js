import React from "react";
//import { compose, withProps } from "recompose";
//import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import GoogleMapReact from "google-map-react";

// const MyMapComponent = compose(
//     withProps({
//       googleMapURL: ("https://maps.googleapis.com/maps/api/js?key=" + publicRuntimeConfig.MAP_KEY + "&libraries=places"),
//       loadingElement: <div style={{ height: `100%` }} />,
//       containerElement: <div style={{ height: `400px` }} />,
//       mapElement: <div style={{ height: `100%` }} />,
//     }),
//     withScriptjs,
//     withGoogleMap
//   )((props) =>
//     <GoogleMap
//       defaultZoom={8}
//       defaultCenter={{ lat: 42.4075, lng: -71.1190}}
//     >
//       {props.isMarkerShown && <Marker position={{  lat: 42.4075, lng: -71.1190 }} onClick={props.onMarkerClick} />}
//     </GoogleMap>
//   )
  
class MapContainer extends React.Component {
  // state = {
  //   isMarkerShown: false,
  // }
  
  static defaultProps = {
    zoom: 8
  };

  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      userLocation: {
        lat: 0,
        lng: 0
      },
      loading: true
    }
  }

  // componentDidMount() {
  //   this.delayedShowMarker();
  // }

  // delayedShowMarker = () => {
  //   setTimeout(() => {
  //     this.setState({ isMarkerShown: true });
  //   }, 3000);
  // }

  // handleMarkerClick = () => {
  //   this.setState({ isMarkerShown: false });
  //   this.delayedShowMarker();
  // }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        this.setState({
          userLocation: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          loading: false
        });
      },
      (error) => console.log(error),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    );
  }

  render() {
    const { loading, userLocation } = this.state;
    const { google } = this.props;

    if (loading) {
      return null;
    }

    return (
      <div style={{ height: `400px` }}>
        <GoogleMapReact 
          bootstrapURLKeys={{ key: publicRuntimeConfig.MAP_KEY }}
          defaultCenter={this.state.userLocation}
          defaultZoom={this.props.zoom}          
        />
      </div>
    );
  }
}

export default MapContainer;
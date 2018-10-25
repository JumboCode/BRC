import React from "react";
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import GoogleMapReact from "google-map-react";
import getConfig from "next/config";
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

// const MyMapComponent = compose(
//     withProps({
//       googleMapURL: ("https://maps.googleapis.com/maps/api/js?key=" + publicRuntimeConfig.MAP_KEY),
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
  
  class MapContainer extends React.PureComponent {
    state = {
      isMarkerShown: false,
    }

    static defaultProps = {
      center: {
        lat: 42.4075,
        lng: -71.1190
      },
      zoom: 8
    };

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
        <div style={{ height: `400px` }}>
          <GoogleMapReact 
            bootstrapURLKeys={{ key: publicRuntimeConfig.MAP_KEY }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}          
          />
        </div>
      );
    }
  }

export default MapContainer;
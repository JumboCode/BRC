import React from "react";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import GoogleMap from "google-map-react";

class MapContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userLocation: {
        lat: 0,
        lng: 0
      },
      loading: true,
      zoom: 8
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          userLocation: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          loading: false
        });
      },
      (error) => console.log(error)
    );
  }

  renderMarkers(map, maps) {
    let marker = new maps.Marker({
      position: {lat: this.state.userLocation.lat, lng: this.state.userLocation.lng},
      map,
      title: 'Hello World!'
    });
  }

  render() {
    if (this.state.loading) {
      return null;
    }

    //SUCCESSFULLY LOADED GOOGLE MAPS MARKER!! :D
    //uses onGoogleApiLoaded to access google maps api directly
    //https://stackoverflow.com/questions/41405343/adding-marker-to-google-maps-in-google-map-react
    //https://github.com/google-map-react/google-map-react/blob/master/API.md

    return (
      <div style={{ height: `400px` }}>
        <GoogleMap 
          bootstrapURLKeys={{ key: publicRuntimeConfig.MAP_KEY }}
          defaultCenter={this.state.userLocation}
          defaultZoom={this.state.zoom}
          onGoogleApiLoaded={({map, maps}) => this.renderMarkers(map, maps)}
          yesIWantToUseGoogleMapApiInternals
        >
        </GoogleMap>
      </div>
    );
  }
}

export default MapContainer;

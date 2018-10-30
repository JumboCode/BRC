import React from "react";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import GoogleMapReact from "google-map-react";

class MapContainer extends React.Component {
  static defaultProps = {
    center: {
      lat: 42.4075,
      lng: -71.1190
    },
    zoom: 8
  };

  render() {
    return (
      <>
				<GoogleMapReact 
					bootstrapURLKeys={{ key: publicRuntimeConfig.MAP_KEY }}
					defaultCenter={this.props.center}
					defaultZoom={this.props.zoom}          
				/>
      </>
    );
  }
}

export default MapContainer;
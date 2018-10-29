/*
 * notes for directly using google maps api with google-map-react library:

 * if google maps api variables "map" and "maps" are needed outside of
   renderMarkers function, then the following should be added to this.state:

    map: null,
    maps: null

 * then put the following lines of code in renderMarkers:

    this.state.map = map;
    this.state.maps = maps;

 * and every time map and maps need to be used outside of renderMarkers,
   declare them as temporary local variables like so:

    let map = this.state.map;
    let maps = this.state.maps;
*/

import React from "react";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import GoogleMap from "google-map-react";

class MapContainer extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			userLocation: {
				lat: 42.348591,
				lng: -71.073051
			},
			zoom: 13,
			markers: []
		}
	}

	renderMarkers(map, maps) {
		//render marker at bisexual resource center (also the default center)
        //TODO: get lat + lng of all resources and add markers for each resource
		this.state.markers.push(
			new maps.Marker({
				position: {lat: 42.348591, lng: -71.073051},
				map,
				title: "Bisexual Resource Center"
			})
		);

        let locationData = this.props.locations[0]["states"];

        console.log(locationData);

        for(let state in locationData){
            if (locationData.hasOwnProperty(state)) {
                for (let resource in locationData[state])
                {
                    console.log(resource);
                    // this.state.markers.push(
                    //     new maps.Marker({
                    //         position: {lat: , lng: },
                    //         map,
                    //         title: resource
                    //     })
                    // );
                }
            }
        }

        //get user's location
        //TODO: center map at searched query (this.props.searched),
        //      only use user location when searched is undefined
		navigator.geolocation.getCurrentPosition(
			(position) => {
				this.setState({
					userLocation: {
						lat: position.coords.latitude,
						lng: position.coords.longitude
					}
				});

				//render marker
				this.state.markers.push(
					new maps.Marker({
						position: {
                            lat: this.state.userLocation.lat,
                            lng: this.state.userLocation.lng
                        },
						map,
						title: "You are here!"
					})
				);
			},
			(error) => console.log(error)
		);
	}

	render() {
		return (
			<div style={{ height: `400px` }}>
				<GoogleMap
					bootstrapURLKeys={{ key: publicRuntimeConfig.MAP_KEY }}
					defaultCenter={{lat: 42.348591, lng: -71.073051}}
					center={this.state.userLocation}
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

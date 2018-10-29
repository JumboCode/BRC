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
			markers: [],
			map: null,
			maps: null
		}
	}

	renderMarkers(map, maps) {
		//make google map vars available to rest of component
		this.state.map = map;
		this.state.maps = maps;

		//render marker at bisexual resource center (with hard-coded coords)
		//with current implementation, it will always be on map
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

        //get user's location in case "searched" prop is undefined
		navigator.geolocation.getCurrentPosition(
			(position) => {
				this.setState({
					userLocation: {
						lat: position.coords.latitude,
						lng: position.coords.longitude
					}
				});

				//must store in local temp variables to use
				let map = this.state.map; 
				let maps = this.state.maps;

				//render marker
				this.state.markers.push(
					new maps.Marker({
						position: {lat: this.state.userLocation.lat, lng: this.state.userLocation.lng},
						map,
						title: "You are here!"
					})
				);
			},
			(error) => console.log(error)
		);
	}

	render() {

		//SUCCESSFULLY LOADED GOOGLE MAPS MARKER!! :D
		//uses onGoogleApiLoaded to access google maps api directly
		//https://stackoverflow.com/questions/41405343/adding-marker-to-google-maps-in-google-map-react
		//https://github.com/google-map-react/google-map-react/blob/master/API.md

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

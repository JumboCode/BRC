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
            //hard-coded default center is boston brc
			defaultCenter: {
				lat: 42.348591,
				lng: -71.073051
			},
			zoom: 13,
			markers: []
		}
	}

	renderMarkers(map, maps) {
        let MapContainer = this;
        const Geocoder = new maps.Geocoder();   //converts address to lat/lng

		//render marker at bisexual resource center (also the default center)
        Geocoder.geocode({"address": "Bisexual Resource Center"}, function(results, status) {
            if (status == "OK") {
                MapContainer.state.markers.push(
                    new maps.Marker({
                        position: results[0].geometry.location,
                        map: map,
                        title: "Bisexual Resource Center"
                    })
                );
            }
            else {
                console.log("Geocode was not successful for the following reason: " + status);
            }
        });

        //TODO: get lat/lng of all resources, add markers for each resource
        let locationData = this.props.locations[0]["states"];
        for(let region in locationData){
            if (locationData.hasOwnProperty(region)) {
                for (let resource in locationData[region])
                {
                    // console.log(resource);
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

        //get lat/lng of search query
        Geocoder.geocode({"address": this.props.search}, function(results, status) {
            //if exists, recenter to searched location
            if (status == "OK") {
                map.setCenter(results[0].geometry.location);

                MapContainer.state.markers.push(
                    new maps.Marker({
                        position: results[0].geometry.location,
                        map: map
                    })
                );
            }
            //if doesn't exist, recenter to user's location
            else {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        map.setCenter({lat: position.coords.latitude, lng: position.coords.longitude});

                        MapContainer.state.markers.push(
                            new maps.Marker({
                                position: {lat: position.coords.latitude, lng: position.coords.longitude},
                                map: map,
                                title: "You are here!"
                            })
                        );
                    },
                    (error) => console.log(error)
                );
            }
        });        		
	}

	render() {
		return (
			<div style={{ height: `400px` }}>
				<GoogleMap 
					bootstrapURLKeys={{ key: publicRuntimeConfig.MAP_KEY }}
					defaultCenter={this.state.defaultCenter}
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

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
            markers: [],
            map: null,
            maps: null,
            centeredOn: null
        }
        this.getNewCenter = this.getNewCenter.bind(this);
    }
    // new prop, centeredResource: "Region"

    static defaultProps = {
        center: [59.938043, 30.337157],
        zoom: 9,
        //greatPlaceCoords: {lat: 59.724465, lng: 30.080121}
      };

// this may only occur once the the api loads, which only occurs once, despite any changes to the props,etc
	renderMarkers(map, maps) {
        let MapContainer = this;
        this.state.maps = maps;
        this.state.map = map;
        const Geocoder = new maps.Geocoder();   //converts address to lat/lng

		//render marker at bisexual resource center (also the default center)
        Geocoder.geocode({"address": "Bisexual Resource Center"}, function(results, status) {
            if (status == "OK") {
                //console.log("Testing geocode with BRC: " + results[0].geometry.location)
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

        //get lat/lng of all resources, add markers for each resource
        let locationData = this.props.locations[0]["states"];
        for(let region in locationData){
            if (locationData.hasOwnProperty(region)) {
                for (let address in locationData[region])
                {
                    //TODO: cache results in local storage to not hit query limit
                    // Geocoder.geocode({"address": address}, function(results, status) {
                    //     if (status == "OK") {
                    //         MapContainer.state.markers.push(
                    //             new maps.Marker({
                    //                 position: results[0].geometry.location,
                    //                 map: map,
                    //                 title: address
                    //             })
                    //         );
                    //     }
                    //     else {
                    //         console.log("Geocode was not successful for the following reason: " + status);
                    //     }
                    // });
                }
            }
        }

        //get lat/lng of search query
        Geocoder.geocode({"address": this.props.search}, function(results, status) {
            //if exists, recenter to searched location
            if (status == "OK") {
                //map.setCenter(results[0].geometry.location);

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
                        //map.setCenter({lat: position.coords.latitude, lng: position.coords.longitude});

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
        
        this.getNewCenter(map, maps);
    }
    
    getNewCenter(map, maps){
        //get lat/lng of search query
        if (maps != null){
        const Geocoder = new maps.Geocoder();   //converts address to lat/lng
        //console.log("CenteredOn when trying to create the focus" + this.props.centeredOn);
        if (this.props.centeredOn != null){
                Geocoder.geocode({"address": this.props.centeredOn}, function(results, status) {
                    //if exists, recenter to searched location
                    if (status == "OK") {
                        //console.log("Testing the getNewCenter results:" + results[0].geometry.location);
                        map.setCenter(results[0].geometry.location);
                        map.setZoom(6);
                        return (results[0].geometry.location);
                    }
                })
        }
    }
        return this.state.defaultCenter;
    }

	render() {
        this.getNewCenter(this.state.map, this.state.maps);
        //console.log("MapContainer centered on: " + this.props.centeredOn)
		return (
			<div style={{ height: `400px` }}>
				<GoogleMap 
					bootstrapURLKeys={{ key: publicRuntimeConfig.MAP_KEY }}
                    defaultCenter={this.state.defaultCenter}
                    //center = {({map, maps}) => this.getNewCenter(map, maps)}
                    //center = {this.getNewCenter}
                    //center = {[0, 0]}
					defaultZoom={this.state.zoom}
                    onGoogleApiLoaded={({map, maps}) => this.renderMarkers(map, maps)}
                    center = {this.getNewCenter()}
					yesIWantToUseGoogleMapApiInternals
				>
				</GoogleMap>
			</div>
		);
	}
}

export default MapContainer;

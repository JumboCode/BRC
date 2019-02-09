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
            zoom: 12,
            markers: [],
            map: null,
            maps: null,
            centeredOn: null,   //position to recenter to
            clicked: false      //true when map has recentered to any resource
        }
        this.getNewCenter = this.getNewCenter.bind(this);
    }
    // new prop, centeredResource: "Region"

    static defaultProps = {
        center: [59.938043, 30.337157],
        zoom: 9,
    };

    // this may only occur once the the api loads, which only occurs once, despite any changes to the props,etc
    renderMarkers(map, maps) {
        let MapContainer = this;
        this.state.maps = maps;
        this.state.map = map;
        const Geocoder = new maps.Geocoder();   //converts address to lat/lng

        //render marker at bisexual resource center (also the default center)
        Geocoder.geocode({ "address": "Bisexual Resource Center" }, function (results, status) {
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

        //get lat/lng of all resources, add markers for each resource
        let locationData = this.props.locations[0]["states"];
        for (let region in locationData) {
            if (locationData.hasOwnProperty(region)) {
                for (let resource in locationData[region]) {
                    if (locationData[region][resource]["lat"] != undefined &&
                        locationData[region][resource]["lng"] != undefined) {
                        MapContainer.state.markers.push(
                            new maps.Marker({
                                position: { lat: locationData[region][resource]["lat"], lng: locationData[region][resource]["lng"] },
                                map: map,
                                title: resource
                            })
                        );
                    }
                }
            }
        }

        if (this.props.search !== "*") {
            //get lat/lng of search query
            Geocoder.geocode({ "address": this.props.search }, function (results, status) {
                //if exists, recenter to searched location
                if (status == "OK") {
                    //if one of the listed resources wasn't clicked yet
                    if (!MapContainer.state.clicked)
                    {
                        map.setCenter(results[0].geometry.location);
                        MapContainer.state.markers.push(
                            new maps.Marker({
                                position: results[0].geometry.location,
                                map: map
                            })
                        );
                        //set initial region in home.js
                        MapContainer.props.onInitialCenter(MapContainer.getRegion(results[0].address_components));
                    }
                }
                //if doesn't exist, recenter to user's location
                else {
                    alert("Address doesn't exist, using your current position.");
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            let latlng = { lat: position.coords.latitude, lng: position.coords.longitude };
                            if (!MapContainer.state.clicked) {
                                map.setCenter(latlng);
                                MapContainer.state.markers.push(
                                    new maps.Marker({
                                        position: latlng,
                                        map: map,
                                        title: "You are here!"
                                    })
                                );
                                //geocode latlng, then set initial region in home.js
                                Geocoder.geocode({'location': latlng}, function(results, status) {
                                    if (status === 'OK') {
                                        MapContainer.props.onInitialCenter(MapContainer.getRegion(results[0].address_components));
                                    }
                                });
                            }
                        },
                        (error) => console.log("Navigator.geolocation failed" + error)
                    );
                }
            });
        } else {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    let latlng = { lat: position.coords.latitude, lng: position.coords.longitude };
                    if (!MapContainer.state.clicked) {
                        map.setCenter(latlng);
                        MapContainer.state.markers.push(
                            new maps.Marker({
                                position: latlng,
                                map: map,
                                title: "You are here!"
                            })
                        );
                        //geocode latlng, then set initial region in home.js
                        Geocoder.geocode({'location': latlng}, function(results, status) {
                            if (status === 'OK') {
                                MapContainer.props.onInitialCenter(MapContainer.getRegion(results[0].address_components));
                            }
                        });
                    }
                },
                (error) => console.log("Navigator.geolocation failed" + error)
            );            
        }
    }

    //get initial location's region (state) as string from results of
    //google maps geocode data, for example "Massachusetts"
    getRegion(address_components) {
        for (let i = 0; i < address_components.length; i++) {
            //admin area level 1 means state
            if (address_components[i].types[0] == "administrative_area_level_1") {
                return address_components[i].long_name;
            }
        }
    }

    //create new google maps lat/lng object with passed in position
    getNewCenter(map, maps) {
        if (this.props.centeredOn != null) {
            if (maps != null) {
                this.state.clicked = true;
                if (this.props.centeredOn.lat === null && this.props.centeredOn.lng === null) {
                    const Geocoder = new maps.Geocoder(); 
                    Geocoder.geocode({ "address": this.props.centeredOn.region }, function (results, status) {
                        if (status == "OK") {
                            map.setCenter(results[0].geometry.location);
                        }
                        else {
                            console.log("Geocode was not successful for the following reason: " + status);
                        }
                    });
                }
                else {
                    map.setCenter(new google.maps.LatLng(this.props.centeredOn.lat, this.props.centeredOn.lng));
                }
                return this.props.position;
            }
        }
        return this.state.defaultCenter;
    }

    render() {
        this.getNewCenter(this.state.map, this.state.maps);
        return (
            <div style={{ height: `400px` }}>
                <GoogleMap
                    bootstrapURLKeys={{ key: publicRuntimeConfig.MAP_KEY }}
                    defaultCenter={this.state.defaultCenter}
                    defaultZoom={this.state.zoom}
                    zoom={this.props.zoom}
                    onGoogleApiLoaded={({ map, maps }) => this.renderMarkers(map, maps)}
                    center={this.getNewCenter()}
                    yesIWantToUseGoogleMapApiInternals
                >
                </GoogleMap>
            </div>
        );
    }
}

export default MapContainer;

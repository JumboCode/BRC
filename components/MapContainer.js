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
import CustomMarker from "./CustomMarker"
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
			zoom: 11,
            markers: [],
            infowindows: [],
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
    };

    // this may only occur once the the api loads, which only occurs once, despite any changes to the props,etc
    // maps is the API object. Allows you to use functions like geocoding
    // map is our actual map 
    renderMarkers(map, maps) {
        let MapContainer = this;
        this.state.maps = maps;
        this.state.map = map;
        const Geocoder = new maps.Geocoder();   //converts address to lat/lng

		//render marker at bisexual resource center (also the default center)
        Geocoder.geocode({"address": "Bisexual Resource Center"}, function(results, status) {
            if (status == "OK") {
                //console.log("Testing geocode with BRC: " + results[0].geometry.location)
                var currentMarker = new maps.Marker({
                    position: results[0].geometry.location,
                    map: map,
                    title: "Bisexual Resource Center",
                    icon: 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png'
                })

                var infowindow = new google.maps.InfoWindow({
                    content: "test"
                  });

                currentMarker.addListener('mouseover', function() {
                    infowindow.open(map, currentMarker);
                  });
                
                currentMarker.addListener('mouseout', function(){
                    infowindow.close()
                })

                this.state.markers.push(currentMarker)

                //MapContainer.state.markers.push(
                //    currentMarker
                    /*new maps.Marker({
                        position: results[0].geometry.location,
                        map: map,
                        title: "Bisexual Resource Center",
                        icon: 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png'
                    })*/
                //);
            }
            else {
                console.log("Geocode was not successful for the following reason: " + status);
            }
        });

        //get lat/lng of all resources, add markers for each resource
        let locationData = this.props.locations[0]["states"];
        for(let region in locationData){
            if (locationData.hasOwnProperty(region)) {
                for (let resource in locationData[region])
                {
                    if (locationData[region][resource]["lat"] != undefined &&
                        locationData[region][resource]["lng"] != undefined)
                    {
/*            
                        MapContainer.state.markers.push(
                            new maps.Marker({
                                position: {lat: locationData[region][resource]["lat"], lng: locationData[region][resource]["lng"]},
                                map: map,
                                title: resource
                            })
                        );
*/
                    }
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
                alert("Address doesn't exist, using your current position.");
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        map.setCenter({lat: position.coords.latitude, lng: position.coords.longitude});
                        MapContainer.state.markers.push(
                            new maps.Marker({
                                position: {lat: position.coords.latitude, lng: position.coords.longitude},
                                map: map,
                                title: "You are here!",
                                icon: 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png'

                            })
                        );
                    },
                    (error) => console.log(error)
                );
            }
        });    
        
        this.getNewCenter(map, maps);
    }
    
    getNewCenter(map, maps) {
        //get lat/lng of search query
        if (maps != null) {
            const Geocoder = new maps.Geocoder();

            //if exists, recenter to searched location
            if (this.props.centeredOn != null) {
                Geocoder.geocode({"address": this.props.centeredOn}, function(results, status) {
                    if (status == "OK") {
                        map.setCenter(results[0].geometry.location);
                        map.setZoom(6);
                        return (results[0].geometry.location);
                    }
                })
            }
        }
        return this.state.defaultCenter;
    }

    _onChildMouseEnter = (key) => {
        this.props.onHoverKeyChange(key);
    }

    _onChildMouseLeave = () => {
        this.props.onHoverKeyChange(null);
    }

	render() {
        this.getNewCenter(this.state.map, this.state.maps);

    //    const Markers = this.props.markers 

    /*
    const Markers = this.props.markers &&
      this.props.markers.filter((m, index) => index >= rowFrom && index <= rowTo)
      .map((marker, index) => (
        <MarkerExample
          // required props
          key={marker.get('id')}
          lat={marker.get('lat')}
          lng={marker.get('lng')}
          // any user props
          showBallon={index + rowFrom === this.props.openBallonIndex}
          onCloseClick={this._onBalloonCloseClick}
          hoveredAtTable={index + rowFrom === this.props.hoveredRowIndex}
          scale={getScale(index + rowFrom, this.props.visibleRowFirst, this.props.visibleRowLast, K_SCALE_NORMAL)}
          {...markerDescriptions[marker.get('type')]}
          marker={marker} />
      ));
        */
    

		return (
			<div style={{ height: `400px` }}>
				<GoogleMap 
					bootstrapURLKeys={{ key: publicRuntimeConfig.MAP_KEY }}
                    defaultCenter={this.state.defaultCenter}
					defaultZoom={this.state.zoom}
                    onGoogleApiLoaded={({map, maps}) => this.renderMarkers(map, maps)}
                    center = {this.getNewCenter()}
                    onChildMouseEnter = {this._onChildMouseEnter}
                    onChildMouseLeave = {this._onChildMouseLeave}
					yesIWantToUseGoogleMapApiInternals
				>
				</GoogleMap>
			</div>
		);
	}
}

export default MapContainer;

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

        var Popup = createPopupClass();

        function createInfoWindow(map, maps, marker, title) {
            console.log("Creating info window")
            var infowindow = new maps.InfoWindow({
                content: title
            });

            //var infowindow = new Popup(marker.position, title)

            marker.addListener('mouseover', function() {
                infowindow.open(map, marker);
            });
            
            marker.addListener('mouseout', function(){
                infowindow.close()
            })
        }

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

        function createPopupClass() {
            /**
             * A customized popup on the map.
             * @param {!google.maps.LatLng} position
             * @param {!Element} content The bubble div.
             * @constructor
             * @extends {google.maps.OverlayView}
             */
            function Popup(position, content) {
              this.position = position;
          
              content.classList.add('popup-bubble');
          
              // This zero-height div is positioned at the bottom of the bubble.
              var bubbleAnchor = document.createElement('div');
              bubbleAnchor.classList.add('popup-bubble-anchor');
              bubbleAnchor.appendChild(content);
          
              // This zero-height div is positioned at the bottom of the tip.
              this.containerDiv = document.createElement('div');
              this.containerDiv.classList.add('popup-container');
              this.containerDiv.appendChild(bubbleAnchor);
          
              // Optionally stop clicks, etc., from bubbling up to the map.
              google.maps.OverlayView.preventMapHitsAndGesturesFrom(this.containerDiv);
            }
            // ES5 magic to extend google.maps.OverlayView.
            Popup.prototype = Object.create(google.maps.OverlayView.prototype);
          
            /** Called when the popup is added to the map. */
            Popup.prototype.onAdd = function() {
              this.getPanes().floatPane.appendChild(this.containerDiv);
            };
          
            /** Called when the popup is removed from the map. */
            Popup.prototype.onRemove = function() {
              if (this.containerDiv.parentElement) {
                this.containerDiv.parentElement.removeChild(this.containerDiv);
              }
            };
          
            /** Called each frame when the popup needs to draw itself. */
            Popup.prototype.draw = function() {
              var divPosition = this.getProjection().fromLatLngToDivPixel(this.position);
          
              // Hide the popup when it is far out of view.
              var display =
                  Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000 ?
                  'block' :
                  'none';
          
              if (display === 'block') {
                this.containerDiv.style.left = divPosition.x + 'px';
                this.containerDiv.style.top = divPosition.y + 'px';
              }
              if (this.containerDiv.style.display !== display) {
                this.containerDiv.style.display = display;
              }
            };
          
            return Popup;
          }

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

		//render marker at bisexual resource center (also the default center)
        Geocoder.geocode({"address": "Bisexual Resource Center"}, function(results, status) {
            if (status == "OK") {

                var currentMarker = new maps.Marker({
                    position: results[0].geometry.location,
                    map: map,
                    icon: 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png'
                })

                // Google's default info window
                createInfoWindow(map, maps, currentMarker, "Bisexual Resource Center")
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
                        var currentMarker = new maps.Marker({
                                position: {lat: locationData[region][resource]["lat"], lng: locationData[region][resource]["lng"]},
                                map: map,
                                icon: 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png'
                        })
                    
                        createInfoWindow(map, maps, currentMarker, resource)
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
                        map: map,
                        icon: 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png'

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

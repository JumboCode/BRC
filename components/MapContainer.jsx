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

import React from 'react';
import getConfig from 'next/config';
import GoogleMap from 'google-map-react';
import ZoomScale from '../static/ZoomScale';
import { PassThrough } from 'stream';

const { publicRuntimeConfig } = getConfig();

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // hard-coded default center is boston brc
      defaultCenter: {
        lat: 42.348591,
        lng: -71.073051,
      },
      zoom: ZoomScale.middle_zoom,
      markers: [],
      infowindows: [],
      map: null,
      maps: null,
      centeredOn: null, // position to recenter to
      clicked: false, // true when map has recentered to any resource
    };
  }
  // this may only occur once the the api loads, 
  // which only occurs once, despite any changes to the props,etc
  // maps is the API object. Allows you to use functions like geocoding
  // map is our actual map

    // create new google maps lat/lng object with passed in position
    getNewCenter = (map, maps) => {
      if (this.props.centeredOn != null) {
        if (maps != null) {
          this.state.clicked = true;
          if (this.props.centeredOn.lat === null && this.props.centeredOn.lng === null) {
            const Geocoder = new maps.Geocoder();
            Geocoder.geocode({ address: this.props.centeredOn.region }, (results, status) => {
              if (status === 'OK') {
                map.setCenter(results[0].geometry.location);
              } else {
                console.log(`Geocode was not successful for the following reason: ${status}`);
              }
            });
          } else {
            map.setCenter(new google.maps.LatLng(
              this.props.centeredOn.lat, this.props.centeredOn.lng));
          }
          return this.props.position;
        }
      }
      return this.state.defaultCenter;
    }
    
    // get initial location's region (state) as string from results of
    // google maps geocode data, for example "Massachusetts"
    getRegion(address_components) {
      for (let i = 0; i < address_components.length; i++) {
        // admin area level 1 means state
        if (address_components[i].types[0] == 'administrative_area_level_1') {
          return address_components[i].long_name;
        }
      }
    }
    
    _onChildMouseEnter = (key) => {
      this.props.onHoverKeyChange(key);
    }

    _onChildMouseLeave = () => {
      this.props.onHoverKeyChange(null);
    }

    renderMarkers(map, maps) {
      const MapContainer = this;
      this.state.maps = maps;
      this.state.map = map;
      const Geocoder = new maps.Geocoder(); // converts address to lat/lng



      // Google's default info window
      function createInfoWindow(map, maps, marker, title, info) {

        let contentString;
        const contentStyle = 'text-decoration:none;color:#F293C1;';
        const titleString = (title === null || title === 'undefined') ? 'loading...' : title;
        if (info != null && (typeof (info.Website) !== 'undefined')) {
          contentString = `<a style=${contentStyle} href=${info.Website} target='_blank'>${titleString}</a>`;
        } else {
          contentString = `<span style=${contentStyle}>${titleString}</span>`;
        }
        const infowindow = new maps.InfoWindow({
          content: contentString,
        });

        // marker.addListener('mouseover', () => {
        //   infowindow.open(map, marker);
        // });

        // marker.addListener('mouseout', () => {
        //   infowindow.close();
        // });

        marker.addListener('click', () => {
          infowindow.open(map, marker);
        });
      }

      // get lat/lng of all resources, add markers for each resource
      const locationData = this.props.locations[0].states;
      for (const region in locationData) {
        if (locationData.hasOwnProperty(region)) {
          for (const resource in locationData[region]) {
            const resourceInfo = locationData[region][resource];
            if (locationData[region][resource].lat != undefined
                        && locationData[region][resource].lng != undefined) {
              const currentMarker = new maps.Marker({
                position: { lat: locationData[region][resource].lat, lng: locationData[region][resource].lng },
                map,
                icon: 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png',
              });

//                createInfoWindow(map, maps, currentMarker, resourceInfo);
              createInfoWindow(map, maps, currentMarker, resource, resourceInfo);
//                createInfoWindow(map, maps, currentMarker, resource, websiteURL);
           }
          }
        }
      }
      // Check if it's in "view all centers" mode
      if (this.props.search !== '*') {
        // get lat/lng of search query
        Geocoder.geocode({ address: this.props.search }, (results, status) => {
          // if exists, recenter to searched location
          if (status == 'OK') {
            // if one of the listed resources wasn't clicked yet
            if (!MapContainer.state.clicked) {
              map.setCenter(results[0].geometry.location);
              const currentMarker = new maps.Marker({
                position: results[0].geometry.location,
                map,
                icon: 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png',
              });
              createInfoWindow(map, maps, currentMarker, MapContainer.props.search, null);
              // set initial region in home.js
              MapContainer.props.onInitialCenter(MapContainer.getRegion(
                results[0].address_components,
              ));
            }
          } else { // if doesn't exist, recenter to user's location
            alert("Address doesn't exist, using your current position.");
            if (!MapContainer.state.clicked) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  map.setCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
                  const currentMarker = new maps.Marker({
                    position: { lat: position.coords.latitude, lng: position.coords.longitude },
                    map,
                    icon: 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png',
                  });
                  createInfoWindow(map, maps, currentMarker, 'Your location', null);
                }, error => console.log(`Navigator.geolocation failed${error}`),
              );
            }
          }
        });
      } else {
      // If in "view all centers" mode, doesn't show error message
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latlng = { lat: position.coords.latitude, lng: position.coords.longitude };
            if (!MapContainer.state.clicked) {
              map.setCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
              const currentMarker = new maps.Marker({
                position: { lat: position.coords.latitude, lng: position.coords.longitude },
                map,
                icon: 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png',
              });
              createInfoWindow(map, maps, currentMarker, 'Your location', null);
            }
          }, error => console.log(`Navigator.geolocation failed${error}`),
        );
      }
      this.getNewCenter(map, maps);
    }

    render() {
      this.getNewCenter(this.state.map, this.state.maps);
      return (
        <div style={{ height: '400px' }}>
          <GoogleMap
            bootstrapURLKeys={{ key: publicRuntimeConfig.MAP_KEY }}
            defaultCenter={this.state.defaultCenter}
            defaultZoom={this.state.zoom}
            zoom={this.props.zoom}
            onGoogleApiLoaded={({ map, maps }) => this.renderMarkers(map, maps)}
            onChildMouseEnter={this._onChildMouseEnter}
            onChildMouseLeave={this._onChildMouseLeave}
            yesIWantToUseGoogleMapApiInternals
          />
        </div>
      );
    }
}


export default MapContainer;

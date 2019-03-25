/* notes for directly using google maps api with google-map-react library:

 * if google maps api variables "map" and "maps" are needed outside of
   renderMarkers function, then the following should be added to this.state:

    map: null,
    maps: null

 * then put the following lines of code in renderMarkers:

    this.state.map = map;
    this.state.maps = maps;
*/

import React from 'react';
import getConfig from 'next/config';
import GoogleMap from 'google-map-react';
import ZoomScale from '../static/ZoomScale';
import PopupContents from './PopupContents';

/*  Test parameters for the Pop-Up  */
const popupTest = {
  heading: 'Pop-Up Heading',
  address: '123 Address Ave, AZ 01234',
  description: "This is a test of the pop-up. Doesn't it look nice?",
};

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
      // markers: [],
      // infowindows: [],
      map: null,
      maps: null,
      centeredOn: null, // position to recenter to
      clicked: false, // true when map has recentered to any resource
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.centeredOn !== this.props.centeredOn) {
      if (this.props.centeredOn === null) return;
      if (this.state.maps != null) {
        if (this.props.centeredOn.lat === null && this.props.centeredOn.lng === null) {
          const Geocoder = new this.state.maps.Geocoder();
          Geocoder.geocode({ address: this.props.centeredOn.region }, (results, status) => {
            if (status === 'OK') {
              this.props.onAddressChange();
            } else {
              this.props.onBadAddress();
            }
          });
        }
      }
    }
  }

  // // this may only occur once the the api loads, which only occurs once, despite any changes to the props,etc
  // // maps is the API object. Allows you to use functions like geocoding
  // // map is our actual map

  // renderMarkers(map, maps) {
  //   const MapContainer = this;
  //   this.state.maps = maps;
  //   this.state.map = map;
  //   const Geocoder = new maps.Geocoder(); // converts address to lat/lng

  //   // Google's default info window
  //   function createInfoWindow(map, maps, marker, title) {
  //     const infowindow = new maps.InfoWindow({
  //       content: title,
  //     });

  //     marker.addListener('mouseover', () => {
  //       infowindow.open(map, marker);
  //     });

  //     marker.addListener('mouseout', () => {
  //       infowindow.close();
  //     });
  //   }

  //   // render marker at bisexual resource center (also the default center)
  //   Geocoder.geocode({ address: 'Bisexual Resource Center' }, (results, status) => {
  //     if (status === 'OK') {
  //       const currentMarker = new maps.Marker({
  //         position: results[0].geometry.location,
  //         map,
  //         icon: 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png',
  //       });

  //       createInfoWindow(map, maps, currentMarker, 'Bisexual Resource Center');
  //     } else {
  //       console.log(`Geocode was not successful for the following reason: ${status}`);
  //     }
  //   });

  //   // get lat/lng of all resources, add markers for each resource
  //   const locationData = this.props.locations[0].states;
  //   for (const region in locationData) {
  //     if (locationData.hasOwnProperty(region)) {
  //       for (const resource in locationData[region]) {
  //         if (locationData[region][resource].lat != undefined
  //                       && locationData[region][resource].lng != undefined) {
  //           const currentMarker = new maps.Marker({
  //             position: { lat: locationData[region][resource].lat, lng: locationData[region][resource].lng },
  //             map,
  //             icon: 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png',
  //           });

  //           createInfoWindow(map, maps, currentMarker, resource);
  //         }
  //       }
  //     }
  //   }
  //   // Check if it's in "view all centers" mode
  //   if (this.props.search !== '*') {
  //     // get lat/lng of search query
  //     Geocoder.geocode({ address: this.props.search }, (results, status) => {
  //       // if exists, recenter to searched location
  //       if (status === 'OK') {
  //         // if one of the listed resources wasn't clicked yet
  //         if (!MapContainer.state.clicked) {
  //           map.setCenter(results[0].geometry.location);
  //           const currentMarker = new maps.Marker({
  //             position: results[0].geometry.location,
  //             map,
  //             icon: 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png',
  //           });
  //           createInfoWindow(map, maps, currentMarker, MapContainer.props.search);
  //           // set initial region in home.js
  //           MapContainer.props.onInitialCenter(MapContainer.getRegion(results[0].address_components));
  //         }
  //       }
  //       // if doesn't exist, recenter to user's location
  //       else {
  //         MapContainer.props.onBadAddress(); // show warning message
  //         if (!MapContainer.state.clicked) {
  //           navigator.geolocation.getCurrentPosition(
  //             (position) => {
  //               const latlng = { lat: position.coords.latitude, lng: position.coords.longitude };
  //               map.setCenter(latlng);
  //               const currentMarker = new maps.Marker({
  //                 position: latlng,
  //                 map,
  //                 icon: 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png',
  //               });
  //               createInfoWindow(map, maps, currentMarker, 'Your location');

  //               // geocode latlng, then set initial region in home.js
  //               Geocoder.geocode({ location: latlng }, (results, status) => {
  //                 if (status === 'OK') {
  //                   MapContainer.props.onInitialCenter(MapContainer.getRegion(results[0].address_components));
  //                 }
  //               });
  //             }, error => console.log(`Navigator.geolocation failed${error}`),
  //           );
  //         }
  //       }
  //     });
  //   } else {
  //     // If in "view all centers" mode, doesn't show error message
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const latlng = { lat: position.coords.latitude, lng: position.coords.longitude };
  //         if (!MapContainer.state.clicked) {
  //           map.setCenter(latlng);
  //           const currentMarker = new maps.Marker({
  //             position: latlng,
  //             map,
  //             icon: 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png',
  //           });
  //           createInfoWindow(map, maps, currentMarker, 'Your location');

  //           // geocode latlng, then set initial region in home.js
  //           Geocoder.geocode({ location: latlng }, (results, status) => {
  //             if (status === 'OK') {
  //               MapContainer.props.onInitialCenter(MapContainer.getRegion(results[0].address_components));
  //             }
  //           });
  //         }
  //       }, error => console.log(`Navigator.geolocation failed${error}`),
  //     );
  //   }
  //   this.getNewCenter(map, maps);
  // }

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
            map.setCenter(new maps.LatLng(
              this.props.centeredOn.lat, this.props.centeredOn.lng,
            ));
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
      function createInfoWindow(myMap, myMaps, marker, title, info) {
        const titleString = (title === null || title === 'undefined') ? 'loading...' : title;
        const cont = document.createElement('div');
        let expanded = false;

        const titleStyle = 'color:#F293C1;cursor:pointer;height:100%;text-decoration:underline;';
        const expandedStyle = 'color:#F293C1;cursor:pointer;height:100%;';
        const expandedTitleStyle = 'font-weight:bold;color:inherit;text-decoration:none';

        cont.style.cssText = (info !== null && (typeof (info.Website) !== 'undefined'))
          ? titleStyle : 'color:#F293C1;';
        cont.innerHTML = `<p>${titleString}</p>`;

        cont.addEventListener('click', () => {
          if (info !== null && (typeof (info.Website) !== 'undefined') && !expanded) {
            cont.style.cssText = expandedStyle;
            cont.innerHTML = `<a style=${expandedTitleStyle} href=${info.Website} target='_blank'>${titleString}</a><p>${info.Location}</p>`;
            expanded = true;
          } else {
            cont.innerHTML = `<p>${titleString}</p>`;
            expanded = false;
          }
        });

        const infoBubble = new myMaps.InfoWindow({
          content: cont,
          backgroundColor: '#0',
        });

        // marker.addListener('mouseover', () => {
        //   infowindow.open(map, marker);
        // });

        // marker.addListener('mouseout', () => {
        //   infowindow.close();
        // });

        marker.addListener('click', () => {
          infoBubble.open(myMap, marker);
        });
      }

      // get lat/lng of all resources, add markers for each resource
      const locationData = this.props.locations[0].states;
      Object.keys(locationData).map((region) => {
        Object.keys(locationData[region]).map((resource) => {
          const resourceInfo = locationData[region][resource];
          if (locationData[region][resource].lat != undefined
                      && locationData[region][resource].lng != undefined) {
            const currentMarker = new maps.Marker({
              position: {
                lat: locationData[region][resource].lat,
                lng: locationData[region][resource].lng,
              },
              map,
              icon: 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png',
            });
            createInfoWindow(map, maps, currentMarker, resource, resourceInfo);
          }
          return null;
        });
        return null;
      });
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
            MapContainer.props.onBadAddress(); // show warning message
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
        <div style={{ height: '480px' }}>
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

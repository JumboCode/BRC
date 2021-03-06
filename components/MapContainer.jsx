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

const { publicRuntimeConfig } = getConfig();

const chicagoLat = 41.850033;
const chicagoLng = -87.6500523;

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // hard-coded default center is boston brc
      defaultCenter: {
        lat: 42.348591,
        lng: -71.073051,
      },
      queryCenter: null,
      map: null,
      maps: null,
      clicked: false, // true when map has recentered to any resource
    };
    this.markers = {};
  }

  componentDidUpdate(prevProps) {
    if (prevProps.centeredOn !== this.props.centeredOn) {
      if (this.props.centeredOn === null) return;

      const { lat, lng, region } = this.props.centeredOn;
      if (this.state.maps !== null && this.state.map !== null) {
        if (lat === null && lng === null && region !== null) {
          const Geocoder = new this.state.maps.Geocoder();
          Geocoder.geocode({ address: this.props.centeredOn.region }, (results, status) => {
            if (status === 'OK') {
              this.props.onAddressChange();
            } else if (status === 'ZERO_RESULTS') {
              this.props.onBadAddress();
            }
          });
        } else if (lat !== null && lng !== null) {
          this.props.onAddressChange();
          this.state.map.setCenter({ lat, lng });
        }
      }
    }

    if (this.props.group !== prevProps.group) {
      if (prevProps.group !== null) {
        const prevWindow = this.markers[prevProps.group][1];
        prevWindow.close();
      }
      const currWindow = this.markers[this.props.group][1];
      currWindow.open(this.state.map, this.markers[this.props.group][0]);
    }
  }

  // create new google maps lat/lng object with passed in position
  getNewCenter = (map, maps) => {
    if (this.props.centeredOn !== null) {
      if (maps != null) {
        this.state.clicked = true;
        if (this.props.centeredOn.lat === null && this.props.centeredOn.lng === null && this.props.centeredOn.region !== null) {
          const Geocoder = new maps.Geocoder();
          Geocoder.geocode({ address: this.props.centeredOn.region }, (results, status) => {
            if (status === 'OK') {
              map.setCenter(results[0].geometry.location);
            } else {
              console.log(`Geocode was not successful for the following reason: ${status}`);
            }
          });
        } else if (this.props.centeredOn.lat !== null && this.props.centeredOn.lng !== null) {
          map.setCenter(new maps.LatLng(
            this.props.centeredOn.lat, this.props.centeredOn.lng,
          ));
        } else {
          map.setCenter(this.state.queryCenter);
        }
      }
    }
    return this.state.defaultCenter;
  }

  // get initial location's region (state) as string from results of
  // google maps geocode data, for example "Massachusetts"
  getRegion = (addressComponents) => {
    for (let i = 0; i < addressComponents.length; i += 1) {
      // admin area level 1 means state
      if (addressComponents[i].types[0] === 'administrative_area_level_1') {
        return addressComponents[i].long_name;
      }
    }
    return undefined;
  }

  onChildMouseEnter = (key) => {
    this.props.onHoverKeyChange(key);
  }

  onChildMouseLeave = () => {
    this.props.onHoverKeyChange(null);
  }

  renderMarkers(map, maps) {
    const myContainer = this;
    this.state.maps = maps;
    this.state.map = map;
    const Geocoder = new maps.Geocoder(); // converts address to lat/lng

    // Google's default info window
    function createInfoWindow(myMap, myMaps, marker, title, info) {
      const titleString = (title === null || title === 'undefined') ? 'loading...' : title;
      const cont = document.createElement('div');

      const expandedStyle = 'color:#F293C1;height:100%;padding-bottom:12px;padding-right:5px;';
      const expandedTitleStyle = 'font-weight:bold;text-decoration:none;font-size:15px;';
      const expandedDetailStyle = 'color:grey;font-style:italic;';
      const linkStyle = 'color:#F293C1;';

      cont.style.cssText = 'color:#grey;';

      // cont.style.cssText = (info !== null && (typeof (info.Website) !== 'undefined'))
      //   ? titleStyle : 'color:#grey;';

      cont.innerHTML = `<div>${titleString}</div>`;
      if (info !== null && (typeof (info.Website) !== 'undefined')) {
        cont.style.cssText = expandedStyle;
        cont.innerHTML = `
          <div style=${expandedTitleStyle}>${titleString}</div>
          <p style=${expandedDetailStyle}>${info.Location}</p>
          <a id='link' style=${linkStyle} href=${info.Website} target='_blank'>View Website</a>
          `;
      }

      const infoBubble = new myMaps.InfoWindow({
        content: cont,
      });

      // Toggle infoWindow on marker click
      let open = false;
      marker.addListener('click', () => {
        if (!open) infoBubble.open(myMap, marker);
        else infoBubble.close();
        open = !open;
      });

      return infoBubble;
    }

    // get lat/lng of all resources, add markers for each resource
    const locationData = this.props.locations[0].states;
    const windows = {};
    Object.keys(locationData).map(region => Object.keys(locationData[region]).map((resource) => {
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
        const currentWindow = createInfoWindow(map, maps, currentMarker, resource, resourceInfo);
        windows[resource] = [currentMarker, currentWindow];
      }
    }));
    this.markers = windows;
    // Check if in "view all centers" mode
    if (this.props.search !== '*') {
      if (this.props.search === 'mylocation') {
        if (!myContainer.state.clicked) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              myContainer.setState({ queryCenter: position.coords });
              const currentMarker = new maps.Marker({
                position: { lat: position.coords.latitude, lng: position.coords.longitude },
                map,
                icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
              });
              const currWindow = createInfoWindow(map, maps, currentMarker, 'Your location', null);
              currWindow.open(map, currentMarker);
              // Set current position in InfoBar/Accordion
              Geocoder.geocode({ location: { lat: position.coords.latitude, lng: position.coords.longitude } }, (results, status) => {
                if (status === 'OK') {
                  myContainer.props.onInitialCenter(myContainer.getRegion(
                    results[0].address_components,
                  ));
                }
              });
            }, error => console.log(`Navigator.geolocation failed${error}`),
          );
        }
      } else {
        // get lat/lng of search query
        Geocoder.geocode({ address: this.props.search }, (results, status) => {
          // if exists, recenter to searched location
          if (status === 'OK') {
            // if one of the listed resources wasn't clicked yet
            if (!myContainer.state.clicked) {
              myContainer.setState({ queryCenter: results[0].geometry.location });
              // const currentMarker = new maps.Marker({
              //   position: results[0].geometry.location,
              //   map,
              //   icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
              // });
              // createInfoWindow(map, maps, currentMarker, myContainer.props.search, null);
              // set initial region in home.js
              const adminRegion = myContainer.getRegion(results[0].address_components);
              if (myContainer.props.checkStateMatch(Object.keys(myContainer.props.locations[0].states), adminRegion)) {
                myContainer.props.onInitialCenter(adminRegion);
              } else {
                const nearestInfo = this.props.nearest(results[0].geometry.location, this.props.locations[0].states);
                this.props.closestResource(nearestInfo.distance, nearestInfo.group, nearestInfo.region, nearestInfo.position);
              }
            }
          } else { // if doesn't exist, center to US
            myContainer.props.onBadAddress(); // show warning message
            // Set center as United States
            myContainer.setState({ queryCenter: new maps.LatLng(chicagoLat, chicagoLng) });
            // map.setCenter(new maps.LatLng(chicagoLat, chicagoLng));
            this.props.setZoom(ZoomScale.country_zoom);
          }
        });
      }
    } else {
      // Set center as United States (latlng for chicago)
      myContainer.setState({ queryCenter: new maps.LatLng(chicagoLat, chicagoLng) });
      // map.setCenter(new maps.LatLng(chicagoLat, chicagoLng));
      this.props.setZoom(ZoomScale.country_zoom);
    }
  }

  render() {
    this.getNewCenter(this.state.map, this.state.maps);
    return (
      <div style={{ height: '480px' }}>
        <GoogleMap
          bootstrapURLKeys={{ key: publicRuntimeConfig.MAP_KEY }}
          defaultCenter={this.state.defaultCenter}
          defaultZoom={this.props.zoom}
          zoom={this.props.zoom}
          onGoogleApiLoaded={({ map, maps }) => this.renderMarkers(map, maps)}
          onChildMouseEnter={this.onChildMouseEnter}
          onChildMouseLeave={this.onChildMouseLeave}
          yesIWantToUseGoogleMapApiInternals
        />
      </div>
    );
  }
}

export default MapContainer;

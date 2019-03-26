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
      clicked: false, // true when map has recentered to any resource
    };
    this.markers = {};
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
      // let expanded = false;

      // Styles for infoWindow
      // const titleStyle = 'color:#F293C1;cursor:pointer;height:100%;text-decoration:underline;padding:';
      // const expandedStyle = 'color:#F293C1;cursor:pointer;height:100%;padding-bottom:12px;';
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

      // cont.addEventListener('click', () => {
      //   if (info !== null && (typeof (info.Website) !== 'undefined')) {
      //     if (!expanded) {
      //       cont.style.cssText = expandedStyle;
      //       cont.innerHTML = `
      //         <div style=${expandedTitleStyle}>${titleString}</div>
      //         <p style=${expandedDetailStyle}>${info.Location}</p>
      //         <a id='link' style=${linkStyle} href=${info.Website} target='_blank'>View Website</a>
      //         `;
      //       expanded = true;
      //       const link = document.getElementById('link');
      //       if (link) link.addEventListener('click', (e) => { e.stopImmediatePropagation(); });
      //     } else {
      //       cont.innerHTML = `<div>${titleString}</div>`;
      //       expanded = false;
      //       cont.style.cssText = titleStyle;
      //     }
      //   }
      // });

      // cont.addEventListener('mouseenter', () => {
      //   if (info !== null && (typeof (info.Website) !== 'undefined') && !expanded) {
      //     cont.style.cssText = expandedStyle;
      //     cont.innerHTML = `
      //       <div style=${expandedTitleStyle}>${titleString}</div>
      //       <p style=${expandedDetailStyle}>${info.Location}</p>
      //       <a id='link' style=${linkStyle} href=${info.Website} target='_blank'>View Website</a>
      //       `;
      //     expanded = true;
      //     const link = document.getElementById('link');
      //     if (link) link.addEventListener('click', (e) => { e.stopImmediatePropagation(); });
      //   }
      // });

      // cont.addEventListener('mouseleave', () => {
      //   if (info !== null && (typeof (info.Website) !== 'undefined')) {
      //     cont.innerHTML = `<div>${titleString}</div>`;
      //     expanded = false;
      //     cont.style.cssText = titleStyle;
      //   }
      // });

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
    let windows = {};
    Object.keys(locationData).map((region) => {
      return Object.keys(locationData[region]).map((resource) => {
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
      });
    });
    this.markers = windows;
    // Check if in "view all centers" mode
    if (this.props.search !== '*') {
      if (this.props.search === 'mylocation') {
        if (!myContainer.state.clicked) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              map.setCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
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
              map.setCenter(results[0].geometry.location);
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
              }
            }
          } else { // if doesn't exist, center to US
            myContainer.props.onBadAddress(); // show warning message
            // Set center as United States
            map.setCenter(new maps.LatLng(41.850033, -87.6500523));
            this.props.setZoom(ZoomScale.country_zoom);
          }
        });
      }
    } else {
      // Set center as United States
      map.setCenter(new maps.LatLng(41.850033, -87.6500523));
      this.props.setZoom(ZoomScale.country_zoom);
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
          onChildMouseEnter={this.onChildMouseEnter}
          onChildMouseLeave={this.onChildMouseLeave}
          yesIWantToUseGoogleMapApiInternals
        />
      </div>
    );
  }
}

export default MapContainer;

import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import getConfig from 'next/config';
import {
  InfoBar, MapContainer, NavBar, SearchBar, BurgerMenu, WarningMessage, Footer,
} from '../components';
import ZoomScale from '../static/ZoomScale';

const { publicRuntimeConfig } = getConfig();

const fullpage = {
  display: 'block',
  position: 'relative',
};

const mainContainer = {
  display: 'flex',
  flexFlow: 'row wrap-reverse',
  justifyContent: 'space-around',
  margin: '0 20px 0 20px',
  paddingTop: '50px',
};

const map = {
  paddingTop: '20px',
  paddingBottom: '50px',
  width: '500px',
  height: 'auto',
  overlflow: 'auto',
};

const searchStyle = {
  position: 'absolute',
  top: '10px',
  left: '60px',
  margin: '10px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'left',
};

const chicagoLat = 41.850033;
const chicagoLng = -87.6500523;

class Home extends Component {
  // get list of locations as prop
  static async getInitialProps(props) {
    const appURL = publicRuntimeConfig.APP_URL || 'http://localhost:3000';
    // hard coded url for now... need to change later
    const res = await fetch(`${appURL}/locations`);
    const locations = await res.json();
    const { search } = props.query;
    return { locations, search };
  }

  constructor(props) {
    super(props);
    const startLat = props.search === '*' ? chicagoLat : null;
    const startLng = props.search === '*' ? chicagoLng : null;
    this.state = {
      centeredOn: { lat: startLat, lng: startLng, region: null },
      centeredGroup: null,
      initialRegion: '',
      show: false,
      nearbyDist: null,
      nearbyResource: null,
      zoom: props.search === '*' ? ZoomScale.country_zoom : ZoomScale.middle_zoom,
      badAddress: false,
      noMatch: false,
    };
    this.onResourceClicked = this.onResourceClicked.bind(this);
    this.onBadAddress = this.onBadAddress.bind(this);
    this.onAddressChange = this.onAddressChange.bind(this);
    this.checkStateMatch = this.checkStateMatch.bind(this);
    this.centerState = this.centerState.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.closestResource = this.closestResource.bind(this);
  }

  // position is of the format {lat: lat, lng: lng}
  onResourceClicked(position, groupName) {
    this.setState({ centeredOn: position, zoom: ZoomScale.close_zoom, centeredGroup: groupName });
  }

  componentWillReceiveProps(nextProps) {
    console.log("will receive props");
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.search !== this.props.search) {
      if (nextProps.search === '*') {
        // Set center to US and don't display error message
        this.setState({
          centeredOn: { lat: chicagoLat, lng: chicagoLng, region: null },
          zoom: ZoomScale.country_zoom,
        });
      } else {
        this.setState({
          centeredOn: { lat: null, lng: null, region: nextProps.search },
          zoom: ZoomScale.middle_zoom,
        });
        const Geocoder = new google.maps.Geocoder();
        Geocoder.geocode({ address: nextProps.search }, (results, status) => {
          // if exists, recenter to searched location
          if (status === 'OK') {
            const adminRegion = this.getRegion(results[0].address_components);
            if (this.checkStateMatch(Object.keys(this.props.locations[0].states), adminRegion)) {
              this.onSearchChange(adminRegion);
            } else {
              const { nearestDist, nearestGroup } = this.nearest(results[0].geometry.location, this.props.locations[0].states);
              this.closestResource(nearestDist, nearestGroup);
            }
          } else {
            console.log(`Geocode was not successful for the following reason: ${status}`);
          }
        });
      }
    }
  }

  /* find the nearest center by linear distance
      Arguments: position, groups
      return value: distance (miles), group_info */
  nearest = (location, groups) => {
    // R = The Earth's radius, in meters
    const R = 3958.756;
    const lat1 = location.lat();
    const lng1 = location.lng();
    // bestDist: the circumference of the Earth; any resource will be closer
    let bestDist = 24901;
    let bestLoc = null;

    Object.keys(groups).map((outerKey) => {
      Object.keys(groups[outerKey]).map((innerKey) => {
        const lat2 = groups[outerKey][innerKey].lat;
        const lng2 = groups[outerKey][innerKey].lng;
        if (lat2 !== undefined && lng2 !== undefined) {
          const y = lat2 - lat1;
          const dLat = y * Math.PI / 180;
          const x = lng2 - lng1;
          const dLng = x * Math.PI / 180;

          const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
            + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180)
            * Math.sin(dLng / 2) * Math.sin(dLng / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          const d = R * c;

          if (d < bestDist) {
            bestDist = d;
            bestLoc = innerKey;
          }
        }
      });
    });
    return { distance: Math.round(bestDist * 10) / 10, groupInfo: bestLoc };
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

  // set initial location's region as string (used in MapContainer)
  // lets corresponding accordion section know to start opened
  onInitialCenter(region) {
    this.setState({ initialRegion: region });
  }

  closestResource(dist, resource) {
    this.setState({ nearbyDist: dist, nearbyResource: resource });
  }
 
  onSearchChange = (region) => {
    this.setState({ initialRegion: region });
  }

  // for invalid initial searched address
  onBadAddress() {
    this.setState({ badAddress: true });
  }

  onAddressChange() {
    this.setState({ badAddress: false });
  }

  // check if matching region exists accordion section, return true if there's a match
  checkStateMatch(regions, region) {
    const match = regions.includes(region);
    this.setState({ noMatch: !match });
    return match;
  }

  handleToggle() {
    const currShow = this.state.show;
    this.setState({ show: !currShow });
  }

  // region is of the format {lat: null, lng: null, region: string}
  centerState = (region) => {
    this.setState({ centeredOn: region, zoom: ZoomScale.state_zoom });
  }

  setMapZoom = (zoom) => {
    this.setState({ zoom });
  }

  render() {
    const searchAddress = (this.props.search === '*' || this.props.search === 'mylocation')
      ? null : this.props.search;

    let warningMessage;
    if (typeof (this.props.search) === 'undefined') {
      warningMessage = null;
    } else if (this.state.badAddress) {
      warningMessage = 'We cannot seem to find the address you entered! Please make sure it is valid. ';
    } else if (this.state.noMatch) {
      warningMessage = 'No resource centers seem to be found around you in our database. ';
    }

    return (
      <>
        <BurgerMenu />
        <NavBar />
        <SearchBar styles={searchStyle} address={searchAddress} />
        {
          warningMessage ? <WarningMessage message={warningMessage} suggestion={{ dist: this.state.nearbyDist, group: this.state.nearbyResource }} /> : null
        }
        <div style={fullpage}>
          <div />
          <div style={mainContainer}>
            <InfoBar
              locationData={this.props.locations[0].states}
              centerState={this.centerState}
              onResourceClick={this.onResourceClicked}
              initialRegion={this.state.initialRegion}
              closestResource={this.state.nearResource}
            />
            <div style={map}>
              <MapContainer
                search={this.props.search}
                locations={this.props.locations}
                centeredOn={this.state.centeredOn}
                group={this.state.centeredGroup}
                zoom={this.state.zoom}
                onInitialCenter={this.onSearchChange}
                onBadAddress={this.onBadAddress}
                onAddressChange={this.onAddressChange}
                checkStateMatch={this.checkStateMatch}
                setZoom={this.setMapZoom}
                closestResource={this.closestResource}
                nearest={this.nearest}
              />
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default Home;

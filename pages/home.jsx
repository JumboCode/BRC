import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import getConfig from 'next/config';
import {
  InfoBar, MapContainer, PopupContents, NavBar, SearchBar, BurgerMenu, WarningMessage, Footer,
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

const title = {
  fontWeight: 'bold',
  textAlign: 'center',
  fontSize: 40,
  fontFamily: 'sans-serif',
};

const map = {
  paddingTop: '20px',
  paddingBottom: '50px',
  width: '500px',
  height: 'auto',
  overlflow: 'auto',
};

const exitX = {
  position: 'relative',
  left: '750px',
  top: '10px',
};

const searchStyle = {
  position: 'absolute',
  top: '10px',
  left: '100px',
  margin: '10px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'left',
};

/*  Test parameters for the Pop-Up  */
const popupTest = {
  heading: 'Pop-Up Heading',
  address: '123 Address Ave, AZ 01234',
  description: "This is a test of the pop-up. Doesn't it look nice?",
};

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
    this.state = {
      centeredOn: null,
      initialRegion: '',
      show: false,
      zoom: ZoomScale.middle_zoom,
      badAddress: false,
    };
    this.onResourceClicked = this.onResourceClicked.bind(this);
    this.onInitialCenter = this.onInitialCenter.bind(this);
    this.onBadAddress = this.onBadAddress.bind(this);
    this.onAddressChange = this.onAddressChange.bind(this);
    this.centerState = this.centerState.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  // position is of the format {lat: lat, lng: lng}
  onResourceClicked(position) {
    this.setState({ centeredOn: position, zoom: ZoomScale.close_zoom });
    console.log(position);
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.search !== this.state.search) {
      this.setState({ centeredOn: { lat: null, lng: null, region: nextProps.search }, zoom: ZoomScale.middle_zoom });
    }
  }

  // set initial location's region as string (used in MapContainer)
  // lets corresponding accordion section know to start opened
  onInitialCenter(region) {
    this.setState({ initialRegion: region });
  }

  // checks for invalid initial searched address
  onBadAddress() {
    this.setState({ badAddress: true });
  }

  onAddressChange() {
    this.setState({ badAddress: false });
  }

  handleToggle() {
    const currShow = this.state.show;
    this.setState({ show: !currShow });
  }

    // region is of the format {lat: null, lng: null, region: string}
    centerState = (region) => {
      this.setState({ centeredOn: region, zoom: ZoomScale.state_zoom });
    }

    render() {
      return (
        <>
          <BurgerMenu />
          <NavBar />
          <SearchBar styles={searchStyle} />
          { this.state.badAddress ? <WarningMessage /> : <div style={title}>  Bi Spot: Find a group near you.</div> }
          <div style={fullpage}>
            <div />
            <div style={mainContainer}>
              <InfoBar
                locationData={this.props.locations[0].states}
                centerState={this.centerState}
                onResourceClick={this.onResourceClicked}
                initialRegion={this.state.initialRegion}
              />
              <div style={map}>
                <MapContainer
                  search={this.props.search}
                  locations={this.props.locations}
                  centeredOn={this.state.centeredOn}
                  zoom={this.state.zoom}
                  onInitialCenter={this.onInitialCenter}
                  onBadAddress={this.onBadAddress}
                  onAddressChange={this.onAddressChange}
                />
              </div>
            </div>
            {/* Pop up component for on label click */}
            {/* <Popup
                        trigger={<button className="button"> Open Modal </button>}
                        modal={true}
                        closeOnDocumentClick={true}
                        position={'top center'}
                    >
                        { close => (
                            <PopupContents info={popupTest} />
                        )}
                    </Popup> */}
          </div>
          <Footer />
        </>
      );
    }
}

export default Home;

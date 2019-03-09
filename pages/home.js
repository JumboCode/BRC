import { InfoBar, MapContainer, PopupContents, NavBar, BurgerMenu } from "../components";
import { Component } from "react";
import fetch from 'isomorphic-fetch'
import getConfig from "next/config";
import Popup from 'reactjs-popup'


const { publicRuntimeConfig } = getConfig()

const fullpage = {
    display: "block",
    position: "relative"
}

const mainContainer = {
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'space-around',
  margin: "0 20px 0 20px",
  paddingTop: "50px",
};

const map = {
  width: "500px",
  height: "600px",
}

const exitX = {
    position: "relative",
    left: "750px",
    top: "10px"
}

/*  Test parameters for the Pop-Up  */
const popupTest = {
    heading: "Pop-Up Heading",
    address: "123 Address Ave, AZ 01234",
    description: "This is a test of the pop-up. Doesn't it look nice?"
}

class Home extends Component {
    // get list of locations as prop
    static async getInitialProps(props) {
        const appURL = publicRuntimeConfig.APP_URL || "http://localhost:3000";
        //hard coded url for now... need to change later
        const res = await fetch(`${appURL}/locations`);
        const locations = await res.json();
        // here?
        const search = props.query.search
        return { locations, search };
    }

    constructor(props) {
        super(props);
        this.state = {
            centeredOn : null,
            show: false
        };
        this.onResourceClicked = this.onResourceClicked.bind(this);
        this.handleToggle = this.handleToggle.bind(this)
    }

    // this relates to clicking on a pin
    //position is of the format {lat: lat, lng: lng}
    onResourceClicked(position) {
        this.setState({centeredOn: position});
    }

    // this function will be invoked on a state change
    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.position !== this.state.position) {
            this.setState({ centeredOn: nextProps.position, zoom: 14 });
        }
    }

    handleToggle() {
        this.setState({ show: !this.state.show });
    }



    render () {
        return (
            <>
                <NavBar />
                <BurgerMenu />
                <div style={fullpage}>
                    <div style={mainContainer}>
                        <InfoBar
                            locationData={this.props.locations[0]["states"]}
                            onResourceClick = {this.onResourceClicked}
                        />
                        <div style={map}>
                        <MapContainer search={this.props.search}
                                      locations={this.props.locations}  // BRC Locations
                                      centeredOn = {this.state.centeredOn}
                                      closest = {this.props.closet}
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
            </>
        );
    }
}

export default Home;

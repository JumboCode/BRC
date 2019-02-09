import { InfoBar, MapContainer, PopupContents, NavBar, BurgerMenu, SearchBar } from "../components";
import { Component } from "react";
import fetch from 'isomorphic-fetch'
import getConfig from "next/config";
import Popup from 'reactjs-popup'


const { publicRuntimeConfig } = getConfig()

const fullpage = {
    display: "block",
    position: "relative",
    marginTop: "5%",
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

const searchStyle = {
    position: "absolute",
    top: "10px",
    left: "100px",
    margin: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
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
        const search = props.query.search
        return { locations, search };
    }

    constructor(props) {
        super(props);
        this.state = {
            centeredOn : null,
            show: false,
            zoom: 11,
        };
        this.onResourceClicked = this.onResourceClicked.bind(this);
        this.centerState = this.centerState.bind(this);
        this.handleToggle = this.handleToggle.bind(this)
    }

    //position is of the format {lat: lat, lng: lng}
    onResourceClicked(position) {
        this.setState({centeredOn: position, zoom: 14});
    }

    handleToggle() {
        this.setState({ show: !this.state.show });
    }

    //region is of the format {lat: null, lng: null, region: string}
    centerState = (region) => {
        this.setState({centeredOn: region, zoom: 5.5});
    }

    render () {
        return (
            <>
                <BurgerMenu />
                <NavBar />
                <SearchBar styles={searchStyle}/>
                <div style={fullpage}>
                    { condition ? <div>Condition exists</div> : <div>Condition doesn't exist</div>}
                    <div style={mainContainer}>
                        <InfoBar locationData={this.props.locations[0]["states"]} 
                            centerState = {this.centerState} 
                            onResourceClick = {this.onResourceClicked}
                        />
                        <div style={map}>
                        <MapContainer search={this.props.search}
                                      locations={this.props.locations}
                                      centeredOn = {this.state.centeredOn}
                                      zoom = {this.state.zoom}
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

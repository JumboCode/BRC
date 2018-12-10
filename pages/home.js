import { InfoBar, MapContainer, PopUp, NavBar, BurgerMenu } from "../components";
import { Component } from "react";
import fetch from 'isomorphic-fetch'
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig()

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
            centeredOn : null
        };
        this.onResourceClicked = this.onResourceClicked.bind(this);
        this.centerState = this.centerState.bind(this);
    }

    onResourceClicked(region){
        this.setState({centeredOn: region});
    }

    centerState = (region) => {
        this.setState({centeredOn: region});
    }

    render () {
        console.log(this.centeredOn);
        return (
            <>
                <NavBar />
                <BurgerMenu />
                <div style={mainContainer}>
                    <InfoBar locationData={this.props.locations[0]["states"]} centerState = {this.centerState} onResourceClick = {this.onResourceClicked}/>
                    <div style={map}>
                    <MapContainer search={this.props.search}
                                  locations={this.props.locations}
                                  centeredOn = {this.state.centeredOn}
                    />
                    </div>
                </div>
            </>
        );
    }
}


export default Home;

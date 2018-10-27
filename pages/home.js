import { InfoBar, MapContainer, PopUp, NavBar } from "../components";
import { Component } from "react";
import fetch from 'isomorphic-fetch'
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig()

const mainContainer = {
  display: 'flex',
  flexFlow: 'row wrap',
  alignContent: 'space between',
  margin: "3% 20px 0px 20px",
};

const map = {
  flex: 1
}

class Home extends Component  {
    // get list of locations as prop
    static async getInitialProps({ req }) {
        const appURL = publicRuntimeConfig.APP_URL || "http://localhost:3000";
        //hard coded url for now... need to change later
        const res = await fetch(`${appURL}/locations`);
        const locations = await res.json();
        return { locations };
    }

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div>
                <div style={mainContainer}>
                    <InfoBar locationData={this.props.locations[0]["states"]}/>
                    <div style={map}>
                    <MapContainer currLocation={this.props.search}/>
                    </div>
                </div>
            </div>
        );
    }
}


export default Home;

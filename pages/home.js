import { InfoBar, MapContainer, PopUp, NavBar, BurgerMenu } from "../components";
import { Component } from "react";
import fetch from 'isomorphic-fetch'
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig()
/*
 * locations data is in the form:
    [
        {
            "_id": { "$oid": "(some random string)" },
            "name": "location 1 name"
        },
        {
            "_id": { "$oid": "(some random string)" },
            "name": "location 2 name"
        },
        etc...
    ]
*/
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

class Home extends Component  {
    // get list of locations as prop
    static async getInitialProps({ req }) {
        const appURL = publicRuntimeConfig.APP_URL || "http://localhost:3000";
        //hard coded url for now... need to change later
        const res = await fetch(`${appURL}/locations`);
        const locations = await res.json();
        return { locations };
    }

    constructor (props) {
        super(props);
        this.state = {};
    }

    render () {
        return (
            <>
                <NavBar />
                <BurgerMenu />
                <div style={mainContainer}>
                    <InfoBar locationData={this.props.locations[0]["states"]}/>
                    <div style={map}>
                        <MapContainer />
                    </div>
                </div>
            </>
        );
    }
}


export default Home;

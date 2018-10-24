import { InfoBar, MapContainer, PopUp, NavBar } from "../components";
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
        console.log(appURL)
        //hard coded url for now... need to change later
        const res = await fetch(`${appURL}/locations`)
        console.log("Getting data")
        const locations = await res.json()
        return { locations }
    }

    constructor (props) {
        super(props);
        this.state = {};
    }

    render () {
        return (
            <div>
                <div style={mainContainer}>
                    <InfoBar locationData={this.props.locations[0]["states"]}/>
                    <div style={map}>
                    < MapContainer />
                    </div>
                </div>
            </div>
        );
    }
}


export default Home;

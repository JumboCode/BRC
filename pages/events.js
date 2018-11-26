import { InfoBar, MapContainer, PopUp, NavBar, BurgerMenu, Events } from "../components";
import { Component } from "react";
import fetch from 'isomorphic-fetch'
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig()

const mainContainer = {
    display: "flex",
    flexFlow: 'row wrap',
    justifyContent: 'space-around',
    margin: "0 20px 0 20px",
    paddingTop: "50px",
  };

const map = {
    width: "500px",
    height: "600px",
}

class EventsPage extends Component {
    // get list of locations as prop
    static async getInitialProps(props) {
        const appURL = publicRuntimeConfig.APP_URL || "http://localhost:3000";
        //hard coded url for now... need to change later
        const res = await fetch(`${appURL}/locations`);
        const locations = await res.json();
        const search = props.query.search
        return { locations, search };
    }

    render () {
        return (
            <>
                <NavBar/>
                <BurgerMenu />
                <div style={mainContainer}>
                    <div>
                        <h1>Events Calendar</h1>
                        <Events/>
                    </div>

                    <div style={map}>
                    <MapContainer 
                            search={this.props.search}
                            locations={this.props.locations}
                    />
                    </div>
                </div>
                
            </>
        );
    }
}

export default EventsPage;
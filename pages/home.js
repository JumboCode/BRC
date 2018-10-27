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

    constructor (props) {
        super(props);
        this.state = {
            position: {
                lat: 0,
                lng: 0
            }
        }
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(position);
                this.setState({
                    position: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                });
            },
            (error) => console.log(error),
            { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
        );
    }

    render () {
        return (
            <div>
                <div style={mainContainer}>
                    <InfoBar locationData={this.props.locations[0]["states"]}/>
                    <div style={map}>
                    <MapContainer position={this.state.position}/>
                    </div>
                </div>
            </div>
        );
    }
}


export default Home;

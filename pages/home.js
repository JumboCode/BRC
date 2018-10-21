import { InfoBar, MapContainer, PopUp, NavBar } from "../components";
import { Component } from "react";
import fetch from 'isomorphic-fetch'

const mainContainer = {
  display: 'flex',
  flexFlow: 'row wrap',
  alignContent: 'space between',
  margin: "3% 20px 0px 20px",
};

const map = {
  flex: 1
}

class Home extends Component {
    // get list of locations as prop - hard coded url for now... change later
    static async getInitialProps() {
        const res = await fetch('http://localhost:3000/locations')
        const locations = await res.json()
        return { locations }
    }

    constructor(props) {
        super(props)
        this.state = {
            currLatLng: {
                lat: 0,
                lng: 0
            }
        }
    }

    componentDidMount() {
        this.getGeoLocation()
    }

    componentWillUpdate() {
        this.getGeoLocation()
    }

    //get curr location to center map
    getGeoLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    this.setState(prevState => ({
                        currLatLng: {
                            ...prevState.currLatLng,
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    }))
                }
            )
        } else {
            error => console.log(error)
        }
    }   

    render () {
        return (
            <div>
                <div style={mainContainer}>
                    <InfoBar locationData={this.props.locations[0]["states"]}/>
                    <div style={map}>
                    < MapContainer currLocation={this.state.currLatLng}/>
                    </div>
                </div>
            </div>
        );
    }
}


export default Home;

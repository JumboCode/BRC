import { MapContainer, PopUp, NavBar } from "../components";
import { Component } from "react";
import fetch from 'isomorphic-fetch'
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig()
import Calendar from 'rc-calendar';
import 'rc-calendar/assets/index.css';

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

class Event extends Component {
    // get list of locations as prop
    static async getInitialProps(props) {
        return { };
    }

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render () {
        return (
            <>
                <NavBar />
                <div style={mainContainer}>
                    <Calendar />
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


export default Event;

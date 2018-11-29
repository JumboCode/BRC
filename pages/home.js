import { InfoBar, MapContainer, PopUp, NavBar, BurgerMenu } from "../components";
import { Component } from "react";
import fetch from 'isomorphic-fetch'
import getConfig from "next/config";

var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Overlay = ReactBootstrap.Overlay;


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

const popupTest = {
    heading: "Pop-Up Heading",
    address: "123 Address Ave, AZ 01234",
    description: "This is a test of the pop-up. Doesn't it look nice?"
}

// const popupStyle = {
//     display: "block",
//     position: "fixed",
//     bottom: "8000px",
//     width: "100%",
//     height: "100%",
//     top: "0",
//     left: "0",
//     right: "0",
//     bottom: "0",
//     backgroundColor: "#000000",
//     zIndex: "2",
//     cursor: "pointer"
// }

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
            show: false
        };
        this.onResourceClicked = this.onResourceClicked.bind(this);
        this.handleToggle = this.handleToggle.bind(this)
    }

    onResourceClicked(region){
        this.setState({centeredOn: region});
    }

    handleToggle() {
        this.setState({ show: !this.state.show });
    }


    render () {
        return (
            <>
                <NavBar />
                <BurgerMenu />
                <div style={mainContainer}>
                    <InfoBar locationData={this.props.locations[0]["states"]} onResourceClick = {this.onResourceClicked}/>
                    <div style={map}>
                    <MapContainer search={this.props.search}
                                  locations={this.props.locations}
                                  centeredOn = {this.state.centeredOn}
                    />
                    </div>
                </div>
                <p onClick={this.handleToggle} > Show Pop-up </p>
                <Overlay
                    show={this.state.show}
                    onHide={() => this.setState({ show: false })}
                    placement="right"
                    container={this}
                    targer={() => ReactDOM.findDDOMNode(this.target)}
                > 
                    <PopUp info={popupTest} />
                </Overlay>
            </>
        );
    }
}


export default Home;

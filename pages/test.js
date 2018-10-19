import TitleBar  from "../components/TitleBar";
import Accordion from "../components/Accordion";
import AccordionSection from "../components/AccordionSection";
import ResourceInfo from "../components/ResourceInfo";
import { Component } from "react";
import fetch from 'isomorphic-fetch';

/*
class Home extends Component  {
    // get list of locations as prop
    static async getInitialProps({ req }) {
        //hard coded url for now... need to change later
        const res = await fetch('http://localhost:3000/locations.json')
        const locations = await res.json()
        return { locations }
    }

    constructor (props) {
        super(props);
        this.state = {};
    }

    render () {
            return (
            <div className = "Home">
                <TitleBar />
                < MapContainer />
                <ul>
                        {this.props.locations.map(location =>
                            <li key={location.name}>{location.name}</li>
                        )}
                </ul>
            </div>
        );
    }
}
*/
class Test extends Component {
    static async getInitialProps() {
        //hard coded url for now... need to change later
        const res = await fetch('http://localhost:3000/locations.json')
        const locations = await res.json()
        console.log(locations)
        return { locations }
    }

    constructor (props) {
        super(props);
        this.state = {};
    }

    printLocations = () => {
        console.log("printLocations")
    console.log(this.props.locations[0])
    console.log(this.props.locations[0].states)
    console.log(this.props.locations[1])

    };

    render (){
        return(
        <div>
        <ul>
            {console.log(this.props.locations)}

            {this.props.locations.map((location, i) =>
                //console.log(location),
                console.log(location.states)
                //console.log(location[0])
                //console.log(locations),
                //console.log(location),
                //console.log("Inside map"),
                //<li key={i}>{location.name}</li>
            )}
            {this.printLocations()}
 
        </ul>

        <Accordion>
            <AccordionSection title = "Arizona">
                <ResourceInfo list = {[["https://www.facebook.com/fluidarizona/","Fluid arizona"], ["http://bimetrophx.wix.com/bimetrophx", "Bisexuals in Metro Phoenix"]]} />
            </AccordionSection>
            <AccordionSection title = "California">
                <ResourceInfo list = {[["http://www.meetup.com/ambiLA/","AMBI Los Angeles"], ["http://www.bayareabisexualnetwork.org/", "Bay Area Bisexual Network"]]}/>
            </AccordionSection>
            <AccordionSection title = "Colorado">
                <ResourceInfo list = {[["Nothing", "Test1"]]} />
            </AccordionSection>
            <AccordionSection title = "District of Columbia">
                <ResourceInfo list = {[["Nothing2", "Test2"]]} />
            </AccordionSection>
        </Accordion>
        </div>
        )
    }
};

export default Test;

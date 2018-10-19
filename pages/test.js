import Accordion from "../components/Accordion";
import AccordionSection from "../components/AccordionSection";
import ResourceInfo from "../components/ResourceInfo";
import { Component } from "react";
import fetch from 'isomorphic-fetch';

class Test extends Component {
    // get list of locations as prop
    static async getInitialProps({ req }) {
        //hard coded url for now... need to change later
        const res = await fetch('http://localhost:3000/locations')
        const locations = await res.json()
        return { locations }
    }

    constructor (props) {
        super(props);
        this.state = {};
    }

    printLocations = () => {
    //console.log("printLocations")
    console.log(this.props.locations[0].states) // This is the one
    var locationData = this.props.locations[0].states
    console.log(Object.keys(locationData)) // Gets all the states in an array
    var states = Object.keys(locationData)

    var centers = []
    for (var i = 0; i < states.length; i++){
        centers.push(Object.keys(locationData[states[i]]))
    }
    console.log(centers)

    console.log("Not sure what this is")
    for(var i = 0; i < locationData.length; i++){
        console.log(i)
        console.log(locationData[i])
    }

    for(var key in locationData){
        if (locationData.hasOwnProperty(key)) {
            console.log(key + " ->" + locationData[key])
            console.log(locationData[key])
            var innerData = locationData[key]
            //innerData = locationData[key]
            for(var k in innerData){
                if (innerData.hasOwnProperty(k)){
                    console.log(k + "--->" + innerData[k])
                }
            }

        }

    }

}
    render (){
        return(
        <div>
        <ul>
            {console.log(this.props.locations)}
            {this.printLocations()} 
            {}
        </ul>
        <Accordion> 

        </Accordion>


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

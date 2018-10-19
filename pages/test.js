import Accordion from "../components/Accordion";
import AccordionSection from "../components/AccordionSection";
import ResourceInfo from "../components/ResourceInfo";
import Resources from "../components/Resources";
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

    render (){
        var locationData = this.props.locations[0].states

        var sections = []
        // key is the state's name here
        // state resources is the list of resources for that state
        for(var state in locationData){
            if (locationData.hasOwnProperty(state)) {
                var stateResources = locationData[state]
                sections.push(<AccordionSection title = {state}> <Resources resources = {stateResources}/> </AccordionSection>)
            }
    
        }

        return(
        <div>

        <Accordion> 
            {sections}
        </Accordion>

<h1> old stuff </h1>

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

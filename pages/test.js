import Accordion from "../components/Accordion";
import AccordionSection from "../components/AccordionSection";
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
        var i = 0
        for(var state in locationData){
            if (locationData.hasOwnProperty(state)) {
                var stateResources = locationData[state]
                sections.push(<AccordionSection title = {state} key = {i}> <Resources resources = {stateResources}/> </AccordionSection>)
                i++
            }
        }

        return(
        <Accordion> 
            {sections}
        </Accordion>
        )
    }
};

export default Test;

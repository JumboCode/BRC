import Accordion from "../components/Accordion";
import AccordionSection from "../components/AccordionSection";
import Resources from "../components/Resources";
import { Component } from "react";

const info = {
  flex: 1,
  display: 'flex',
  flexFlow: 'column wrap'
};

const title = {
  fontWeight: 'bold',
  fontSize: 40,
  fontFamily: 'sans-serif',
  paddingBottom: "75px",
  paddingTop: "35px",
};

class InfoBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    var locationData = this.props.locationData
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
      <div style = {info}>
        <div style = {title}>  Bi Spot: Find a group near you.</div>
        <Accordion>
          {sections}
        </Accordion>
  </div>
    )
  }
}


export default InfoBar;

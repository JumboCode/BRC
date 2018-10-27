import Accordion from "../components/Accordion";
import AccordionSection from "../components/AccordionSection";
import Resources from "../components/Resources";
import { Component } from "react";
import LetterSelectBar from "./LetterSelectBar";

const info = {
  flex: 1,
  display: 'flex',
  flexFlow: 'column wrap'
};

const title = {
  fontWeight: 'bold',
  fontSize: 45,
  fontFamily: 'BlinkMacSystemFont'
};

class InfoBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterLetter: "all"
    };
    this.onLetterClicked = this.onLetterClicked.bind(this)
  }

  onLetterClicked(letter){
    this.setState( {filterLetter: letter})
    console.log("Received letter " + letter)
  }

  render() {
    var locationData = this.props.locationData
    var sections = []
    var i = 0
    for(var state in locationData){
      if(state[0] == this.state.filterLetter || this.state.filterLetter == "all") {
        if (locationData.hasOwnProperty(state)) {
            var stateResources = locationData[state]
            sections.push(<AccordionSection title = {state} key = {i}> <Resources resources = {stateResources}/> </AccordionSection>)
            i++
        }
      }
    }

    return(
      <div style = {info}>
        <div style = {title}>  Bi Spot: Find a group near you.</div>
        <LetterSelectBar onLetterClicked = {this.onLetterClicked}/>
        <Accordion>
          {sections}
        </Accordion>
  </div>
    )
  }
}


export default InfoBar;

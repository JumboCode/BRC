import { Accordion, AccordionSection, Resources, LetterSelectBar } from ".";
import { Component } from "react";

const info = {
  display: 'flex',
  flexFlow: 'column wrap',
  height: '90vh',
  overflow: 'auto',
};

const title = {
  fontWeight: 'bold',
  fontSize: 40,
  fontFamily: 'sans-serif',
  paddingBottom: "5%",
};

const scroll = {
  paddingRight: "10px",
  height: '70%',
  overflow: 'scroll',
}

class InfoBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterLetter: "all"
    };
    this.onLetterClicked = this.onLetterClicked.bind(this)
  }


  static defaultProps = {
    onResourceClick: (region) => {console.log("InfoBar has region: " + region)}
  }

  onLetterClicked(letter){
    this.setState( {filterLetter: letter})
  }

  render() {
    var locationData = this.props.locationData
    //console.log(locationData);
    var sections = []
    var i = 0
    for(var state in locationData){
      if(state[0] == this.state.filterLetter || this.state.filterLetter == "all") {
        if (locationData.hasOwnProperty(state)) {
            //var stateResources = locationData[state]
            ////// This is where state resources are dished out
            var stateResources = locationData[state];
            var resourceRegion = state;
            console.log(state);
            
            sections.push(<AccordionSection title = {state} key = {i}> <Resources region = {resourceRegion} resources={stateResources} onResourceClick = {this.props.onResourceClick}/> </AccordionSection>)
            i++
        }
      }
    }

    return(
      <div style = {info}>
        <div style = {title}>  Bi Spot: Find a group near you.</div>
        <LetterSelectBar onLetterClicked = {this.onLetterClicked}/>
        <div style={scroll}> 
          <Accordion>
            {sections}
          </Accordion>
        </div>
      </div>
    )
  }
}


export default InfoBar;

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

  onLetterClicked(letter){
    this.setState( { filterLetter: letter })
  }

  getLetterFilters = () => {
    let noDuplicates = {}
    let letters = Object.keys(this.props.locationData).map((word) => {
      noDuplicates[word[0]] = true;
    });
    return Object.keys(noDuplicates);
  }

  render() {
    let stateInitials = this.getLetterFilters();
    let locationData = this.props.locationData
    let sections = []
    let i = 0
    for(let state in locationData){
      if(state[0] == this.state.filterLetter || this.state.filterLetter == "all") {
        if (locationData.hasOwnProperty(state)) {
            let stateResources = locationData[state]
            sections.push(<AccordionSection title={state} key={i}> <Resources resources={stateResources}/> </AccordionSection>)
            i++
        }
      }
    }

    return(
      <div style = {info}>
        <div style = {title}>  Bi Spot: Find a group near you.</div>
        <LetterSelectBar letters={stateInitials} onLetterClicked = {this.onLetterClicked}/>
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

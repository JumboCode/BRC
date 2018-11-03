import { Accordion, AccordionSection, Resources, LetterSelectBar } from ".";
import { Component } from "react";
import Calendar from 'react-calendar'

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
  state = {
    date: new Date(),
  }

  onChange = date => this.setState({Date})

  constructor(props) {
    super(props);
    this.state = {
      filterLetter: "all"
    };
    this.onLetterClicked = this.onLetterClicked.bind(this)
  }

  onLetterClicked(letter){
    this.setState( {filterLetter: letter})
  }

  render() {
    var locationData = this.props.locationData
    var sections = []
    var i = 0
    for(var state in locationData){
      if(state[0] == this.state.filterLetter || this.state.filterLetter == "all") {
        if (locationData.hasOwnProperty(state)) {
            var stateResources = locationData[state]
            sections.push(<AccordionSection title = {state} key = {i}> <Resources resources={stateResources}/> </AccordionSection>)
            i++
        }
      }
    }

    return(
      <div style = {info}>
        <div style = {title}>  Bi Spot: Find a group near you.</div>
        <Calendar onChange = {this.onChange} value = {this.state.date}/>
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

import { Accordion, AccordionSection, Resources, LetterSelectBar } from ".";
import { Component } from "react";
import ReactDOM from 'react-dom';

const info = {
  display: 'flex',
  flexFlow: 'column',
  height: '90vh',
  overflow: 'auto',
};

const title = {
  fontWeight: 'bold',
  fontSize: 40,
  fontFamily: 'sans-serif',
  paddingBottom: "5%",
};

const calendar = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
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
      filterLetter: "all",
      matchedRegion: false  //set to true when MapContainer gets init region
    };
    this.onLetterClicked = this.onLetterClicked.bind(this);
  }


  static defaultProps = {
    onResourceClick: (region) => {console.log("InfoBar has region: " + region)}
  }

  onLetterClicked(letter) {
    if (letter === this.state.filterLetter) {
      this.setState( { filterLetter: "all" } );
    } else {
      this.setState( {filterLetter: letter} );
    }
  }


  getLetterFilters = () => {
    let noDuplicates = {};
    let letters = Object.keys(this.props.locationData).map((word) => {
      noDuplicates[word[0]] = true;
    });
    return Object.keys(noDuplicates);
  }

  render() {
    let stateInitials = this.getLetterFilters();
    let locationData = this.props.locationData;
    let sections = [];
    let i = 0;
    for (let state in locationData) {
      if (state[0] == this.state.filterLetter || this.state.filterLetter == "all") {
        if (locationData.hasOwnProperty(state)) {
          var stateResources = locationData[state];
          var resourceRegion = state;
          var startOpen = false;

          //if initial region's matching accordion section wasn't found yet,
          //check if initial region matches with accordion section region
          if (this.props.initialRegion != "" && !this.state.matchedRegion &&
              this.props.initialRegion == state) {
            startOpen = true;
            this.state.matchedRegion = true;
          }

          sections.push(<AccordionSection title = {state}
                                          key = {i}
                                          region = {resourceRegion}
                                          centerState = {this.props.centerState}
                                          startOpen = {startOpen}>
                                          <Resources region = {resourceRegion}
                                                     resources={stateResources}
                                                     onResourceClick = {this.props.onResourceClick}/>
                        </AccordionSection>);
            i++;
        }
      }
    }

    return(
      <div style = {info}>
        <div style = {title}>  Bi Spot: Find a group near you.</div>
        <LetterSelectBar letters={stateInitials} selected={this.state.filterLetter} onLetterClicked = {this.onLetterClicked} />
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

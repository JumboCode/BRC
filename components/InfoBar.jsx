import { Component } from 'react';
import ReactDOM from 'react-dom';
import merge from 'lodash';
import {
  Accordion, AccordionSection, Resources, LetterSelectBar,
} from '.';

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
  paddingBottom: '5%',
};

const calendar = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
};

const scroll = {
  paddingRight: '10px',
  height: '70%',
  overflow: 'scroll',
};

class InfoBar extends Component {
  state = {
    date: new Date(),
  }

  onChange = date => this.setState({ Date })

  constructor(props) {
    super(props);
    this.state = {
      filterLetter: 'all',
      matchedRegion: false, // set to true when MapContainer gets init region
      movedRegion: false,
      locationData: this.props.locationData,
    };
    this.onLetterClicked = this.onLetterClicked.bind(this);
  }

  onLetterClicked(letter) {
    if (letter === this.state.filterLetter) {
      this.setState({ filterLetter: 'all' });
    } else {
      this.setState({ filterLetter: letter });
    }
  }

  getLetterFilters = () => {
    const noDuplicates = {};
    const letters = Object.keys(this.props.locationData).map((word) => {
      noDuplicates[word[0]] = true;
    });
    return Object.keys(noDuplicates);
  }

  render() {
    const stateInitials = this.getLetterFilters();
    const sections = [];
    let i = 0;
    for (const state in this.state.locationData) {
      if (state[0] == this.state.filterLetter || this.state.filterLetter == 'all') {
        if (this.state.locationData.hasOwnProperty(state)) {
          const stateResources = this.state.locationData[state];
          const resourceRegion = state;
          let startOpen = false;

          // open region accordion section after moving section to top
          if (i == 0 && this.state.matchedRegion && !this.state.movedRegion) {
            startOpen = true;
            this.setState({ movedRegion: true });
          }

          // check for region match if wasn't found yet
          if (this.props.initialRegion != '' && !this.state.matchedRegion
              && this.props.initialRegion == state) {
            this.setState({ matchedRegion: true });

            // remove from middle of locationData object, then add at front
            delete this.state.locationData[state];
            const sectionToMove = {};
            sectionToMove[state] = stateResources;
            this.setState({ locationData: _.merge(sectionToMove, this.state.locationData) });
          }

          sections.push(<AccordionSection
            title={state}
            key={i}
            region={resourceRegion}
            centerState={this.props.centerState}
            startOpen={startOpen}
          >
            <Resources
              region={resourceRegion}
              resources={stateResources}
              onResourceClick={this.props.onResourceClick}
            />
          </AccordionSection>);
          i++;
        }
      }
    }

    return (
      <div style={info}>
        <div style={title}>  Bi Spot: Find a group near you.</div>
        <LetterSelectBar letters={stateInitials} selected={this.state.filterLetter} onLetterClicked={this.onLetterClicked} />
        <div style={scroll}>
          <Accordion>
            {sections}
          </Accordion>
        </div>
      </div>
    );
  }
}

export default InfoBar;

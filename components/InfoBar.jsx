import React, { Component } from 'react';
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
  width: '90vh',
};

const scroll = {
  paddingRight: '10px',
  height: '70%',
  overflow: 'scroll',
};

const footer = {
  color: '#707070',
  lineHeight: '18px',
  paddingTop: '20px',
  fontFamily: 'sans-serif', // find out if a different font is needed
  fontSize: '13px',
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
    Object.keys(this.props.locationData).map((word) => {
      noDuplicates[word[0]] = true;
      return true;
    });
    return Object.keys(noDuplicates);
  }

  render() {
    const stateInitials = this.getLetterFilters();
    const sections = [];
    let i = 0;
    for (const state in this.state.locationData) {
      if (state[0] === this.state.filterLetter || this.state.filterLetter == 'all') {
        if (this.state.locationData.hasOwnProperty(state)) {
          const stateResources = this.state.locationData[state];
          const resourceRegion = state;
          let startOpen = false;

          // open region accordion section after moving section to top
          if (i === 0 && this.state.matchedRegion && !this.state.movedRegion) {
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
        <LetterSelectBar letters={stateInitials} selected={this.state.filterLetter} onLetterClicked={this.onLetterClicked} />
        <div style={scroll}>
          <Accordion>
            {sections}
          </Accordion>
        </div>
        <div style={footer}>
          If you are interested in starting your own bi+ group, check out our free resource here:
          {' '}
          <a
            style={{ textDecoration: 'underline', color: '#F293C1' }}
            rel="noopener noreferrer"
            target="_blank"
            href="http://biresource.org/wp-content/uploads/2019/01/Growing-Bi-Community.pdf"
          >
              Growing Bi+ Community
          </a>
        </div>
      </div>
    );
  }
}

export default InfoBar;

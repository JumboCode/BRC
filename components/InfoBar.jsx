import React, { Component } from 'react';
import merge from 'lodash';
import Link from 'next/link';
import {
  Accordion, AccordionSection, Resources, LetterSelectBar,
} from '.';

const info = {
  display: 'flex',
  flexFlow: 'column',
  height: '90vh',
  overflow: 'auto',
  width: '90vh',
  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
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
  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', // find out if a different font is needed
  fontSize: '13px',
};

class InfoBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterLetter: 'all',
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

  onResourceClick = (position, groupName) => {
    this.props.onResourceClick(position, groupName);
  }

  render() {
    const stateInitials = this.getLetterFilters();
    const sections = [];
    Object.keys(this.props.locationData).map((state) => {
      if (state[0] === this.state.filterLetter || this.state.filterLetter === 'all') {
        const stateResources = this.props.locationData[state];
        if (this.props.initialRegion === state) {
          sections.unshift(
            <AccordionSection
              title={state}
              key={state}
              region={state}
              centerState={this.props.centerState}
              startOpen
            >
              <Resources
                selected={this.props.selectedGroup}
                region={state}
                resources={stateResources}
                onResourceClick={this.onResourceClick}
              />
            </AccordionSection>,
          );
        } else {
          sections.push(
            <AccordionSection
              title={state}
              key={state}
              region={state}
              centerState={this.props.centerState}
              startOpen={false}
            >
              <Resources
                selected={this.props.selectedGroup}
                region={state}
                resources={stateResources}
                onResourceClick={this.onResourceClick}
              />
            </AccordionSection>,
          );
        }
      }
    });

    return (
      <div style={info}>
        <LetterSelectBar
          letters={stateInitials}
          selected={this.state.filterLetter}
          onLetterClicked={this.onLetterClicked}
        />
        <div style={scroll}>
          <Accordion>
            {sections}
          </Accordion>
        </div>
        <div style={footer}>
          If you belong to a group that you would like to have listed here, please
          {' '}
          <Link href={{ pathname: '/suggestion' }}><span style={{ textDecoration: 'underline', color: '#F293C1', cursor: 'pointer' }}>drop us the details</span></Link>
          .
          <br />
          <br />
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

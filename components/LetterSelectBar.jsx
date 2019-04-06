import React, { Component } from 'react';
import Letter from './Letter';

const LetterSelectBarStyle = {
  display: 'flex',
  flexDirection: 'row wrap',
  justifyContent: 'center',
  fontSize: '18px',
  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', // find out if a different font is needed
};

const LetterStyle = {
  marginLeft: '5px',
  marginRight: '5px',
  color: '#707070',
  cursor: 'pointer',
};

const ActiveLetter = {
  padding: '1px 7px 1px 7px',
  color: '#FFFFFF',
  backgroundColor: '#F293C1',
  cursor: 'pointer',
};

class LetterSelectBar extends Component {
  constructor(props) {
    super(props);
    this.onLetterClicked = this.onLetterClicked.bind(this);
    this.state = {};
  }

  onLetterClicked(letter) {
    this.props.onLetterClicked(letter);
  }

  render() {
    const sections = [];
    const filters = this.props.letters;
    for (let i = 0; i < filters.length; i += 1) {
      const character = filters[i];
      let letterStyle = LetterStyle;
      if (character === this.props.selected) {
        letterStyle = ActiveLetter;
      }
      sections.push(
        <Letter
          key={i}
          letter={character}
          styleLetter={letterStyle}
          onLetterClicked={this.onLetterClicked}
        />,
      );
    }

    return (
      <div style={LetterSelectBarStyle} className="LetterSelectBar">
        {sections}
      </div>
    );
  }
}

LetterSelectBar.defaultProps = {
  letter: 'A',
};


export default LetterSelectBar;

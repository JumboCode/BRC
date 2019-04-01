import React, { Component } from 'react';

class Letter extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

    onClick = () => {
      this.props.onLetterClicked(this.props.letter);
    }

    render() {
      return (
        <p
          style={this.props.styleLetter}
          onKeyDown={this.onClick}
          onClick={this.onClick}
        >
          {this.props.letter}
        </p>
      );
    }
}

Letter.defaultProps = {
  letter: 'A',
};

export default Letter;

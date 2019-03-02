import { Component } from 'react';

const warningTitle = {
  color: '#F293C1',
  fontSize: '50px',
  fontWeight: 'bold',
};


const innerContainer = {
  flexDirection: 'column',
  alignItems: 'flex-start',
  marginLeft: '25%',
  marginRight: '25%',
};

const warningMessageContent = {
  color: 'black',
  fontSize: '21px',
  marginTop: '10px',
  borderTop: '5px solid #F293C1',
  paddingTop: '10px',
};

class NoMatchWarning extends Component {
  render() {
    return (
      <div style={innerContainer}>
        <div style={warningTitle}>Oh Darn!</div>
        <div style={warningMessageContent}>
                    Found no matches :(
        </div>
      </div>
    );
  }
}

export default NoMatchWarning;

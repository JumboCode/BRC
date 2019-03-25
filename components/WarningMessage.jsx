import { Component } from 'react';

const warningTitle = {
  color: '#F293C1',
  fontSize: '50px',
  fontWeight: 'bold',
};


const innerContainter = {
  flexDirection: 'column',
  alignItems: 'flex-start',
  marginTop: '20px',
  marginLeft: '15%',
  marginRight: '15%',
  fontFamily: 'sans-serif',
};

const warningMessageContent = {
  color: 'black',
  fontSize: '18px',
  marginTop: '10px',
  borderTop: '5px solid #F293C1',
  paddingTop: '10px',
};

const contactLink = {
  fontSize: '21px',
  color: '#F293C1',
  fontWeight: 'bold',
  textDecoration: 'none',
};

class WarningMessage extends Component {
  render() {
    return (
      <div style={innerContainter}>
        <div style={warningTitle}>Oh No!</div>
        <div style={warningMessageContent}>
                    No resource centers seem to be found around you in our database. Make sure its address is valid.
                    If its address is valid, then it's possible that our database has not updated this resource center yet,
                    please
          {' '}
          <a href="mailto: brc@biresource.org" style={contactLink}>contact us.</a>
          {' '}
          <br />
          {' '}
          <br />
                    Here is the list of all the resource centers we currently have:
        </div>
      </div>
    );
  }
}

export default WarningMessage;

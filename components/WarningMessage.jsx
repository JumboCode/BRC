import { Component } from 'react';

const warningTitle = {
  color: '#F293C1',
  fontSize: '50px',
  fontWeight: 'bold',
};

const title = {
  fontWeight: 'bold',
  textAlign: 'center',
  fontSize: 40,
  fontFamily: 'sans-serif',
  marginTop: '30px',
  color: '#F293C1',
};

const innerContainer = {
  flexDirection: 'column',
  alignItems: 'flex-start',
  marginTop: '20px',
  marginLeft: '15%',
  marginRight: '15%',
};

const warningMessageContent = {
  color: 'black',
  fontSize: '21px',
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

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    fetch('/sendEmail', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        //no body for now
      })
    })
  }

  render() {
    // warning message for invalid address
    if (this.props.badAddress) {
      return (
        <div style={innerContainer}>
          <div style={warningTitle}>Oh No!</div>
          <div style={warningMessageContent}>
                      No resource centers seem to be found around you in our database. Make sure its address is valid.
                      If its address is valid, then it's possible that our database has not updated this resource center yet,
                      please
            {' '}
            <a style={contactLink} href="#" onClick={this.handleSubmit}>contact us.</a>
            {' '}
            <br />
            {' '}
            <br />
                      Here is the list of all the resource centers we currently have:
          </div>
        </div>
      );
    }
    // warning message for no state matches address
    else if (this.props.noMatch) {
      return (
        <div style={innerContainer}>
          <div style={warningTitle}>Oh No!</div>
          <div style={warningMessageContent}>
                      It lookes like there are no Bi groups in your state. If you know any around you and would like to
                      add it to our website, please
            {' '}
            <a style={contactLink} href="#" onClick={this.handleSubmit}>suggest it to us</a>
            {' '}
            and we'll update our database!
            <br />
            {' '}
            <br />
                      Here is the nearest resource center from you:
          </div>
        </div>
      );
    }
    //regular title
    else {
      return (<div style={title}>  Bi Spot: Find a group near you.</div>);
    }
  }
}

export default WarningMessage;

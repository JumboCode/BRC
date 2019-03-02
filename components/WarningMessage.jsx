import { Component } from 'react';

const warningTitle = {
  color: '#F293C1',
  fontSize: '50px',
  fontWeight: 'bold',
};


const innerContainter = {
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
    return (
      <div style={innerContainter}>
        <div style={warningTitle}>Oh No!</div>
        <div style={warningMessageContent}>
                    No resource centers seem to be found around you in our database. Make sure its address is valid.
                    If its address is valid, then it's possible that our database has not updated this resource center yet,
                    please
          {' '}
          //looks ugly and reloads page for now
          <form onSubmit={this.handleSubmit}>
            <input type="submit" value="contact us." />
          </form>
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

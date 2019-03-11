import React from 'react';
import Router from 'next/router';

const buttonStyle = {
  backgroundColor: '#C9C9C9',
  color: 'white',
  borderRadius: '6px',
  border: 'none',
  textAlign: 'center',
  padding: '6px 18px',
  marginRight: '13px',
};

const myLocationStyle = {
  backgroundColor: '#F293C1',
  color: 'white',
  borderRadius: '6px',
  border: 'none',
  textAlign: 'center',
  padding: '6px 18px',
  marginRight: '13px',
};

const areaStyle = {
  marginTop: '13px',
}

class DefaultCity extends React.Component {
  setRedirectNYC = () => {
    Router.push({
      pathname: '/home',
      query: { search: 'New York' },
    });
  }


  setRedirectLA = () => {
    Router.push({
      pathname: '/home',
      query: { search: 'Los Angeles' },
    });
  }

  setRedirectBoston = () => {
    Router.push({
      pathname: '/home',
      query: { search: 'Boston' },
    });
  }

  setRedirectSeattle = () => {
    Router.push({
      pathname: '/home',
      query: { search: 'Seattle' },
    });
  }

  setRedirectMyLocation = () => {
    Router.push({
      pathname: '/home',
      query: { search: '*' },
    });
  }

  render() {
    return (
      <div style={areaStyle}>
        <button type="submit" onClick={this.setRedirectNYC} style={buttonStyle}> New York, NY </button>
        <button type="submit" onClick={this.setRedirectLA} style={buttonStyle}>Los Angeles, CA</button>
        <button type="submit" onClick={this.setRedirectBoston} style={buttonStyle}>Boston, MA</button>
        <button type="submit" onClick={this.setRedirectSeattle} style={buttonStyle}>Seattle, WA</button>
        <button type="submit" onClick={this.setRedirectMyLocation} style={myLocationStyle}>Use My Location</button>
      </div>
    );
  }
}

export default DefaultCity;

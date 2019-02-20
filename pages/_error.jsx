import React from 'react';

const errorStyle = {
  display: 'flex',
  justifyContent: 'center',
  flexFlow: 'column nowrap',
  margin: '250px 50px 100px 50px',
  textAlign: 'center',
  color: '#F293C1',
};

const linkStyle = {
  textDecoration: 'underline',
  color: '#F293C1',
  fontWeight: 'bold',
};

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : (err ? err.statusCode : null);
    return { statusCode };
  }

  render() {
    return (
      <>
        <div style={errorStyle}>
          <h2>
            {this.props.statusCode
              ? `An error ${this.props.statusCode} occurred on server, the page you're trying to find may not exist or is currently in work`
              : 'An error occurred on client, the page you\'re trying to find may not exist or is currently in work'}
          </h2>
          <p>
Please check your url or
            <a style={linkStyle} href="../">return to homepage</a>
          </p>
        </div>
      </>
    );
  }
}

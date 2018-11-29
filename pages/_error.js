import React from 'react'

const errorStyle = {
  display: 'flex',
  justifyContent: 'center',
  flexFlow: 'column nowrap',
  margin: "250px 50px 100px 50px",
  textAlign: 'center',
  color: '#F293C1',
};

const linkStyle = {
  textDecoration: 'none',
  color: '#F293C1',
  fontSize: '20px',
}

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode }
  }

  render() {
    return (
      <>
        <div style={errorStyle}>
          <h2>
            {this.props.statusCode
              ? `An error ${this.props.statusCode} occurred on server`
              : 'An error occurred on client'}
          </h2>
          <a style={linkStyle} href="../">Return to homepage</a>
        </div>
      </>
    )
  }
}
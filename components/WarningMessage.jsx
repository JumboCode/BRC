import React from 'react';

const warningTitle = {
  color: '#F293C1',
  fontSize: '40px',
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

const innerContainter = {
  flexDirection: 'column',
  alignItems: 'flex-start',
  marginTop: '15px',
  marginLeft: '15%',
  marginRight: '15%',
  fontFamily: 'sans-serif',
};

const warningMessageContent = {
  color: '#707070',
  fontSize: '15px',
  marginTop: '10px',
  borderTop: '5px solid #F293C1',
  paddingTop: '10px',
};

const contactLink = {
  fontSize: '16px',
  color: '#F293C1',
  fontWeight: 'bold',
  textDecoration: 'none',
};

const WarningMessage = ({ message }) => (
  <div style={innerContainter}>
    <div style={warningTitle}>Oh No!</div>
    <div style={warningMessageContent}>
      { message }
        <br/><br />
        If you belong to a group that you would like to have listed here, please
      {' '}
      <a href="mailto: brc@biresource.org" style={contactLink}>drop us an email</a>
      {' '}
      at brc@biresource.org with information about your group and the URL or email contact to use.
      <br />
      {' '}
      <br />
                Here is the list of all the resource centers we currently have:
    </div>
  </div>
);


export default WarningMessage;

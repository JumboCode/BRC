/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import Link from 'next/link';

const warningTitle = {
  color: '#F293C1',
  fontSize: '40px',
  fontWeight: 'bold',
};

const title = {
  fontWeight: 'bold',
  textAlign: 'center',
  fontSize: 40,
  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
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
  cursor: 'pointer',
};

const WarningMessage = ({ message, suggestion, centerSuggestion }) => (
  <div style={innerContainter}>
    <div style={warningTitle}>Oh No!</div>
    <div style={warningMessageContent}>
      { message }
      <br />
      <br />
      If you belong to a group that you would like to have listed here, please
      {' '}
      <Link href={{ pathname: '/suggestion' }}><span style={contactLink}>drop us the details</span></Link>
      {' '}
      or
      {' '}
      <a href="mailto: brc@biresource.org" style={contactLink}>send us an email</a>
      {' '}
      at brc@biresource.org with information about your group and the URL or email contact to use.
      <br />
      { suggestion
        ? (
          <div>
            <p>
              The group closest to you in our database is the following:
            </p>
            <p>
              <span
                style={contactLink}
                onClick={() => centerSuggestion(suggestion.position, suggestion.group)}
                onKeyDown={centerSuggestion}
              >
                {suggestion.group}
              </span>
              &nbsp;&nbsp;&nbsp;
              {suggestion.dist}
              {' '}
              miles away from you.
            </p>
          </div>
        )
        : 'Here is the list of all the resource centers we currently have:'
      }
    </div>
  </div>
);


export default WarningMessage;

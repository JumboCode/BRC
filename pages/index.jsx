import React from 'react';
import { SearchBar, BurgerMenu, SocialMedia, Footer } from '../components';

const bodyStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '87vh',
};

const logo = {
  justifyContent: 'center',
  display: 'flex',
  paddingBottom: '50px',
};

const linkStyle = {
  textAlign: 'center',
  fontSize: '15px',
  fontFamily: 'sans-serif',
  padding: '10px',
};

const searchStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const Index = () => (
  <>
    <BurgerMenu />
    <div style={bodyStyle}>
      <div style={logo}>
        <img alt="BRC logo" src="./static/images/bispot.png" width="280" height="100" />
      </div>
      <SearchBar styles={searchStyle} />
    </div>
    <SocialMedia />
    <Footer />
  </>
);

export default Index;

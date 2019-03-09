import React from 'react';
import { SearchBar, BurgerMenu, SocialMedia, Footer, DefaultCity } from '../components';

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

const ButtonSyle = {
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '10px',
};

const Index = () => (
  <>
    <BurgerMenu />
    <div style={bodyStyle}>
      <div style={logo}>
        <img alt="BRC logo" src="./static/images/BRC-logo.jpg" width="300" height="110" />
      </div>
      <SearchBar styles={searchStyle} />
      <DefaultCity styles={ButtonSyle} />
    </div>
    <SocialMedia />
    <Footer />
  </>
);

export default Index;

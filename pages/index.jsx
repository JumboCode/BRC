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

const searchStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const linkStyle = {
  textDecoration: 'none',
  fontFamily: 'sans-serif',
  fontSize: '15px',
  color: 'grey',
  cursor: 'pointer',
};

const Index = () => (
  <>
    <BurgerMenu />
    <div style={bodyStyle}>
      <div style={logo}>
        <img alt="BRC logo" src="./static/images/bispot.png" width="280" height="100" />
      </div>
      <SearchBar styles={searchStyle} />
      <DefaultCity styles={ButtonSyle} />
      <Link href={{ pathname: '/home', query: { search: '*', data: 'locations' } }}>
        <p style={linkStyle}>or click to view the full list of Bi groups</p>
      </Link>
    </div>
    <SocialMedia />
    <Footer />
  </>
);

export default Index;

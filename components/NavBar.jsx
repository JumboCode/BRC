
import Link from 'next/link';
import React from 'react';

const styles = {
  navBarContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  homeButton: {
    transform: `rotate(${30}deg)`,
    padding: '5px',
    cursor: 'pointer',
  },
};

const NavBar = () => (
  <div style={styles.navBarContainer}>
    <Link href="/">
      <img alt="Home" src="./static/images/bug.png" width="50" height="50" style={styles.homeButton} />
    </Link>
  </div>
);

export default NavBar;

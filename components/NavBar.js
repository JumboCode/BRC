import { slide as Menu } from 'react-burger-menu';

const styles = {
    navBarContainer: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "grey",
        padding: "20px",
    },
}

const burger = {
    bmBurgerButton: {
      justifyContent: 'flex-end',
      position: 'fixed',
      width: '36px',
      height: '30px',
      right: '30px',
      top: '5px'
    },

    bmBurgerBars: {
      background: '#373a47'
    },
    bmCrossButton: {
      height: '24px',
      width: '24px'
    },
    bmCross: {
      background: '#bdc3c7'
    },
    bmMenu: {
      background: 'white',
      padding: '2.5em 1.5em 0',
      fontSize: '1.15em',
    },
    bmMorphShape: {
      fill: '#373a47'
    },
    bmItemList: {
      color: '#b8b7ad',
      padding: '0.8em'
    },
    bmItem: {
      color: "grey",
      textDecoration: "none",
      display: 'inline-block',
      paddingTop: '0.8em'
    },
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0.3)'
    }
  }

const NavBar = () => (
    <>
        <Menu right width={ 280 } styles={ burger }>
            <a id="resources" className="menu-item" href="/">List of resources</a>
            <a id="events" className="menu-item" href="/">BRC Events</a>
            <a id="web" className="menu-item" href="/">Visit BRC Web</a>
            <a id="subscription" className="menu-item" href="/">Subscription</a>
        </Menu>
    
        <div style={styles.navBarContainer} /> 
        <div style={{ marginBottom: "40px" }} />
    </>
);

export default NavBar;

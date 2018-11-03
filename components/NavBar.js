import { slide as Menu } from 'react-burger-menu';
import Link from "next/link";

const styles = {
    navBarContainer: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "grey",
        padding: "20px",
        zIndex: "99",
    },
    link: {
      textDecoration: "none",
      color: "grey"
    }
}

const burger = {
    bmBurgerButton: {
      justifyContent: 'flex-end',
      position: 'fixed',
      width: '25px',
      height: '20px',
      right: '10px',
      top: '10px'
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
            <div id="resources" className="menu-item">
              <Link href={{pathname: "/home", query: { search: "", data: "locations" }}}><a style={styles.link}>List of resources</a></Link>
            </div>
            <div id="events" className="menu-item">
              <Link href={{pathname: "/home", query: { search: "", data: "events" }}}><a style={styles.link}>BRC Events</a></Link>
            </div>
            <a id="web" className="menu-item" target="_blank" href="http://biresource.org/">Visit BRC Web</a>
            <a id="subscription" className="menu-item" target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLScZDTmbGh8_f-FgbwbFJfje7Ktyp_r19d1UwS3yHJMBVn42FQ/viewform">Subscription</a>
        </Menu>
    
        <div style={styles.navBarContainer} /> 
        <div style={{ marginBottom: "40px" }} />
    </>
);

export default NavBar;

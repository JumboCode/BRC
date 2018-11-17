import { slide as Menu } from 'react-burger-menu';
import Link from "next/link";
import BurgerMenu from "./BurgerMenu";

const styles = {
    navBarContainer: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "transparent",
        padding: "20px",
        zIndex: "99",
    },
}

const NavBar = () => (
    <>
        <BurgerMenu />
        <div style={styles.navBarContainer} /> 
        <div style={{ marginBottom: "40px" }} />
    </>
);

export default NavBar;

import { SearchBar, BurgerMenu } from "../components";
import Link from "next/link";

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
  homeButton: {
    transform: `rotate(${30}deg)`,
    padding: "5px",
    cursor: "pointer",
  }
}

const searchStyle = {
  display: "flex",
  position: "fixed",
  // top: 20,
  left: 90,
  flexDirection: "row",
}

const NavBar = () => (
  <>
    <Link href="/">
      <img alt="Home" src="./static/images/favicon.ico" width="50" height="50" style={styles.homeButton} />
    </Link>
    {/* <SearchBar style={searchStyle} /> */}
    <BurgerMenu />
    <div style={styles.navBarContainer} />
    <div style={{ marginBottom: "40px" }} />
  </>
);

export default NavBar;

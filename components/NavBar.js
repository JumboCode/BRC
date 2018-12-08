import { SearchBar, BurgerMenu } from "../components";
import Link from "next/link";

const styles = {
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
    <a href="/">
      <img alt="Home" src="./static/images/favicon.ico" width="50" height="50" style={styles.homeButton} />
    </a>
    {/* <SearchBar style={searchStyle} /> */}
    <BurgerMenu />
    <div style={{ marginBottom: "40px" }} />
  </>
);

export default NavBar;

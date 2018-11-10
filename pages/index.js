import { SearchBar, BurgerMenu } from "../components";
import Head from "next/head";
import Link from "next/link";

const titleStyle = {
  textAlign: 'center',
  fontSize: '40px',
  fontFamily: 'sans-serif',
  padding: '150px',
  paddingBottom: '15px'
};

const logo = {
	justifyContent: "center",
	display: "flex",
	paddingBottom: "50px",
	paddingTop: "50px"
};

const linkStyle = {
  textAlign: 'center',
  fontSize: '15px',
  fontFamily: 'sans-serif',
  padding: '10px'
};

const Index = () => (
  <>
    <BurgerMenu />
    <div style={titleStyle}>BiSpot: Find a Bi Group Around Me</div>
    <div style={logo}>
    	<img alt="BRC logo" src="./static/images/BRC-logo.jpg" width="300" height="110"/>
    </div>
    <SearchBar />
    <div style={linkStyle}>
    	<Link href="/home">
    		<a textDecoration="none">or click to view BRC events (current month)</a>
    	</Link>
    </div>
  </>
);

export default Index;
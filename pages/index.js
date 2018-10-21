import { SearchBar, NavBar, SocialMedia } from "../components";
import Head from "next/head";
import Link from "next/link";

import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig()

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

let GoogleMapUrl = "https://maps.googleapis.com/maps/api/js?key=" + publicRuntimeConfig.MAP_KEY + "&libraries=places";

const Index = () => (
  <>
    <Head>
      <title>BiSpot: Find a Bi Group Around Me</title>
      <script type="text/javascript" src={GoogleMapUrl}></script>
    </Head>
    <NavBar />
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
    <SocialMedia />
  </>
);

export default Index;
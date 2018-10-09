import { SearchBar, NavBar } from "../components";
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
	paddingBottom: "10px",
	paddingTop: "10px"
};

const linkStyle = {
  textAlign: 'center',
  fontSize: '15px',
  fontFamily: 'sans-serif',
  padding: '10px'
};

const Index = () => (
  <>
    <Head>
      <title>BiSpot: Find a Bi Group Around Me</title>
      <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDgWHnpI85MKsUaiBM8ARltw_POLBiZvZA&libraries=places"></script>
    </Head>
    <NavBar />
    <div style={titleStyle}>BiSpot: Find a Bi Group Around Me</div>
    <div style={logo}>
    	<img alt="BRC logo" src="./static/images/BRC-logo.jpg" width="400" height="200"/>
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

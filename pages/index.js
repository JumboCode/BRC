import { SearchBar, NavBar } from "../components";
import Head from "next/head";

const titleStyle = {
  textAlign: 'center',
  fontSize: '40px',
  fontFamily: 'sans-serif',
  padding: '150px'
};

const Index = () => (
  <>
    <Head>
      <title>BiSpot: Find a Bi Group Around Me</title>
      <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDgWHnpI85MKsUaiBM8ARltw_POLBiZvZA&libraries=places"></script>
    </Head>
    <NavBar />
    <div style={titleStyle}>BiSpot: Find a Bi Group Around Me</div>
    <SearchBar />
  </>
);

export default Index;

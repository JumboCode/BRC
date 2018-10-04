import { SearchBar } from "../components";
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
    <div style={titleStyle}>Love is love</div>
    <SearchBar />
  </>
);

export default Index;

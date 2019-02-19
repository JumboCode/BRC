import { SearchBar, BurgerMenu, SocialMedia, DefaultCity} from "../components";
import Link from "next/link";

const bodyStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "87vh",
}

const logo = {
  justifyContent: "center",
  display: "flex",
  paddingBottom: "50px",
};

const linkStyle = {
  textAlign: 'center',
  fontSize: '15px',
  fontFamily: 'sans-serif',
  padding: '10px'
};

const searchStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}


const Index = () => (
  <>
    <BurgerMenu />
    <div style={bodyStyle}>
      <div style={logo}>
        <img alt="BRC logo" src="./static/images/BRC-logo.jpg" width="300" height="110" />
      </div>
      <SearchBar styles={searchStyle} />
      <div style={linkStyle}>
        <Link href="/events">
          <a textDecoration="none">or click to view BRC events (current month)</a>
        </Link>
      </div>
      <DefaultCity style={bodyStyle}/>
    </div>
    <SocialMedia />
  </>
);

export default Index;
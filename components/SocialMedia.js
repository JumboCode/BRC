import React from "react";
var createReactClass = require('create-react-class');

const icons = {
    textAlign: "center",
    paddingTop: "50px"
}

const indiv = {
    paddingRight: "20px"
}

class Email extends React.Component {
    state = { showing: true };

    render() {
        const { showing } = this.state;
        return (
            <div>
                <img style={indiv} onClick={() => this.setState({ showing: !showing })} src="/static/images/email.png" alt="Email" width="20" height="20"/>
                { showing 
                    // ? <div>brc@biresource.org</div>
                    // : null
                    ? null
                    : <p>brc@biresource.org</p>
                }
            </div>  
        )
    }
}

const SocialMedia = () => (
    <>
        <div style={icons}>
            <a style={indiv} href="https://www.facebook.com/biresource" target="_blank">
                <img src="/static/images/facebook.svg" alt="Facebook Logo" 
                 width="20" height="20"/>
            </a>

            <a style={indiv} href="https://www.instagram.com/bisexualresourcecenter/" target="_blank">
                <img src="/static/images/instagram.png" alt="Instagram Logo"
                 width="20" height="20"/>
            </a>

            <a style={indiv} href="https://twitter.com/BRC_Central" target="_blank">
                <img src="/static/images/twitter.png" alt="Twitter Logo"
                 width="20" height="20"/>
            </a>

            <Email />

            <a style={indiv} href="https://biresource.org/" target="_blank">
                <img src="/static/images/brc.png" alt="BRC Logo"
                 width="20" height="20"/>
            </a>
        </div>
    </>
);

export default SocialMedia;
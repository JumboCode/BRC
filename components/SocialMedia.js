import React from "react";
var createReactClass = require('create-react-class');

const icons = {
    textAlign: "center",
    paddingTop: "50px"
}

const indiv = {
    paddingRight: "20px"
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

            <a style={indiv} href="https://biresource.org/" target="_blank">
                <img src="/static/images/brc.png" alt="BRC Logo"
                 width="20" height="20"/>
            </a>
        </div>
    </>
);

export default SocialMedia;
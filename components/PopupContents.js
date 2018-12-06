import React from "react";


const centerBox = {
	color: "#515151",
	backgroundColor: "white",
	padding: "10px 50px 20px 50px"
};

const images = {
	display: "flex",
	flexDirection: "row",
	alignItems: "flex-start",
	justifyContent: "space-around",
};

class PopupContents extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div style={centerBox}>
				<h1>{this.props.info.heading}</h1>
				<p>{this.props.info.address}</p>
				<p>	{this.props.info.description}</p>
				<a href="https://engineering.tufts.edu/ece/about/contact.htm">Visit our website</a>
				<br />
				<br />
				<a href="https://www.cs.tufts.edu/~nr/">View events</a>
				<br />
				<br />
				<div style={images}>
					<img src={this.props.info.img1} alt="Noah" width="200" height="250" />
					<img src={this.props.info.img2} alt="Norman" width="200" height="250" />
					<img src={this.props.info.img3} alt="Megan" width="200" height="250" />
				</div>
			</div>
		);
	}
}

export default PopupContents;
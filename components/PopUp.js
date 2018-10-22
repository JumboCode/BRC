import React from "react";

const foreGround = {
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "center"
}

const centerdBox = {
	color: "#515151",
	backgroundColor: "white",
	width: "500px",
	padding: "10px 50px 20px 50px",
	border: "1px solid",
	boxShadow: "1px 2px"
};

const images = { /* Original Sizes Pre James Flex: width="200" height="250" */
	display: "flex",
	flexDirection: "row",
	alignItems: "flex-start",
	justifyContent: "space-around",
};

const exitX = {
	position: "relative",
	left: "485px"
}

//prop is an object named info which holds keys and values. 
//Example:
	/*
	var info = { 
	
	heading: 'some heading',
	address: 'some address',
	description: 'some description',
	img1: 'path',
	img2: 'path',
	img2: 'path'			 	 
	};
	*/


class PopUp extends React.Component {
    constructor(props) {
    	super(props);
    	this.state = { };
	}
		
    closePopUp = () => {
        /* this doesn't do anyting. */
        return;
	};

	render() {
		return (
			<div style={ foreGround }>
				<div style={ centerdBox }>
					<button style={ exitX } onClick={ this.closePopUp }> {"X"} </button>
					<h1>{ this.props.info.heading }</h1>
					<p>{ this.props.info.address }</p>
					<p>	{ this.props.info.description }</p>
					<a href="https://engineering.tufts.edu/ece/about/contact.htm">Visit our website</a>
					<br/>
					<br/>
					<a href="https://www.cs.tufts.edu/~nr/">View events</a>
					<br/>
					<br/>
					<div style={images}>
						<img src={this.props.info.img1} alt="Noah" width="200" height="250"/>
						<img src={this.props.info.img2} alt="Norman" width="200" height="250"/>
						<img src={this.props.info.img3} alt="Megan" width="200" height="250"/>
					</div>
				</div>
			</div>
		);
	}
}

export default PopUp;
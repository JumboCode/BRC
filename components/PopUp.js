import React from "react";

const backGround = {
	backgroundColor: "#eaeaea"
};

const foreGround = {
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "center"
}

const centerdBox = {
	display: "inline",
	color: "#515151",
	backgroundColor: "white",
	width: "500px",
	/* margin: "25px 200px 25px 200px",  replaced with flexbox */
	padding: "50px",
	justifyContent: "center"
};

const images = {
	display: "flex",
	flexDirection: "row",
	alignItems: "flex-start",
	justifyContent: "space-around",
};

const exitX = {
	position: "relative",
	left: "485px"
}

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
			<div style={backGround}>
				<div style={foreGround}>
					<div style={centerdBox}>
						<button style={exitX} onClick={this.closePopUp}> {"X"} </button>
						<h1>Halligan Resouce Center</h1>
						<p>161 College Ave, Medford, MA 021555</p>
						<p>
						We are open 24/7! You can drop by any time with any questions. Some of our physicians stay until very late in the labs. 
						There are also a lot of people who have gone through a lot of stress, so they can be great resources as well!
						</p>
						<a href="https://engineering.tufts.edu/ece/about/contact.htm">Visit our website</a>
									<br/>
						<br/>
						<a href="https://www.cs.tufts.edu/~nr/">View events</a>
						<br/>
						<br/>
						<div style={images}>
							<img src="./static/images/mendelsohn.jpg" alt="Noah" width="120" height="150"/>
							<img src="./static/images/ramsey.jpg" alt="Norman" width="120" height="150"/>
							<img src="./static/images/monroe.png" alt="Megan" width="120" height="150"/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default PopUp;


/* "X" for the close button */


/*******************************************************************************
 * 																																						 *
 *		Original Image Sizes Pre James Modification: width="200" height="250"    *
 * 																																						 *
 ******************************************************************************/
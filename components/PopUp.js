import React from "react";

const backGround = {
	backgroundColor: '#eaeaea'
};

const centerdBox = {
	color: '#515151',
	backgroundColor: 'white',
	margin: '25px 200px 25px 200px',
	padding: '50px'
};

const images = {
	display: "flex",
	justifyContent: "space-around",
};

function findArrayElementByTitle(array, title) {
  return array.title;
}

//prop is an object of keys and values. See test data in PopUp.js
class PopUp extends React.Component{
	constructor(props) {
    super(props);
    this.state = ({
    
    });
  }
  render(){
  	return(
		<div style={backGround}>
			<div style={centerdBox}>
				<h1>
					{this.props.info.heading}
				</h1>

				<p>
					{this.props.info.address}
				</p>

				<p>
					{this.props.info.description}
				</p>

				<a href="https://engineering.tufts.edu/ece/about/contact.htm">Visit our website</a>
				<br/>
				<br/>
				<a href="https://www.cs.tufts.edu/~nr/">View events</a>
				<br/>
				<br/>
				<div style={images}>
					<img src="./static/images/mendelsohn.jpg" alt="Noah" width="200" height="250"/>
					<img src="./static/images/ramsey.jpg" alt="Norman" width="200" height="250"/>
					<img src="./static/images/monroe.png" alt="Megan" width="200" height="250"/>
				</div>
			</div>
		</div>
	);
  }
}

export default PopUp;

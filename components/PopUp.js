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
class PopUp extends React.Component{
	constructor(props) {
    super(props);
    this.state = ({});
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

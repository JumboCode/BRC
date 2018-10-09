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

class PopUp extends React.Component{
	constructor(props) {
    super(props);
    console.log("props: " + this.props.info);
    this.state = ({
    	
    });
    console.log("reached here");
  }
  render(){
  	return(
		<div style={backGround}>
			<div style={centerdBox}>
				//title
				<h1>Hello</h1>

				//address
				<p>
					<script type="text/javascript">
        			//document.write(address)
      				</script>
				</p>

				//description
				<p>
					<script type="text/javascript">
        			//document.write(description)
      				</script>
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

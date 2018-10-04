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
	textAlign: 'center',
	margin: '0px 50px 0px 50px'
};

const PopUp = () => (
	<div style={backGround}>
		<div style={centerdBox}>
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
				<img src="./static/images/mendelsohn.jpg" alt="Noah" width="200" height="250"/>
				<img src="./static/images/ramsey.jpg" alt="Norman" width="200" height="250"/>
				<img src="./static/images/monroe.png" alt="Megan" width="200" height="250"/>
			</div>
		</div>
	</div>
);

export default PopUp;

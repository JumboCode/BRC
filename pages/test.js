import { PopUp } from "../components";

//test data
var info = { 
	
	heading: 'some heading',
	address: 'some address',
	description: 'some description'
			 	 
	};


const Test= () => (
	
	<PopUp info={info} />
);

export default Test;

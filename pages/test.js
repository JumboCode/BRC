import { PopUp } from "../components";

//test data
var info = { heading: 'some heading', address: 'some address' };

const Home = () => (
	
	<PopUp info={info}/>
);

export default PopUp;

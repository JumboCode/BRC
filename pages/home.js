import TitleBar from "../components/TitleBar";
import MapContainer from "../components/MapContainer";
import { Component } from "react";
import fetch from 'isomorphic-fetch'

/*
 * locations data is in the form:
    [
        {
            "_id": { "$oid": "(some random string)" },
            "name": "location 1 name"
        },
        {
            "_id": { "$oid": "(some random string)" },
            "name": "location 2 name"
        },
        etc...
    ]
*/

class Home extends Component  {
    // get list of locations as prop
    static async getInitialProps({ req }) {
        //hard coded url for now... need to change later
        const res = await fetch('http://localhost:3000/locations')
        const locations = await res.json()
        return { locations }
    }

    constructor (props) {
        super(props);
        this.state = {};
    }

    render () {
            return (
            <div className = "Home">
                <TitleBar />
                < MapContainer />
                <ul>
                        {this.props.locations.map(location =>
                            <li key={location["_id"]}>locations n</li>
                        )}
                </ul>
            </div>
        );
    }
}


export default Home;

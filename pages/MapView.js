/* MapView component
 * currently displays list of locations
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

import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'

class MapView extends Component {

    // get list of locations as prop
    static async getInitialProps({ req }) {
        //hard coded url for now... need to change later
        const res = await fetch('http://localhost:3000/locations.json')
        const locations = await res.json()
        return { locations }
    }

    //render as unordered list
    render() {
        return (
            <ul>
                {this.props.locations.map(location =>
                    <li key={location.name}>{location.name}</li>
                )}
            </ul>
        )
    }
}

export default MapView

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

class MapView extends Component {

    //initialize props
    constructor(props) {
        super(props)

        this.state = {
            locations: [],
        }
    }

    //fetch list of locations with GET request
    componentDidMount() {
        fetch('/locations.json')
            .then(response => response.json())
            .then(data => this.setState({ locations: data }))
    }

    //render as unordered list
    render() {
        const { locations } = this.state
        return (
            <ul>
                {locations.map(location =>
                    <li key={location.name}>{location.name}</li>
                )}
            </ul>
        )
    }
}

export default MapView

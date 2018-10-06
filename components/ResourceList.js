import React from "react";

// An individual accordian thing
class AccordianTitle extends React.Component {
    // Contain the state row, and its resources are children

}

// A resource within some accordian
class AccordianContents extends React.Component {

}

// pass the styles in using some prop type thing
// Contains multiple resource components
// Takes a list of objects, with a state string and
// a list of resources
// [{"State": [Resource1, Resource2, Resource3]}]
class Accordian extends React.Component{
    constructor() {
        super(props);
        // set initial state
        this.state = {
            open:false
        };
        // no methods to bind        
    }

    renderChildren(){
        //return React.Children.map(this.props.children, 
    }


    // have a list of states and a list of resources
    render() {
        return (
        <div classNAme = "accordian">
        {}
        </div>
        )
    }

}


export default TitleBar;
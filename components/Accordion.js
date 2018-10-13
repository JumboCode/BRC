import React from "react";

// pass the styles in using some prop type thing
// Contains multiple resource components
// Takes a list of objects, with a state string and
// a list of resources
// [{"State": [Resource1, Resource2, Resource3]}]

const divStyle = {
    //borderRadius: '5px',
    //border: '1px solid #d9d9d9'
}



class Accordion extends React.Component{
    constructor(props) {
        super(props);
        // set initial state
        this.state = {
            open: false
        };
        // no methods to bind        
    }

    renderChildren(){
        return React.Children.map(this.props.children, child => {
            return React.cloneElement(child);
        });
    }


    // have a list of states and a list of resources
    render() {
        return (
        <div className = "accordian" style = {divStyle}>
            {this.renderChildren()}
        </div>
        )
    }

}


export default Accordion;
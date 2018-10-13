import React from "react";

// Contains multiple resource components
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
        <div className = "accordian">
            {this.renderChildren()}
        </div>
        )
    }

}


export default Accordion;
import React from "react";

// Intended to hold AccordionSections
class Accordion extends React.Component{
    constructor(props) {
        super(props);
        // set initial state
        this.state = {
            open: false
        };
    }

    renderChildren(){
        return React.Children.map(this.props.children, child => {
            return React.cloneElement(child);
        });
    }

    render() {
        return (
        <div className = "accordian">
            {this.renderChildren()}
        </div>
        )
    }

}


export default Accordion;
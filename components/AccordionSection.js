import React from "react";

// An individual accordian thing
class AccordionSection extends React.Component {
    // Contain the state row, and its resources are 
    constructor(props){
        super(props);
        this.state = {
            title: "Title"
        }
    }

    render(){
        return(
        <div className = "title">
            <h1> {this.props.title}</h1>
            {this.props.children}
        </div>
        )}
}



export default AccordionSection;
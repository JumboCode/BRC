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
            {this.props.children};
        </div>
        )}
}

// A resource within some accordian
class AccordionContents extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            url :"url",
            linkName : "link",
            summary : "link info",
        }
    }

    render(){
        return(
            <div>
                <a href={this.props.url}>{this.props.linkName}</a>
                <p>{this.props.summary}</p>
                <div>{this.props.children}</div>
            </div>
        )
    }
}

// pass the styles in using some prop type thing
// Contains multiple resource components
// Takes a list of objects, with a state string and
// a list of resources
// [{"State": [Resource1, Resource2, Resource3]}]
class Accordion extends React.Component{
    constructor(props) {
        super(props);
        // set initial state
        this.state = {
            open:false
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
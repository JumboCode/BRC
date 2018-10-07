import React from "react";

const divStyle = {
    borderRradius: '5px',
    border: '1px solid #d9d9d9'
}

// An individual accordian thing
class AccordionSection extends React.Component {
    // Contain the state row, and its resources are 
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
    }

    static propTypes = {
        title: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired
    }

    static defaultProps = {
        title: 'TITLE'
      };

      
    closeOpen = () => {
        this.setState({ open: !this.state.open})
    }
    

    render(){
        return(
        <div className = "title" onClick={this.closeOpen} style = {divStyle}>
            <h1> {this.props.title}</h1>
            {this.state.open && this.props.children}
        </div>
        )}
}



export default AccordionSection;
import React from "react";

const divStyle = {
    //borderRadius: '5px',
    border: '1px solid #d9d9d9',
    backgroundColor: '#CCCCCC',
    color: '#757575',
    marginBottom: '5px',
    paddingLeft: '7px'
}

const backgroundStyle = {
    backgroundColor: '#F0F0F0',
    color: '#757575',
}

const contentStyle = {
    //minHeight: '200px'
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
        <div style = {backgroundStyle}>
            <div className = "title" onClick={this.closeOpen} style = {divStyle}>
                <h1> {this.props.title}</h1>
            </div>
            <div style = {contentStyle}> 
                {this.state.open && this.props.children}
            </div>
        </div>
        )}
}



export default AccordionSection;
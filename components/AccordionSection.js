import React from "react";

const titleStyle = {
    border: '1px solid #CCCCCC',
    backgroundColor: '#CCCCCC',
    color: '#757575',
    marginBottom: '1px',
    paddingLeft: '7px'
}

const sectionStyle = {
    backgroundColor: '#F0F0F0',
    color: '#757575',
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
        <div style = {sectionStyle}>
            <div className = "title" onClick={this.closeOpen} style = {titleStyle}>
                <h1> {this.props.title}</h1>
            </div>
            <div> 
                {this.state.open && this.props.children}
            </div>
        </div>
        )}
}



export default AccordionSection;
import React from "react";

const titleStyle = {
    border: '1px solid #CCCCCC',
    backgroundColor: '#CCCCCC',
    color: '#757575',
    marginBottom: '5px',
    paddingLeft: '7px'
}

const sectionStyle = {
    backgroundColor: '#F0F0F0',
    color: '#757575',
}

const arrowHead = {
   // display: 'block',
    width: '5%',
    float: 'right',
    height: '100%'
}

const titleText = {
   // display: 'block',
    float: 'foat',
    width: '95%',
    height: '100%'
    //float: 'right'
    // Can't float or the text won't be there, 
    // might be time to use flexbox
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
                <div style = {titleText}> <h1> {this.props.title}</h1> </div>
                <div style= {arrowHead}>
                    <img alt="Arrow head" src="./static/images/listArrow.png" width="12" height="12"/>
                </div> 
            </div>
            <div> 
                {this.state.open && this.props.children}
            </div>
        </div>
        )}
}



export default AccordionSection;
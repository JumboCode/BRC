import React from "react";

const openTitle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#CCCCCC',
    color: '#757575',
    marginBottom: '5.5px',
    padding: '0 15px 0 10px',
}
const closedTitle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    color: '#757575',
    marginBottom: '5.5px',
    padding: '0 15px 0 10px',
}

const sectionStyle = {
    backgroundColor: '#FFFFFF',
    color: '#757575',
}

const closedArrow = {
    marginLeft: 'auto',
    padding: '0',
}

const openArrow = {
    backgroundColor: 'white',
    borderRadius: '50%',
    marginLeft: 'auto',
    //padding: '0',
    paddingLeft: '4px',
    paddingRight: '4px',
    transform: 'rotate(270deg)'
}

// An individual section of the list, 
// its contents are collapsible
class AccordionSection extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
    }

    static propTypes = {
        title: PropTypes.string.isRequired
    }

    static defaultProps = {
        title: 'TITLE'
    };

      
    closeOpen = () => {
        this.setState({ open: !this.state.open})
    };
    

    render(){
        const isOpen = this.state.open;
        return(
        <div style = {sectionStyle}>
            <div className = "title" onClick={this.closeOpen} style={isOpen ? openTitle: closedTitle}>
                <div> <h3> {this.props.title}</h3> </div>
                <div style= {isOpen ? openArrow : closedArrow}>
                    <img alt="Arrow head" src="./static/images/listArrow.png" width="10" height="10"/>
                </div> 
            </div>
            <div> 
                {this.state.open && this.props.children}
            </div>
        </div>
        )}
}

export default AccordionSection;
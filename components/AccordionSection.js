import React from "react";

const titleStyle = {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #F5F5F5',
    backgroundColor: '#F5F5F5',
    color: '#757575',
    marginBottom: '5.5px',
    paddingLeft: '10px',
}

const sectionStyle = {
    backgroundColor: '#FFFFFF',
    color: '#757575',
}

const arrowHead = {
    marginLeft: 'auto',
    padding: '0',
    paddingRight: "7px",
}

const arrowHead2 = {
    marginLeft: 'auto',
    padding: '0',
    paddingRight: "7px",
    transform: 'rotate(270deg)'
}

const openTitle = {
    backgroundColor: 'CCCCCC'
}

const closedTitle = {
    backgroundColor: 'F0F0F0'
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
            <div className = "title" onClick={this.closeOpen} style = {titleStyle}>
                <div style= {isOpen ? openTitle : closedTitle}> <h3> {this.props.title}</h3> </div>
                <div style= {isOpen ? arrowHead2 : arrowHead}>
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
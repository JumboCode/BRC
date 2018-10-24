import React from "react";

const titleStyle = {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #CCCCCC',
    backgroundColor: '#CCCCCC',
    color: '#757575',
    marginBottom: '5px',
    paddingLeft: '7px',
}

const sectionStyle = {
    backgroundColor: '#F0F0F0',
    color: '#757575',
}

const arrowHead = {
    marginLeft: 'auto',
    padding: '0'
}

const arrowHead2 = {
    marginLeft: 'auto',
    padding: '0',
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
            <div className = "title" onClick={this.closeOpen} style = {titleStyle}>
                <div> <h1> {this.props.title}</h1> </div>
                <div style= {isOpen ? arrowHead2 : arrowHead}>
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
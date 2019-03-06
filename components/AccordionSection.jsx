import React from 'react';

const titleStyle = {
  display: 'flex',
  alignItems: 'center',
  border: '1px solid #CCCCCC',
  backgroundColor: '#CCCCCC',
  color: '#757575',
  marginBottom: '5.5px',
  marginTop: '5.5px', // 5.5
  paddingLeft: '10px',
  padding: '0 15px 0 10px',
};
const closedTitle = {
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#F0F0F0',
  color: '#757575',
  marginBottom: '5.5px',
  padding: '0 15px 0 10px',
};

const sectionStyle = {
  backgroundColor: '#FFFFFF', // #F0F0F0
  color: '#757575',
};

const closedArrow = {
  marginLeft: 'auto',
  padding: '0',
};

const openArrow = {
  backgroundColor: 'white',
  borderRadius: '50%',
  marginLeft: 'auto',
  // padding: '0',
  paddingLeft: '4px',
  paddingRight: '4px',
  transform: 'rotate(270deg)',
};

const stateStyle = {
  cursor: 'pointer',
};

// An individual section of the list,
// its contents are collapsible
class AccordionSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      startedOpen: false, // set to true if gets opened bc matching region
      state: null,
    };
  }

    static propTypes = {
      title: PropTypes.string.isRequired,
    }

    static defaultProps = {
      title: 'TITLE',
    };


    closeOpen = () => {
      this.setState({ open: !this.state.open });
    };

    onClick = (e) => {
      e.stopPropagation();
      this.props.centerState({ lat: null, lng: null, region: this.props.title });
    }

    render() {
      // open once only if region matches initial region on map
      if (this.props.startOpen && !this.state.startedOpen) {
        this.setState({ open: true });
        this.setState({ startedOpen: true });
      }
      const isOpen = this.state.open;
      return (
        <div style={sectionStyle}>
          <div className="title" onClick={this.closeOpen} style={titleStyle}>
            <div>
              {' '}
              <h3 onClick={this.onClick} style={stateStyle}>
                {' '}
                {this.props.title}
                {' '}
              </h3>
              {' '}
            </div>
            <div style={isOpen ? openArrow : closedArrow}>
              <img alt="Arrow head" src="./static/images/listArrow.png" width="10" height="10" />
            </div>
          </div>
          <div>
            {this.state.open && this.props.children}
          </div>
        </div>
      );
    }
}

export default AccordionSection;
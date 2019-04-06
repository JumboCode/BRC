import React from 'react';

const titleStyle = {
  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
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
  fontStyle: '-apple-system, BlinkMacSystemFont, sans-serif',
  cursor: 'pointer',
};

// An individual section of the list,
// its contents are collapsible
class AccordionSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.startOpen,
    };
  }

    static propTypes = {
      title: PropTypes.string.isRequired,
    }

    static defaultProps = {
      title: 'TITLE',
    };

    componentWillReceiveProps(nextProps) {
      if (nextProps.startOpen !== this.props.startOpen) {
        this.setState({ open: nextProps.startOpen });
      }
    }

    closeOpen = () => {
      const isOpen = this.state.open;
      this.setState({ open: !isOpen });
    };

    onClick = (e) => {
      e.stopPropagation();
      this.props.centerState({ lat: null, lng: null, region: this.props.title });
    }

    render() {
      return (
        <div style={sectionStyle}>
          <div className="title" onKeyDown={this.closeOpen} onClick={this.closeOpen} style={titleStyle}>
            <div>
              {' '}
              <h3 onClick={this.onClick} onKeyDown={this.onClick} style={stateStyle}>
                {' '}
                {this.props.title}
                {' '}
              </h3>
              {' '}
            </div>
            <div style={this.state.open ? openArrow : closedArrow}>
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

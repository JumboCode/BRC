import React from 'react';

const divStyle = {
  paddingTop: '0.3px',
  backgroundColor: '#FFFFFF',
  paddingLeft: '7px',
  paddingBottom: '0.3px',
  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
};

const selectDivStyle = {
  paddingTop: '0.3px',
  backgroundColor: '#F293C1',
  boxSizing: 'border-box',
  paddingLeft: '7px',
  paddingBottom: '0.3px',
  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
};

const linkStyle = {
  color: '#F293C1',
  fontweight: 'bold',
  fontSize: '14px',
  cursor: 'pointer',
  paddingLeft: '7px',
  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
};

const selectLinkStyle = {
  color: '#FFFFFF',
  fontweight: 'bold',
  fontSize: '14px',
  cursor: 'pointer',
  paddingLeft: '7px',
  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
};

// An individual resource along with associated data such as website,etc
// Accept some object info
// Accept some string name
class Resource extends React.Component {
    static propTypes = {
      name: React.PropTypes.string.isRequired,
      info: React.PropTypes.object.isRequired,
      // region: React.PropTypes.string.isRequired,
      isSelected: React.PropTypes.bool.isRequired,
      url: React.PropTypes.string.isRequired,
      summary: React.PropTypes.string.isRequired,
    }

    static defaultProps = {
      info: {
        Email: 'mail', Website: 'web', Location: 'loc', Meetup: '', Region: 'Unknown', lat: -1, lng: -1,
      },
      url: 'url',
      name: 'centerName',
      summary: '',
      // region: 'United States of America',
      isSelected: false,
    };

    constructor(props) {
      super(props);
      this.onClick = this.onClick.bind(this);
    }

    onClick() {
      this.props.onResourceClick({ lat: this.props.info.lat, lng: this.props.info.lng }, this.props.name);
    }

    render() {
      let blockDivStyle = divStyle;
      let blockLinkStyle = linkStyle;
      if (this.props.isSelected) {
        blockDivStyle = selectDivStyle;
        blockLinkStyle = selectLinkStyle;
      }
      return (
        <div onClick={this.onClick} style={blockDivStyle} onKeyDown={this.onClick}>
          <p style={blockLinkStyle}>{this.props.name}</p>
        </div>
      );
    }
}

export default Resource;

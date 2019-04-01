import React from 'react';


const centerBox = {
  color: '#515151',
  backgroundColor: 'white',
  padding: '10px 50px 20px 50px',
};

const images = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'space-around',
};

class PopupContents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={centerBox}>
        <h1>{this.props.info.heading}</h1>
        <p>{this.props.info.address}</p>
        <p>
          {' '}
          {this.props.info.description}
        </p>
        <a href="https://engineering.tufts.edu/ece/about/contact.htm">Visit our website</a>
        <br />
        <br />
        <a href="https://www.cs.tufts.edu/~nr/">View events</a>
      </div>
    );
  }
}

export default PopupContents;

import React from 'react';

// Intended to hold AccordionSections
class Accordion extends React.Component {
  renderChildren() {
    return React.Children.map(this.props.children, child => React.cloneElement(child));
  }

  render() {
    return (
      <div className="accordion">
        {this.renderChildren()}
      </div>
    );
  }
}


export default Accordion;

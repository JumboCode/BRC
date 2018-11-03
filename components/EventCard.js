import React from "react";
const style = {
  "event": {
    "display": "inline-block",
    "margin": "12px",
    "border": "1px solid #eee",
    "boxShadow": "0 2px 2px #ccc",
    "width": "200px",
    "padding": "20px"
  },
}
//props is an object with keys and values:
/*var info{
      Event1: someValue,
      host: someValue,
      location: someValue,
      description: someValue


}*/
class EventCard extends React.Component {
    constructor(props) {
      super(props);
      this.state = { };
  }
    
    closeEventCard = () => {
        /* this doesn't do anyting. */
        return;
  };

  render() {
    return (
      <>
        <div style={style.event}>
          <p style={{fontSize: "18px", fontWeight: "bold"}}>{this.props.event}</p>
          <p>{this.props.host}</p>
          <p>{this.props.location}</p>
          <p>{this.props.description}</p>
        </div>
      </>
    );
  }
}

export default EventCard;

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
const EventCard = () => (
	<>
    <div style={style.event}>
	<h1>Event1</h1>
	<p>host</p>
	<p>location</p>
	<p>description</p>
</div>
</>
);

export default EventCard;

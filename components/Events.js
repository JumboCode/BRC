import React from "react";
import { EventCard } from ".";
import { Component } from "react";

const eventsStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: 'space-around',
    paddingRight: "10px",
    height: '70%',
    overflow: 'scroll',
  };

const fakeData = [
    {
        event: "Arith",
        host: "Norman Ramsey",
        location: "Halligan 116",
        description: "We will compress an image using NR's compressor and decompress the image using your decompressor!"
    },
    {
        event: "Sleep over",
        host: "0xmchow",
        location: "Ming's couches",
        description: "We will have a sleepover!"
    },
    {
        event: "Sleep over",
        host: "0xmchow",
        location: "Ming's couches",
        description: "We will have a sleepover!"
    },
    {
        event: "Sleep over",
        host: "0xmchow",
        location: "Ming's couches",
        description: "We will have a sleepover!"
    }
];

class Events extends React.Component {
    constructor(props) {
      super(props);
      this.state = { };
    }
    
    closeEventCard = () => {
        /* this doesn't do anyting. */
        return;
    };

    render() {
        var eventInstances = new Array();
        for (let i = 0; i < fakeData.length; i++) {
            eventInstances.push(
                <EventCard
                event = {fakeData[i].event}
                host = {fakeData[i].host}
                location = {fakeData[i].location}
                description = {fakeData[i].description}
                />
            );    
        }

        return(
            <div style={eventsStyle}>
                <h2>Events</h2>
                {eventInstances}
            </div>
        );
    }
}

export default Events;

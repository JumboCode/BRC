import React from "react";
import { EventCard } from ".";
import { Component } from "react";

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
        return (
        <>
            <EventCard
                event = "Arith"
                host = "aaa"
                location = "dd"
                description = "aa"
                />
        </>
        )}
}
const fakeData = [
    {
        event: "Arith",
        host: "NR",
        location: "Halligan 116",
        description: "We will compress an image using NR's compressor and decompress the image using your decompressor"
    },
    {
        event: "Let's Sleep!",
        host: "Ming Chow",
        location: "Halligan 102",
        description: "We will have a sleepover"
    }
];
export default Events;

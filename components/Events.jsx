import React from 'react';
import { Component } from 'react';
import { EventCard } from '.';

const eventsStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
};

const fakeData = [
  {
    event: 'Arith',
    host: 'Norman Ramsey',
    location: 'Halligan 116',
    description: "We will compress an image using NR's compressor and decompress the image using your decompressor!",
  },
  {
    event: 'Event 1',
    host: '0xmchow',
    location: "Ming's couches",
    description: 'We will have a sleepover!',
  },
  {
    event: 'Event 2',
    host: '0xmchow',
    location: "Ming's couches",
    description: 'We will have a sleepover!',
  },
  {
    event: 'Event 3',
    host: '0xmchow',
    location: "Ming's couches",
    description: 'We will have a sleepover!',
  },
  {
    event: 'Event 4',
    host: '0xmchow',
    location: "Ming's couches",
    description: 'We will have a sleepover!',
  },
  {
    event: 'Event 5',
    host: '0xmchow',
    location: "Ming's couches",
    description: 'We will have a sleepover!',
  },
];

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

    closeEventCard = () => {
      /* this doesn't do anyting. */

    };

    render() {
      const eventInstances = new Array();
      for (let i = 0; i < fakeData.length; i++) {
        eventInstances.push(
          <EventCard
            key={i}
            event={fakeData[i].event}
            host={fakeData[i].host}
            location={fakeData[i].location}
            description={fakeData[i].description}
          />,
        );
      }

      return (
        <>
          <div style={eventsStyle}>
            {eventInstances}
          </div>
        </>
      );
    }
}

export default Events;

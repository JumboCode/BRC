import React from 'react';
import Resource from './Resource';

// A collection of resources
// Accept an object "resources"
// { ResourceName: {Email: s@gmail.com, Website: bi.com, ...}, ResourceName2:{}, ... }
class Resources extends React.Component {
    static propTypes = {
      resources: React.PropTypes.object.isRequired,
      region: React.PropTypes.string.isRequired,
    }

    static defaultProps = {
      resources: {
        ResourceName: {
          Email: 'mail', Website: 'web', Location: 'loc', Meetup: '', lat: -1, lng: -1,
        },
      },
      region: 'United States of America', // Should normally be a state.
      onResourceClick: (data) => { console.log(`Resources has region: ${data}`); },
    };

    render() {
      const newResources = [];
      // Key should be the name of some center
      Object.keys(this.props.resources).map((resource) => {
        const resourceInfo = this.props.resources[resource];
        resourceInfo.Region = this.props.region;

        newResources.push(
          <Resource
            isSelected={resource === this.props.selected}
            name={resource}
            info={resourceInfo}
            onResourceClick={this.props.onResourceClick}
            isClosest={resource == this.props.nearbyResource}
          />,
        );
      });

      return (
        <div>
          {newResources}
        </div>
      );
    }
}

export default Resources;

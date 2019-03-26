import React from 'react';
import Resource from './Resource';

// A collection of resources
// Accept an object "resources"
// { ResourceName: {Email: s@gmail.com, Website: bi.com, ...}, ResourceName2:{}, ... }
class Resources extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

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
            name={resource}
            info={resourceInfo}
            onResourceClicked={this.props.onResourceClick}
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

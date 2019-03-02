import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import Link from 'next/link';
import Router from 'next/router';

const entryStyle = {
  display: 'flex',
  flexDirection: 'row',
};

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
  }

  handleChange = (address) => {
    this.setState({ address });
  };

  handleSelect = (address) => {
    this.setState({ address });
  };

  // Allows enter key triggering search
  onKeyPress = (event, suggestions) => {
    const suggestionsOpen = !!suggestions.length;
    if (!suggestionsOpen && event.keyCode === 13) { // if this is enter key, submit form
      Router.push({
        pathname: '/home',
        query: { search: this.state.address },
      });
    }
  }

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({
          getInputProps, suggestions, getSuggestionItemProps, loading,
        }) => (
          <div style={this.props.styles}>
            <div style={entryStyle}>
              <form>
                <input
                  {...getInputProps({
                    placeholder: 'Search Places ...',
                    className: 'location-search-input',
                    onKeyDown: e => this.onKeyPress(e, suggestions),
                  })}
                />
              </form>
              <form>
                <div>
                  <Link href={{ pathname: '/home', query: { search: this.state.address } }}>
                    <button type="submit">Search</button>
                  </Link>
                </div>
              </form>
            </div>
            <div
              className="autocomplete-dropdown-container"
              style={{
                backgroundColor: 'white',
                overflow: 'visible',
                zIndex: '99',
                boxShadow: '1px 1px 1px black',
              }}
            >
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                // This section to be edited
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <Link href={{ pathname: '/home', query: { search: this.state.address } }}>
                      <div style={{ margin: '10px', borderBottom: '1px dotted grey' }}>
                        {suggestion.description}
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default SearchBar;

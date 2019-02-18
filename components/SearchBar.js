import React from "react";
import PlacesAutocomplete from 'react-places-autocomplete';
import Link from 'next/link';
import Router from 'next/router';

const entryStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  width: "180%",
};

const inputStyle = {
  width: "100%",
  height: "30px",
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: "" };
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    this.setState({ address });
  };

  // Allows enter key triggering search
  onKeyPress = (event, suggestions) => {
    const suggestionsOpen = !!suggestions.length;
    if (!suggestionsOpen && event.keyCode === 13) { // if this is enter key, submit form
      Router.push({
        pathname: '/home',
        query: { search: this.state.address }
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
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div style={this.props.styles}>
            <div style={entryStyle}>
              <div style={inputStyle}>
                <input style={{width: "100%"}}
                  {...getInputProps({
                    placeholder: 'Try something like: street address or name of city...',
                    className: 'location-search-input',
                    onKeyDown: (e) => this.onKeyPress(e, suggestions),
                  })}
                />
              </div>
              <div>
                <Link href={{ pathname: '/home', query: { search: this.state.address } }}>
                  <button>Search</button>
                </Link>
              </div>
            </div>
            <div className="autocomplete-dropdown-container" style={{overflow: "visible"}}>
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
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
                    <span>{suggestion.description}</span>
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

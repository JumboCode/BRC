import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import Link from 'next/link';
import Router from 'next/router';

const styles = {
  entryStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  searchBoxStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: '30px',
    width: '60vw',
  },
  searchTextStyle: {
    fontSize: '14px',
    lineHeight: '35px',
    width: '90%',
    border: 'none',
    boxShadow: '1px 1px 1px grey',
    paddingLeft: '10px',
  },
  searchBtnStyle: {
    backgroundColor: '#F293C1',
    border: 'none',
    textDecoration: 'none',
    color: 'white',
    boxShadow: '1px 1px 1px grey',
  },
  dropDownStyle: {
    backgroundColor: 'white',
    overflow: 'visible',
    zIndex: '99',
    boxShadow: '1px 1px 1px grey',
    width: '60vw',
  },
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
            <div style={styles.searchBoxStyle}>
              <input
                style={styles.searchTextStyle}
                {...getInputProps({
                  placeholder: 'Try: street address, city name, etc...',
                  className: 'location-search-input',
                  onKeyDown: e => this.onKeyPress(e, suggestions),
                })}
              />
              <Link href={{ pathname: '/home', query: { search: this.state.address } }}>
                <button style={styles.searchBtnStyle} type="submit">Search</button>
              </Link>
            </div>
            <div style={styles.dropDownStyle} className="autocomplete-dropdown-container">
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
                    <Link href={{ pathname: '/home', query: { search: suggestion.description } }}>
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
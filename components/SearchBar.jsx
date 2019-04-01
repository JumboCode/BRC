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
    border: '1px solid #F1F1F1',
    boxShadow: '1px 1px 1px grey',
    paddingLeft: '10px',
  },
  searchBtnStyle: {
    backgroundColor: '#F293C1',
    border: '1px solid grey',
    textDecoration: 'none',
    color: 'white',
    boxShadow: '1px 1px 1px grey',
    WebkitBorderShadow: '1px 1px 1px grey',
  },
  dropDownStyle: {
    backgroundColor: 'white',
    overflow: 'visible',
    zIndex: '99',
    boxShadow: '1px 1px 1px grey',
    WebkitBorderShadow: '1px 1px 1px grey',
    width: '60vw',
  },
};

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: this.props.address ? this.props.address : '' };
  }

  handleChange = (address) => {
    this.setState({ address });
  };

  handleSelect = (address) => {
    this.setState({ address });
    this.forceUpdate();
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
    let pathname = '/home';
    if (this.state.address === '' && this.props.onLanding) {
      pathname = '/';
    }
    const query = this.state.address !== '' ? { search: this.state.address } : null;
    const placeholderText = this.props.address && this.state.address !== '' ? this.props.address : 'Try: street address, city name...';
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
                  placeholder: placeholderText,
                  className: 'location-search-input',
                  onKeyDown: e => this.onKeyPress(e, suggestions),
                })}
              />
              <Link href={{ pathname, query }}>
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

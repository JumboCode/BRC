import React from "react";
import PlacesAutocomplete from 'react-places-autocomplete';
import Link from 'next/link';
import Router from 'next/router';

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  locationSearchBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
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
  keyPress = e => {
    console.log(e.key);
    if(e.key == 13){
      // routing stuff here
      console.log("Phase 1");
      Router.replace({
        pathname: '/home',
        query: { search: this.state.address }
      })
    }
  }

  // handler = () => {
  //   Router.push({
  //     pathname: '/home',
  //     query: { search: this.state.address }
  //   })
  // }

  render () {
    return (
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div style={styles.locationSearchBox}>
              <div style={styles.container}>
              <form>
                  <input tabIndex="0"
                    {...getInputProps({
                      placeholder: 'Search Places ...',
                      className: 'location-search-input',
                    })}
                  />
                </form>
                <form>
                  <div>
                    <Link href={{ pathname: '/home', query: { search: this.state.address } }}>
                      <button>Search</button>
                    </Link>
                  </div>
                </form>
              </div>
              <div className="autocomplete-dropdown-container">
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

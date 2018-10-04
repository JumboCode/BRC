import React from "react";

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "type here" };
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    console.log(this.state);
  };

  render () {
    return (
        <div style={styles.container}>
          <form>
            <input type="text" value={this.state.value} onChange={(e) => this.handleChange(e)}/>
            <input type="submit" value="search" onChange={() => {return;} } />
          </form>
        </div>
    );
  }
}

export default SearchBar;

import React from "react";

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
}

const SearchBar = () => (
    <div style={styles.container}>
      <form>
        <input type="text" value="type here" onChange={() => console.log("input change")}/>
        <input type="submit" value="search" onChange={() => console.log("submit address")}/>
      </form>
    </div>
);

export default SearchBar;

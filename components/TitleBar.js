const mainContainer = {
  display: 'flex',
  flexFlow: 'row wrap',
  margin: 10
};

const leftColumn = {
  display: 'flex',
  flexFlow: 'column wrap',
  margin: 10
};

const title = {
  fontWeight: 'bold',
  fontSize: 50,
  fontFamily: 'BlinkMacSystemFont',
  alignSelf: 'flex-start',
  flex: 1
};

const resources = {
  flex: 2
};

const TitleBar = () => (
  <div style = {mainContainer}>
    <div style = {leftColumn}>
      <div style = {title}>  Bi Spot: Find a group near you.</div>
      <div style = {resources}>body</div>
    </div>
    insert map here
  </div>
);

export default TitleBar;

/* Questions:
 Why export instead of using ReactDOM.render(element, etc)?
 Also why does export display the contents of index.js which is set
 up in the same way, but not for TitleBar.js?
 */

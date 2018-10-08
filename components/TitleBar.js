import { Column, Row } from 'simple-flexbox';

var titleStyle = {
  fontWeight: 'bold',
  fontSize: 50,
  fontFamily: 'BlinkMacSystemFont'
};

const TitleBar = () => (
  <Row horizontal = 'center' style = {{margin: 10}}>
    <Column flexGrow = {1}>
      <Row>
        <div style = {titleStyle}>Bi Spot: Find a group near you.</div>
      </Row>
      <Row>
        <span> table text </span>
      </Row>
    </Column>
    <Column flexGrow={1} horizontal='center'>
      insert map here
    </Column>
  </Row>
);

export default TitleBar;

/* Questions:
 Why export instead of using ReactDOM.render(element, etc)?
 Also why does export display the contents of index.js which is set
 up in the same way, but not for TitleBar.js?
 */

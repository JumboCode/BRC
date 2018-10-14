const info = {
  flex: 1,
  display: 'flex',
  flexFlow: 'column wrap'
};

const title = {
  fontWeight: 'bold',
  fontSize: 45,
  fontFamily: 'BlinkMacSystemFont'
};

const InfoBar = (props) => (
  <div style = {info}>
    <div style = {title}>  Bi Spot: Find a group near you.</div>
    <ul>
            {props.locationData.map(location =>
                <li key={location["_id"]}>locations n</li>
            )}
    </ul>
  </div>
);

export default InfoBar;

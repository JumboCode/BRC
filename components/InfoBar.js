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
            {
              Object.keys(props.locationData).map( (state, index) => {
                const centers = Object.keys(props.locationData[state]).map( (center, index) => <p key={index}>{center}</p>);
                return (
                  <>
                    <li key={index}>{state}</li>
                    { centers }
                  </>
                );
              })
            }
    </ul>
  </div>
);

export default InfoBar;

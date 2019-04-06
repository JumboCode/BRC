import React from 'react';

const headerStyle = {
fontFamily: 'sans-serif',
color: '#F293C1',
fontSize: '40px',
fontweight: 'bold',
alignment: 'left',
paddingLeft: '40px',
paddingBottom: '35px',
paddingTop: '20px'

};

const boxStyle = {
  borderStyle: "solid",
  borderColor: "#F293C1",
  borderWidth: "3px",
  borderRadius: "30px",
  width: '35%',
  height: '35px',
  margin: '2px',
  outline: 'none',
  paddingLeft: '20px',
  fontSize: '15px',
  fontWeight: 'lighter',
  paddingRight: '4px'
};

const cityStyle = {
  borderStyle: "solid",
  borderColor: "#F293C1",
  borderWidth: "3px",
  borderRadius: "30px",
  width: '17%',
  height: '35px',
  margin: '2px',
  outline: 'none',
  paddingLeft: '20px',
  fontSize: '15px',
  fontWeight: 'lighter',
  paddingRight: '4px'
};

const subStyle = {
  borderStyle: "solid",
  borderColor: "#F293C1",
  borderWidth: "3px",
  borderRadius: "30px",
  width: '7%',
  height: '35px',
  margin: '2px',
  outline: 'none',
  paddingLeft: '20px',
  fontSize: '15px',
  fontWeight: 'lighter',
  paddingRight: '4px',
  backgroundColor: '#FFFFFF'
};

const selectStyle = {
  borderStyle: "solid",
  borderColor: "#F293C1",
  borderWidth: "3px",
  borderRadius: "30px",
  width: '8%',
  height: '42px',
  margin: '2px',
  outline: 'none',
  paddingLeft: '20px',
  fontSize: '15px',
  fontWeight: 'lighter',
  paddingRight: '4px',
  backgroundColor: '#FFFFFF',
  boxShadow: '#FFFFFF',
  left: '0'
};

const categoryStyle = {
	fontFamily: 'sans-serif',
	color: '#707070',
	paddingLeft: '15px',
	paddingBottom: '3px',
	fontSize: '20px',
	fontWeight: 'lighter',
	width: '100%'
};

const formStyle = {
	paddingLeft: '35px'
};

const spaceStyle = {
	paddingBottom: '3px'
};

const buttonPadding = {
	paddingLeft: '320px'
};

const buttonStyle = {
	backgroundColor: '#F293C1',
 	borderRadius: "30px",
 	width: '15%',
  	height: '45px',
  	margin: '2px',
  	outline: 'none',
  	fontFamily: 'sans-serif',
	color: 'white',
	fontSize: '18px',
	fontWeight: 'lighter',
	paddingLeft: '0px'
};

const astStyle = {
	color: "#F293C1",
	display: 'inline-block',
	paddingLeft: '340px'
}

const optionStyle = {
	backgroundColor: '#FFFFFF'
}

const Suggestion = () => (
    <>
    <div >
    <div style={headerStyle} >
    	Suggest a local resource center:
    </div>
    <form style={formStyle}>
        <label >
        <div style={categoryStyle} >
          Location <div style={astStyle}>*</div>
        </div>
          <input type="text" placeholder=" Address Line 1" style={boxStyle} />
          <br />
          <div style={spaceStyle}/>
          <input type="text" placeholder=" Address Line 2" style={boxStyle} />
          <br />
          <div style={spaceStyle}/>
          <input type="text" placeholder=" City" style={cityStyle} />
          <select style={selectStyle}>
          	<option value="AL">AL</option>
  			<option value="AK">AK</option>
  			<option value="AR">AR</option>
  			<option value="AZ">AZ</option> 
  			<option value="CA">CA</option>
  			<option value="CO">CO</option>
  			<option value="CT">CT</option>
  			<option value="DE">DE</option>
  			<option value="FL">FL</option>
  			<option value="GA">GA</option>
  			<option value="HI">HI</option>
  			<option value="ID">ID</option>
  			<option value="IL">IL</option>
  			<option value="IN">IN</option>
  			<option value="IA">IA</option>
  			<option value="KS">KS</option>
  			<option value="KY">KY</option>
  			<option value="LA">LA</option>
  			<option value="ME">ME</option>
  			<option value="MD">MD</option>
  			<option value="MA">MA</option>
  			<option value="MI">MI</option>
  			<option value="MN">MN</option>
  			<option value="MS">MS</option>
  			<option value="MO">MO</option>
  			<option value="MT">MT</option>
  			<option value="NE">NE</option>
  			<option value="NV">NV</option>
  			<option value="NH">NH</option>
  			<option value="NJ">NJ</option>
  			<option value="NM">NM</option>
  			<option value="NY">NY</option>
  			<option value="NC">NC</option>
  			<option value="ND">ND</option>
  			<option value="OH">OH</option>
  			<option value="OK">OK</option>
  			<option value="OR">OR</option>
  			<option value="PA">PA</option>
  			<option value="RI">RI</option>
  			<option value="SC">SC</option>
  			<option value="SD">SD</option>
  			<option value="TN">TN</option>
  			<option value="TX">TX</option>
  			<option value="UT">UT</option>
  			<option value="VT">VT</option>
  			<option value="VA">VA</option>
  			<option value="WA">WA</option>
  			<option value="WV">WV</option>
  			<option value="WI">WI</option>
  			<option value="WY">WY</option>
  		  </select>
          <input type="text" placeholder=" ZIP" style={subStyle} />
          <br />
          <br />
          <br />
          <div style={categoryStyle} >
          Website <div style={astStyle}>*</div>
          </div>
          <input type="text" placeholder=" Paste URL here" style={boxStyle} />
          <br />
          <br />
          <br />
          <div style={categoryStyle} >
          E-mail address
          </div>
          <input type="text" placeholder=" Insert E-mail address of resource center" style={boxStyle} />
          <br />
          <br />
          <br />
          <div style={categoryStyle} >
          Facebook
          </div>
          <input type="text" placeholder=" Insert URL link to Facebook profile" style={boxStyle} />
          <br />
          <br />
          <br />
          <div style={buttonPadding}>
          <button style={buttonStyle} type="button">
          SUBMIT
          </button>
          </div>
        </label>
      </form>
    </div>
    </>
);

export default Suggestion;
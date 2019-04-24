import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import getConfig from 'next/config';
import { BurgerMenu, NavBar } from '../components';

const { publicRuntimeConfig } = getConfig();

const headerStyle = {
  fontFamily: 'sans-serif',
  color: '#F293C1',
  fontSize: '40px',
  fontweight: 'bold',
  alignment: 'left',
  paddingLeft: '40px',
  paddingTop: '20px',
};

const subHeaderStyle = {
  fontFamily: 'sans-serif',
  color: '#F293C1',
  alignment: 'left',
  paddingLeft: '80px',
  paddingBottom: '35px',
  paddingTop: '15px',

};

const boxStyle = {
  borderStyle: 'solid',
  borderColor: '#F293C1',
  borderWidth: '3px',
  borderRadius: '30px',
  width: '35%',
  height: '35px',
  margin: '2px',
  outline: 'none',
  paddingLeft: '20px',
  fontSize: '15px',
  fontWeight: 'lighter',
  paddingRight: '4px',
};

const cityStyle = {
  borderStyle: 'solid',
  borderColor: '#F293C1',
  borderWidth: '3px',
  borderRadius: '30px',
  width: '17%',
  height: '35px',
  margin: '2px',
  outline: 'none',
  paddingLeft: '20px',
  fontSize: '15px',
  fontWeight: 'lighter',
  paddingRight: '4px',
};

const subStyle = {
  borderStyle: 'solid',
  borderColor: '#F293C1',
  borderWidth: '3px',
  borderRadius: '30px',
  width: '7%',
  height: '35px',
  margin: '2px',
  outline: 'none',
  paddingLeft: '20px',
  fontSize: '15px',
  fontWeight: 'lighter',
  paddingRight: '4px',
  backgroundColor: '#FFFFFF',
};

const selectStyle = {
  borderStyle: 'solid',
  borderColor: '#F293C1',
  borderWidth: '3px',
  borderRadius: '30px',
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
  left: '0',
};

const categoryStyle = {
  fontFamily: 'sans-serif',
  color: '#707070',
  paddingLeft: '15px',
  paddingBottom: '3px',
  fontSize: '20px',
  fontWeight: 'lighter',
  width: '100%',
};

const formStyle = {
  paddingLeft: '35px',
};

const spaceStyle = {
  paddingBottom: '3px',
};

const buttonPadding = {
  paddingLeft: '320px',
};

const buttonStyle = {
  backgroundColor: '#F293C1',
  borderRadius: '30px',
  width: '100px',
  height: '45px',
  margin: '2px',
  outline: 'none',
  fontFamily: 'sans-serif',
  color: 'white',
  fontSize: '18px',
  fontWeight: 'lighter',
  paddingLeft: '0px',
};

const astStyle = {
  color: '#F293C1',
  display: 'inline-block',
  paddingLeft: '10px',
};

class Suggestion extends Component {
  constructor(props) {
    super(props);
    this.appURL = publicRuntimeConfig.APP_URL || 'http://localhost:3000';
    this.state = { ad2: '' };
  }

  getData = (event) => {
    event.preventDefault();

    const data = {};
    const address = `${this.state.ad1} ${this.state.ad2}, ${this.state.city}, ${this.state.state} ${this.state.zip}`;
    console.log(this.state);

    const Geocoder = new google.maps.Geocoder();
    Geocoder.geocode({ address }, (results, status) => {
      // if exists, recenter to searched location
      if (status === 'OK') {
        data.Location = results[0].formatted_address;
        data.Website = this.state.website;
        if (this.state.email) {
          data.Email = this.state.email;
        }
        if (this.state.phone) {
          data.phone = this.state.phone;
        }
        const orgInfo = { [this.state.name]: data };
        console.log(orgInfo);

        fetch('/sendEmail', {
          method: 'post',
          body: orgInfo,
        });
      } else {
        console.log(`Geocode was not successful for the following reason: ${status}`);
      }
    });
  }

  onDataEntry = ({ target: { name, value, type } }) => {
    if (type !== 'checkbox') {
      this.setState({ [name]: value !== undefined ? value.trim() : '' });
    }
  }

  render() {
    return (
      <>
        <BurgerMenu />
        <NavBar />
        <div>
          <div style={headerStyle}>
            Suggest a local group
          </div>
          <div style={subHeaderStyle}>
            — that deals specifically with a bi/pan/fluid idenity
          </div>
          <form style={formStyle}>
            <label>
              <div style={categoryStyle}>
                Organization name
                <div style={astStyle}>*</div>
              </div>
              <input onChange={this.onDataEntry} type="text" name="name" placeholder="i.e. Bisexual Resource Center" style={boxStyle} />
              <br />
              <br />
              <br />
              <div style={categoryStyle}>
              Location
                {' '}
                <div style={astStyle}>*</div>
              </div>
              <input onChange={this.onDataEntry} type="text" placeholder="Address Line 1" name="ad1" style={boxStyle} />
              <br />
              <div style={spaceStyle} />
              <input onChange={this.onDataEntry} type="text" placeholder="Address Line 2" name="ad2" style={boxStyle} />
              <br />
              <div style={spaceStyle} />
              <input onChange={this.onDataEntry} type="text" placeholder=" City" name="city" style={cityStyle} />
              <select onChange={this.onDataEntry} name="state" style={selectStyle}>
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
                <option value="name">name</option>
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
              <input onChange={this.onDataEntry} type="text" placeholder=" ZIP" name="zip" style={subStyle} />
              <br />
              <br />
              <br />
              <div style={categoryStyle}>
                Website/Facebook/Meetup
                <div style={astStyle}>*</div>
              </div>
              <input onChange={this.onDataEntry} type="text" name="website" placeholder=" Paste URL here" style={boxStyle} />
              <br />
              <br />
              <br />
              <div style={categoryStyle}>
                E-mail address
              </div>
              <input onChange={this.onDataEntry} type="text" name="email" placeholder=" Enter E-mail contact to use" style={boxStyle} />
              <br />
              <br />
              <br />
              <div style={categoryStyle}>
              Phone number
              </div>
              <input onChange={this.onDataEntry} type="text" name="phone" placeholder=" Enter phone number if available" style={boxStyle} />
              <br />
              <br />
              <br />
              <div style={buttonPadding}>
                <button style={buttonStyle} type="button" onClick={this.getData}>
                SUBMIT
                </button>
              </div>
            </label>
          </form>
        </div>
      </>
    );
  }
}

export default Suggestion;

/* eslint-disable no-alert */
import React, { Component } from 'react';
import axios from 'axios';
import getConfig from 'next/config';
import Router from 'next/router';
import { BurgerMenu, NavBar } from '../components';

const { publicRuntimeConfig } = getConfig();

const headerStyle = {
  fontFamily: 'sans-serif',
  color: '#F293C1',
  fontSize: '40px',
  fontweight: 'bold',
  alignment: 'left',
  paddingLeft: '6%',
  paddingTop: '20px',
};

const subHeaderStyle = {
  fontFamily: 'sans-serif',
  color: '#F293C1',
  alignment: 'left',
  paddingLeft: '8%',
  paddingBottom: '35px',
  paddingTop: '15px',

};

const boxStyle = {
  borderStyle: 'solid',
  borderColor: '#F293C1',
  borderWidth: '3px',
  borderRadius: '30px',
  width: '230px',
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
  width: '100px',
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
  width: '50px',
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
  width: '100px',
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
  paddingLeft: '5%',
};

const spaceStyle = {
  paddingBottom: '3px',
};

const buttonPadding = {
  paddingLeft: '2%',
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

const appURL = publicRuntimeConfig.APP_URL || 'http://localhost:3000';

class Suggestion extends Component {
  constructor(props) {
    super(props);
    this.content = [];
    this.state = { name: '', ad2: '', ad1: '', city: '', state: '', zip: '', website: '' };
    this.fields = { name: 'Organization name', ad2: 'Address line 2', ad1: 'Address line 1', city: 'City', state: 'State', zip: 'Zip', website: 'Website' };
  }

  validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.trim());
  }

  validateEntry = (name, val) => {
    let error;
    switch (name) {
      case 'email':
        if (!(val.trim() === '' || this.validateEmail(val))) {
          document.getElementsByName('email')[0].style['border-color'] = 'red';
          error = 'Please enter a valid email.';
        } else {
          document.getElementsByName('email')[0].style['border-color'] = '#F293C1';
        }
        break;
      case 'name': case 'website': case 'city': case 'state': case 'zip':
        if (val.trim() === '') {
          error = `${this.fields[name]} cannot be left empty.`;
          document.getElementsByName(name)[0].style['border-color'] = 'red';
        } else {
          document.getElementsByName(name)[0].style['border-color'] = '#F293C1';
        }
        break;
      default:
        return undefined;
    }
    console.log(error);
    return error;
  }

  getData = (event) => {
    event.preventDefault();

    const data = {};
    const address = `${this.state.ad1} ${this.state.ad2}, ${this.state.city}, ${this.state.state} ${this.state.zip}`;
    console.log(this.state);

    const errorMsg = Object.keys(this.state).reduce((errors, name) => {
      console.log(name, this.state.name);
      const err = this.validateEntry(name, this.state[name]);
      if (err) errors.push(err);
      console.log(err);
      return errors;
    }, []);
    if (errorMsg && errorMsg.length) {
      console.log(errorMsg);
      const alertMsg = errorMsg.join('\n');
      alert(`Whoops! We cannot proceess your entries: \n\n${alertMsg}`);
      return;
    }
    const Geocoder = new google.maps.Geocoder();
    Geocoder.geocode({ address }, (results, status) => {
      console.log(results);
      // if exists, recenter to searched location
      if (status === 'OK') {
        data.State = this.state.state.charAt(0).toUpperCase() + this.state.state.slice(1);
        data.Location = results[0].formatted_address;
        data.lat = results[0].geometry.location.lat();
        data.lng = results[0].geometry.location.lng();
        data.Website = this.state.website;
        data.Name = this.state.name;
        if (this.state.email) {
          data.Email = this.state.email;
        }
        if (this.state.phone) {
          data.Phone = this.state.phone;
        }
        axios.post(`${appURL}/sendEmail`, {
          group: data,
        }).then(() => {
          alert('Thank you! We will review the information and add to our database.');
          Router.push('/');
        });
      } else {
        alert(`We cannot spot the address you entered on Google Map. Will you double check for us: \n\n${address}`);
      }
    });
  }

  onDataEntry = ({ target: { name, value } }) => {
    const val = value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    this.validateEntry(name, val);
    this.setState({ [name]: val.trim() });
  }

  render() {

    return (
      <>
        <NavBar />
        <BurgerMenu />
        <div style={{ justifyContent: 'center' }}>
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
                <option value="alabama">Alabama</option>
                <option value="alaska">Alaska</option>
                <option value="american samoa">American Samoa</option>
                <option value="arizona">Arizona</option>
                <option value="arkansas">Arkansas</option>
                <option value="california">California</option>
                <option value="colorado">Colorado</option>
                <option value="connecticut">Connecticut</option>
                <option value="delaware">Delaware</option>
                <option value="dc">DC</option>
                <option value="florida">Florida</option>
                <option value="georgia">Georgia</option>
                <option value="guam">Guam</option>
                <option value="hawaii">Hawaii</option>
                <option value="idaho">Idaho</option>
                <option value="illinois">Illinois</option>
                <option value="indiana">Indiana</option>
                <option value="iowa">Iowa</option>
                <option value="kansas">Kansas</option>
                <option value="kentucky">Kentucky</option>
                <option value="louisiana">Louisiana</option>
                <option value="maine">Maine</option>
                <option value="maryland">Maryland</option>
                <option value="massachusetts">Massachusetts</option>
                <option value="michigan">Michigan</option>
                <option value="minnesota">Minnesota</option>
                <option value="minor outlying islands">Minor Outlying Islands</option>
                <option value="mississippi">Mississippi</option>
                <option value="missouri">Missouri</option>
                <option value="montana">Montana</option>
                <option value="nebraska">Nebraska</option>
                <option value="nevada">Nevada</option>
                <option value="new hampshire">New Hampshire</option>
                <option value="new jersey">New Jersey</option>
                <option value="new mexico">New Mexico</option>
                <option value="new york">New York</option>
                <option value="north carolina">North Carolina</option>
                <option value="north dakota">North Dakota</option>
                <option value="northern mariana islands">Northern Mariana Islands</option>
                <option value="ohio">Ohio</option>
                <option value="oklahoma">Oklahoma</option>
                <option value="oregon">Oregon</option>
                <option value="pennsylvania">Pennsylvania</option>
                <option value="puerto rico">Puerto Rico</option>
                <option value="rhode island">Rhode Island</option>
                <option value="south carolina">South Carolina</option>
                <option value="south dakota">South Dakota</option>
                <option value="tennessee">Tennessee</option>
                <option value="texas">Texas</option>
                <option value="u.s. virgin islands">U.S. Virgin Islands</option>
                <option value="utah">Utah</option>
                <option value="vermont">Vermont</option>
                <option value="virginia">Virginia</option>
                <option value="washington">Washington</option>
                <option value="west virginia">West Virginia</option>
                <option value="wisconsin">Wisconsin</option>
                <option value="wyoming">Wyoming</option>
              </select>
              <input onChange={this.onDataEntry} type="text" placeholder=" ZIP" name="zip" style={subStyle} />
              <br />
              <br />
              <div style={categoryStyle}>
                Website/Facebook/Meetup
                <div style={astStyle}>*</div>
              </div>
              <input onChange={this.onDataEntry} type="text" name="website" placeholder="Paste URL here" style={boxStyle} />
              <br />
              <br />
              <div style={categoryStyle}>
                E-mail address
              </div>
              <input onChange={this.onDataEntry} type="text" name="email" placeholder="Enter E-mail contact to use" style={boxStyle} />
              <br />
              <br />
              <div style={categoryStyle}>
              Phone number
              </div>
              <input onChange={this.onDataEntry} type="text" name="phone" placeholder="Enter phone number if available" style={boxStyle} />
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

import React, {Component} from 'react';

import Login from './Login'
import Register from './Register'

import Background from './logo1.jpg';

var sectionStyle = {
  width: "100%",
  height: "400px",
  backgroundImage: `url(${Background})`
};

export default class Welcome extends Component {
  
  render(){
    return(
      <div style={{backgroundColor: "blue"}}>
        <div className="col-md-offset-4 col-md-4">
          <div className="zoom-anim-dialog">
            <div className="small-dialog-header">
              <h3 style={{textAlign: "center", borderRadius: "10px"}}>Welcome to Duperga</h3>
            </div>
            <div className="sign-in-form style-1">
              <ul className="tabs-nav">
                <li className><a href="#tab1">Log In</a></li>
                <li><a href="#tab2">Register</a></li>
              </ul>
              <div className="tabs-container alt">
                <Login />
                <Register />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
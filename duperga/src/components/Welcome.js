import React, {Component} from 'react';

import Login from './Login'
import Register from './Register'

import Background from './logo1.jpg';

var sectionStyle = {  
  webkitBackgroundSize: "cover",
  mozBackgroundSize: "cover",
  oBackgroundSize: "cover",
  backgroundSize: "cover",
  backgroundImage: `url(${Background})`
};

export default class Welcome extends Component {
  
  render(){
    return(
        <div className="container-fluid">
        <div className="col-md-offset-4 col-md-4">
          <div className="zoom-anim-dialog">
            <div className="small-dialog-header" style={{backgroundColor: "rgba(189, 195, 199,0.5)"}}>
              <h3 style={{textAlign: "center", borderRadius: "10px", color: "rgba(231, 76, 60,1.0)"}}>Welcome to Duperga</h3>
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
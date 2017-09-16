import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class Register extends Component {
  
  render(){
    return(
      <div className="tab-content" id="tab2" style={{display: 'none'}}>
        <form className="register">
          <p className="form-row form-row-wide">
            <label htmlFor="name">Name:
              <i className="im im-icon-Male" />
              <input type="text" className="input-text" name="name" id="name" />
            </label>
          </p>
          <p className="form-row form-row-wide">
            <label htmlFor="email2">Email Address:
              <i className="im im-icon-Mail" />
              <input type="text" className="input-text" name="email" id="email2" />
            </label>
          </p>
          <p className="form-row form-row-wide">
            <label htmlFor="password1">Password:
              <i className="im im-icon-Lock-2" />
              <input className="input-text" type="password" name="password1" id="password1" />
            </label>
          </p>
          <Link className="button border margin-top-5" style={{textAlign: "center"}} to={{
            pathname: `/Home`}}><b>Register</b></Link>
        </form>
      </div>
    
    )
  }
}
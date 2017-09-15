import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class Login extends Component {
  
  render(){
    return(
      <div className="tab-content" id="tab1" style={{display: 'none'}}>
        <form method="post" className="login">
          <p className="form-row form-row-wide">
            <label htmlFor="email">Email:
              <i className="im im-icon-Mail" />
              <input type="text" className="input-text" name="email" id="email" />
            </label>
          </p>
          <p className="form-row form-row-wide">
            <label htmlFor="password">Password:
              <i className="im im-icon-Lock-2" />
              <input className="input-text" type="password" name="password" id="password" />
            </label>
          </p>
          <div className="form-row">
            <Link className="button border margin-top-5" style={{textAlign: "center"}} to={{
              pathname: `/home`}}><b>Login</b></Link>
          </div>
        </form>
      </div>
    
    )
  }
}
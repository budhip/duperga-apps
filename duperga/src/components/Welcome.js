import React, {Component} from 'react';

export default class Welcome extends Component {
  
  render(){
    return(
      <div className="container">
        <div className="col-md-offset-4 col-md-4">
          <div className="zoom-anim-dialog">
            <div className="small-dialog-header">
              <h3>Sign In</h3>
            </div>
            <div className="sign-in-form style-1">
              <ul className="tabs-nav">
                <li className><a href="#tab1">Log In</a></li>
                <li><a href="#tab2">Register</a></li>
              </ul>
              <div className="tabs-container alt">
                <div className="tab-content" id="tab1" style={{display: 'none'}}>
                  <form method="post" className="login">
                    <p className="form-row form-row-wide">
                      <label htmlFor="email">Email:
                        <i className="im im-icon-Mail" />
                        <input type="text" className="input-text" name="email" id="email" defaultValue />
                      </label>
                    </p>
                    <p className="form-row form-row-wide">
                      <label htmlFor="password">Password:
                        <i className="im im-icon-Lock-2" />
                        <input className="input-text" type="password" name="password" id="password" />
                      </label>
                    </p>
                    <div className="form-row">
                      <input type="submit" className="button border margin-top-5" name="login" defaultValue="Login" />
                    </div>
                  </form>
                </div>
                <div className="tab-content" id="tab2" style={{display: 'none'}}>
                  <form method="post" className="register">
                    <p className="form-row form-row-wide">
                      <label htmlFor="name">Name:
                        <i className="im im-icon-Male" />
                        <input type="text" className="input-text" name="name" id="name" defaultValue />
                      </label>
                    </p>
                    <p className="form-row form-row-wide">
                      <label htmlFor="email2">Email Address:
                        <i className="im im-icon-Mail" />
                        <input type="text" className="input-text" name="email" id="email2" defaultValue />
                      </label>
                    </p>
                    <p className="form-row form-row-wide">
                      <label htmlFor="password1">Password:
                        <i className="im im-icon-Lock-2" />
                        <input className="input-text" type="password" name="password1" id="password1" />
                      </label>
                    </p>
                    <input type="submit" className="button border fw margin-top-10" name="register" defaultValue="Register" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
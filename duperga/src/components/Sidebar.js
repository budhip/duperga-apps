import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class Sidebar extends Component {
  render(){
    return(
      <div id="dashboard">
        <div className="dashboard-nav">
          <div className="dashboard-nav-inner">
            <ul data-submenu-title="Main">
              <li>
                <Link to="/Home"><i className="sl sl-icon-eye" /> Latest Item</Link>
              </li>
              <li>
                <Link to="/ListItem"><i className="sl sl-icon-layers" /> Wishlist</Link>
              </li>
            </ul>
            <ul data-submenu-title="Account">
              <li>
                <Link to="/Profile"><i className="sl sl-icon-user" /> My Profile</Link>
              </li>
              <li>
                <Link to="/"><i className="sl sl-icon-power" /> Logout</Link>
              </li>
            </ul>
          </div>
        </div>

      </div>
    )
  }
}
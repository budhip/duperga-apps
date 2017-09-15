import React, {Component} from 'react';
import { NavLink } from 'react-router-dom'

export default class Sidebar extends Component {
  render(){
    return(
      <div id="dashboard">
        <div className="dashboard-nav">
          <div className="dashboard-nav-inner">
            <ul data-submenu-title="Duperga">
              <li>
                <NavLink to="/home" activeStyle={{backgroundColor: "rgba(149, 165, 166,0.3)",fontWeight: 'bold'}}>
                <i className="sl sl-icon-eye" /> Latest Item</NavLink>
              </li>
              <li>
                <NavLink to="/list-item" activeStyle={{backgroundColor: "rgba(149, 165, 166,0.3)",fontWeight: 'bold'}}><i className="sl sl-icon-layers" /> Wishlist</NavLink>
              </li>
              <li>
                <NavLink to="/"><i className="sl sl-icon-power" /> Logout</NavLink>
              </li>
            </ul>
          </div>
        </div>

      </div>
    )
  }
}
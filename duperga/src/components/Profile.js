import React, {Component} from 'react'

import Navbar from './Navbar'
import Sidebar from './Sidebar'

export default class Profile extends Component {
  
  render(){
    return(
      <div>
        <Navbar />
        <Sidebar />
        <div className="dashboard-content">
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <div className="dashboard-list-box margin-top-0">
                <h4 className="gray">Profile Details</h4>
                <div className="dashboard-list-box-static">
                  <div className="my-profile">
                    <label>Your Name</label>
                    <input defaultValue="Tom Perrin" type="text" />
                    <label>Email</label>
                    <input type="text" />
                    <label>Password</label>
                    <input type="password" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
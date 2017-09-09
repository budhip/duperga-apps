import React, {Component} from 'react';

class Navbar extends Component {
  
  render(){
    return(
      
      <header id="header-container" className="fixed fullwidth dashboard">
        <div id="header" className="not-sticky">
          <div className="container">
            <div className="left-side">
              <div id="logo">
                <a href="index.html"><img src="images/logo.png" alt="" /></a>
                <a href="index.html" className="dashboard-logo"><img src="images/logo2.png" alt="" /></a>
              </div>
              <div className="menu-responsive">
                <i className="fa fa-reorder menu-trigger" />
              </div>
              <nav id="navigation" className="style-1">
                <ul id="responsive">
                  <li><a href="">Home</a>
                    <ul>
                      <li><a href="index.html">Home 1</a></li>
                      <li><a href="index-2.html">Home 2</a></li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>
      
    )
  }
}


export default Navbar
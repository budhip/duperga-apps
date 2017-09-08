import React, {Component} from 'react';

class Navbar extends Component {
  
  render(){
    return(
      <nav className="navbar navbar-default" >
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand">Brand</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <form className="navbar-form navbar-right">
            <button type="submit" className="btn btn-danger">Logout</button>
          </form>
          </div>
        </div>
      </nav>
      
    )
  }
}


export default Navbar
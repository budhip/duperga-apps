import React, {Component} from 'react';
import imgUrl from './logo1.jpg';

const background ={
  height: '675px',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundImage: 'url(' + imgUrl + ')'
};

export default class Login extends Component {
  
  render(){
    return(
      <div style={background}>
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-md-4 col-lg-offset-4">
              <form className="form" style={{marginTop: '100px'}}>
                <fieldset>
                  <legend style={{textAlign: 'center'}}>Registration Form</legend>
                  <div className="form-group">
                    <label className="col-lg-2 control-label">Name</label>            
                    <input name="name" type="text" className="form-control" style={{backgroundColor: "rgba(189, 195, 199,0.5)"}}/>
                  </div>
                  <div className="form-group">
                    <label className="col-lg-2 control-label">Email</label>            
                    <input name="email" type="text" className="form-control" style={{backgroundColor: "rgba(189, 195, 199,0.5)"}}/>
                  </div>
                  <div className="form-group">
                    <label className="col-lg-2 control-label">Username</label>            
                    <input name="username" type="text" className="form-control" style={{backgroundColor: "rgba(189, 195, 199,0.5)"}}/>
                  </div>
                  <div className="form-group">
                    <label className="col-lg-2 control-label">Password</label>            
                    <input name="password" type="password" className="form-control" style={{backgroundColor: "rgba(189, 195, 199,0.5)"}} />
                  </div>
                  <div className="form-group">
                  <button type="submit" className="btn btn-success">Submit</button>
                  </div>
                </fieldset>
              </form>          
            </div>
          </div> 
        </div>
      </div>
    
    )
  }
}
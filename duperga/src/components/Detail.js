import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';

export default class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: props.location.state.detailData.name,
      current_saving: props.location.state.detailData.current_saving,
      current_price: props.location.state.detailData.current_price,
      bank_saving: props.location.state.detailData.bank_saving,
      time_period: props.location.state.detailData.time_period,
      predicted_budget: props.location.state.detailData.predicted_budget,
      predicted_price: props.location.state.detailData.predicted_price,
      createdAt: props.location.state.detailData.createdAt,
      updatedAt: props.location.state.detailData.updatedAt
    }
  }
  
  render(){
    return(
      
      <div className="dashboard-content">
        <div className="row">
          <div className="col-md-12">
            <h2>Detail Item</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div id="add-listing">
              
              <div className="add-listing-section">
                <div className="add-listing-headline">
                  <h3>{this.state.name}</h3>
                  <p>Current Price: <b>Rp. {this.state.current_price}</b></p>
                </div>
                <p>Your Current Budget: <b>Rp. {this.state.current_saving}</b></p>
                <p>Your Current Bank Saving: <b>Rp. {this.state.bank_saving}</b></p>
                <p>You want Buy In: <b>{this.state.time_period} Month Later</b></p>
                
                
              </div>
            </div>
          </div>
          
          <div className="col-lg-12 margin-top-45">
            <div id="add-listing">
              
              <div className="add-listing-section">
                <div className="add-listing-headline">
                  <h3><i className="sl sl-icon-chart" />Predicted Budget Chart</h3>
                </div>
                <LineChart width={900} height={300} data={this.state.predicted_budget}
                      margin={{top: 5, right: 50, left: 20, bottom: 5}}>
                 <XAxis dataKey="year"/>
                 <YAxis/>
                 <CartesianGrid strokeDasharray="5 5"/>
                 <Tooltip/>
                 <Legend />
                 <Line type="monotone" dataKey="saving" stroke="#8884d8" activeDot={{r: 8}}/>
                 <Line type="monotone" dataKey="month" stroke="#8884d8" activeDot={{r: 8}}/>
                 
                </LineChart>
              </div>
              
            </div>
          </div>
          
          <div className="col-lg-12 margin-top-45">
            <div id="add-listing">
              
              <div className="add-listing-section">
                <div className="add-listing-headline">
                  <h3><i className="sl sl-icon-chart" />Predicted Price Chart</h3>
                </div>
                <BarChart width={600} height={300} data={this.state.predicted_price}
                      margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                   <XAxis dataKey="year"/>
                   <YAxis/>
                   <CartesianGrid strokeDasharray="3 3"/>
                   <Tooltip/>
                   <Legend />
                 <Bar dataKey="price" fill="#8884d8" />
                 
                </BarChart>
                <Link className="button gray" to="/ListItem">Back</Link>
              </div>
              
            </div>
          </div>
          
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="copyrights">© 2017 Listeo. All Rights Reserved.</div>
          </div>
        </div>
      </div>
    )
  }
  
}
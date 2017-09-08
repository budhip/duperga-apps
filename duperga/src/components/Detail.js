import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area} from 'recharts';

const data = [
      {month: 'Jan-Dec 2017', price: 1000},
      {month: 'Jan-Dec 2018', price: 1500},
      {month: 'Jan-Dec 2019', price: 2000},
      {month: 'Jan-Dec 2020', price: 2780},
      {month: 'Jan-Dec 2021', price: 3000},
      {month: 'Jan-Dec 2022', price: 4000},
      {month: 'Jan-Dec 2023', price: 4100},
      {month: 'Jan-Dec 2024', price: 6350},
];

export default class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: props.location.state.detailData.name,
      time_period: props.location.state.detailData.time_period,
      current_saving: props.location.state.detailData.current_saving,
      predicted_budget: props.location.state.detailData.predicted_budget,
      current_price: props.location.state.detailData.current_price,
      predicted_price: props.location.state.detailData.predicted_price,
      alexaAdvice: props.location.state.detailData.alexaAdvice,
      imageItem: props.location.state.detailData.imageItem,
      createdAt: props.location.state.detailData.createdAt
    }
  }
  
  render(){
    return(
        <div className="container">
          <h3>Detail Item</h3><hr/>
          <div className="row">
            <div className="media">
              <div className="media-left">
                <img src={this.state.imageItem} className="media-object" style={{height: "330px"}} alt=""/>
              </div>
              <div className="media-body">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h5>{this.state.name}</h5>
                  </div>
                  <div className="panel-body">
                    <p>Your Current Saving: <b>Rp. {this.state.current_saving}</b></p>
                    <p>Current Price: <b>Rp. {this.state.current_price}</b></p>
                    <p>You want Buy In: <b>{this.state.time_period} Later</b></p>
                    <p>Predicted Price: <b>Rp. {this.state.predicted_price}</b></p>
                    <p>The Funds You Have To Spent: <b>Rp. {this.state.predicted_budget}</b></p>
                  </div>
                  <div className="panel-footer">
                    <Link className="btn btn-primary" to="/">Back</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
          <div className="row">
            
              <AreaChart width={1200} height={300} data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="price" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
              </AreaChart>
            
          </div>
          
        </div>
        
    )
  }
  
}
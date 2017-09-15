import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';
import moment from 'moment';
import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/id';

import Sidebar from './Sidebar'

const CustomizedAxisTick = React.createClass({
  render () {
    const {x, y, payload} = this.props;
   	return (
    	<g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{payload.value}</text>
      </g>
    );
  }
});

const CustomizedYAxisTick = React.createClass({
  render () {
    const {x, y, payload} = this.props;
   	return (
    	<g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" >{(payload.value/1000).toLocaleString()}</text>
      </g>
    );
  }
});

const CustomTooltip  = React.createClass({

  render() {
    const { active } = this.props;
    if (active) {
      const { payload } = this.props;
      console.log('=======================================',this.props);
      
      return (
        <div className="custom-tooltip" style={{
          backgroundColor: "rgba(52, 152, 219,0.7)",
          padding: "10px", 
          fontSize: "15px",
          color: "white",
          borderRadius: "10px"
        }}>
          <p style={{marginBottom: "3px"}}>current saving Rp. {payload[0].payload.saving.toLocaleString()}</p>
          <p style={{marginBottom: "3px"}}>current price Rp. {payload[0].payload.price.toLocaleString()}</p>
          <p style={{marginBottom: "2px"}}>Month: {payload[0].payload.month}</p>
        </div>
      );
    }
    return null;
  }
});

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
      updatedAt: props.location.state.detailData.updatedAt,
      dataFilter: props.location.state.detailData.dataFilter,
      canBuyHouse: props.location.state.detailData.canBuyHouse
    }
  }
  
  render(){
    return(
      <div>
      <Sidebar />
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
                    <h3 style={{fontStyle: "italic"}}>{this.state.name}</h3>
                    <p style={{marginBottom: "15px", fontSize:"14px"}}><Moment locale='id' format="LLLL">{ this.state.createdAt }</Moment></p>
                    <p style={{marginBottom: "5px"}}>House Price: <b>Rp. {this.state.current_price.toLocaleString()}</b></p>
                  </div>
                  <table>
                    <tr>
                      <td><p style={{margin: "0 10px 3px 0"}}>Allocated Money per month: </p></td>
                      <td><b>Rp. {this.state.current_saving.toLocaleString()}</b></td>
                    </tr>
                    <tr>
                      <td><p style={{margin: "0 10px 3px 0"}}>Initial Balance: </p></td>
                      <td><b>Rp. {this.state.bank_saving.toLocaleString()}</b></td>
                    </tr>
                    <tr>
                      <td><p style={{margin: "0 10px 3px 0"}}>Time Period: </p></td>
                      <td><b>{this.state.time_period} Month</b></td>
                    </tr>
                  </table>
                  
                  <p style={{marginBottom: "5px"}}>You can buy this house on <b><u>{this.state.canBuyHouse[0].month} {this.state.canBuyHouse[0].year}</u></b></p>
                  <p style={{marginBottom: "5px"}}>House Price will be <b><u>Rp.{this.state.canBuyHouse[0].price.toLocaleString()}</u></b> on <b><u>{this.state.canBuyHouse[0].month} {this.state.canBuyHouse[0].year}</u></b></p>
                  <p style={{marginBottom: "5px"}}>And Your money will be <b><u>Rp.{this.state.canBuyHouse[0].saving.toLocaleString()}</u></b> on <b><u>{this.state.canBuyHouse[0].month} {this.state.canBuyHouse[0].year}</u></b></p>
                  
                  
                </div>
              </div>
            </div>
            
            <div className="col-lg-12 margin-top-45">
              <div id="add-listing">
                
                <div className="add-listing-section">
                  <div className="add-listing-headline">
                    <h3><i className="sl sl-icon-chart" />Predicted Budget & Price Chart</h3>
                  </div>
                  <LineChart width={950} height={300} data={this.state.dataFilter}
                        margin={{top: 5, right: 50, left: 20, bottom: 5}}>
                   <XAxis dataKey="year" height={60} tick={<CustomizedAxisTick/>}/>
                   <YAxis tick={<CustomizedYAxisTick />}/>
                   <CartesianGrid strokeDasharray="5 5"/>
                   <Tooltip content={<CustomTooltip/>}/>
                   <Legend />
                   <Line type="monotone" dataKey="saving" stroke="#8884d8" activeDot={{r: 8}}/>
                   <Line type="monotone" dataKey="price" stroke="#82ca9d" activeDot={{r: 8}} label="ajcsj"/>
                   
                  </LineChart>
                  <Link className="button gray" to="/list-item" style={{backgroundColor: "rgba(52, 152, 219,1.0)"}}>Back</Link>
                </div>
              </div>
            </div>
            
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="copyrights">© 2017 <b>Duperga</b>. All Rights Reserved.</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
}
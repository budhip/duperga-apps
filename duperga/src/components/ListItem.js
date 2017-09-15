import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/id';

import {dbGet, dbSearch, dbDelete} from '../actions'
import Sidebar from './Sidebar'

class ListItem extends Component {
  constructor(props) {
    super(props)
    this.state= {
      listData: this.props.list
    }
  }
  
  handleInput(keyword){
    this.props.search(keyword)
  }
  
  componentWillMount(){
    this.props.allListData()
  }
  
  render(){
    // console.log('===================', this.props.list);
    return(
      <div>
      
      <Sidebar />
        <div className="container-fluid">  
          <div className="col-md-offset-2 col-md-9" style={{margin: "50px 0 0 280px"}}>
            <div className="row">
              <div style={{marginLeft: "15px"}}>
                <input style={{width: '350px', textAlign: 'center'}} onChange={(e) => this.handleInput(e.target.value)} type="text" className="form-control" placeholder="Search Your Items Here" />
              </div>
            </div>
          <div className="row">
            <div className="col-md-12">
              <div className="dashboard-list-box margin-top-0">
                <h4>Active Listings</h4>
                <ul>
                {this.props.list.map((data, index) => {
                  return(<li key={index} style={{padding: "0px 30px"}}>
                    <div className="list-box-listing">
                      <div className="list-box-listing-content">
                        <div className="inner">
                          <h2 style={{margin: "10px 0 5px 0", fontStyle: "italic"}}>{data.name}</h2>
                          <p style={{marginBottom: "15px", fontSize:"14px"}}><Moment locale='id' format="LLLL">{ data.createdAt }</Moment></p>
                          <p style={{marginBottom: "5px"}}>Allocated Money per month:  <b>Rp. {data.current_saving.toLocaleString()}</b></p>
                          <p style={{marginBottom: "5px"}}>House Price: <b>Rp. {data.current_price.toLocaleString()}</b></p>
                          <p>Time Period: <b>{data.time_period}</b> month</p>
                        </div>
                      </div>
                    </div>
                    <div className="buttons-to-right">
                      <button className="button" style={{marginRight: '10px', backgroundColor: "rgba(52, 152, 219,1.0)"}}><Link to={{
                        pathname: `/detail/${data._id}`,
                        state: {detailData: data} }} style={{color: "white"}}><i className="sl sl-icon-info" />Detail</Link></button>
                      <button className="button" onClick={() => this.props.delete(data._id)} ><i className="sl sl-icon-trash" />Delete</button>
                    </div>
                  </li>)
                })}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-offset-3 col-md-8">
            <div className="copyrights">© 2017 <b>Duperga</b>. All Rights Reserved.</div>
          </div>
        </div>
        </div>
      </div>
    )
  }
  
}

const mapStateToProps = (state) => {
  return {
    list: state.listItem
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    allListData: () => dispatch(dbGet()),
    search: (keyword) => dispatch(dbSearch(keyword)),
    delete: (id) => dispatch(dbDelete(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListItem)
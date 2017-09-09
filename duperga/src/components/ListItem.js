import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

import {dbGet, dbSearch, dbDelete} from '../actions'

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
        <div className="container-fluid">  
          <div className="col-lg-offset-3 col-md-9">
            <div className="row">
              <div style={{marginLeft: "15px"}}>
                <input style={{width: '350px', textAlign: 'center'}} onChange={(e) => this.handleInput(e.target.value)} type="text" className="form-control" placeholder="Search Your Items Here" />
              </div>
            </div>
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="dashboard-list-box margin-top-0">
                <h4>Active Listings</h4>
                <ul>
                {this.props.list.map((data, index) => {
                  return(<li key={index} style={{padding: "0px 30px"}}>
                    <div className="list-box-listing">
                      <div className="list-box-listing-content">
                        <div className="inner">
                          <h2 style={{textDecoration: "underline", marginTop: "10px"}}>{data.name}</h2>
                          <p>Current Saving: <b>Rp. {data.current_saving}</b></p>
                          <p>Current Price: <b>Rp. {data.current_price}</b></p>
                          <p>Time Period: <b>{data.time_period}</b></p>
                        </div>
                      </div>
                    </div>
                    <div className="buttons-to-right">
                      <Link className="button gray" style={{marginRight: '10px'}} to={{
                        pathname: `/detail/${data._id}`,
                        state: {detailData: data} }}><i className="sl sl-icon-info" />Detail</Link>
                    </div>
                  </li>)
                })}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <div className="copyrights">© 2017 Listeo. All Rights Reserved.</div>
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
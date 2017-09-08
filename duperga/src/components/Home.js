import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

import {dbGet, dbSearch, dbDelete} from '../actions'

class Home extends Component {
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
        <div className="container">
          <h3>List Item</h3>          
          <div className="row">
            <div className="col-md-offset-4 col-md-4">
              <input style={{width: '350px', textAlign: 'center'}} onChange={(e) => this.handleInput(e.target.value)} type="text" className="form-control" placeholder="Search Your Items Here" />
            </div>
          </div>
          <hr/>
              <div className="row">
              {
                this.props.list.map((data, index) => {
                return (<div className="col-md-4" key={index}>
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <img src={data.imageItem} alt="" className="img-thumbnail"/>
                    </div>
                    <div className="panel-body">
                      <h4 className="card-title">{data.name}</h4>
                      <p className="card-text">Price Item will be Rp.{data.predicted_price} in {data.time_period} Later</p>
                      <Link className="btn btn-primary" style={{marginRight: '10px'}} to={{
                        pathname: `/edit/${data.id}`,
                        state: {detailData: data} }}>Detail</Link>
                      <button onClick={() => this.props.delete(data.id)} className="btn btn-danger">Delete</button>
                    </div>
                  </div>
                </div>)
                })
              }
          </div>
          <hr style={{marginTop: "80px"}}/>
          <h3>Footer</h3>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)
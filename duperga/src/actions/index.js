import axios from 'axios'

export const getData = (list) => {
  return {
    type: "GET_DATA",
    payload: {
      listData: list
    }
  }
}
export const getDataGrap = (data) => {
  return {
    type: "GET_DATA_GRAPH",
    payload: {
      dataGrap: data
    }
  }
}

export const deleteData = (id) => {
  return {
    type: 'DELETE_DATA',
    payload: {
      index: id
    }
  }
}

export const dbGet = () => {
  let predicted_price = [[]];
  return (dispatch, getState) => {
    axios.get('https://duperga-179314.appspot.com/api/wishlist/')
    .then(res => {
      
      let counter = 0
      res.data.forEach( eachData => {
        predicted_price.push([])
        eachData.predicted_price.forEach( price => {
          predicted_price[counter].push(price)
        })
        counter++
      })
      
      predicted_price.pop()
      console.log(predicted_price);
      dispatch(getDataGrap(predicted_price))
      dispatch(getData(res.data))
    })
    .catch(err => console.log(err))
  }
}

export const dbSearch = (keyword) => {
  return(dispatch) => {
    axios.get(`http://localhost:3000/items`)
    .then(res => {
      dispatch(getData(res.data))
      dispatch({
        type: 'SEARCH',
        payload: {
          keyword: keyword
        }
      })
    })
    .catch(err => console.log(err))
  }
}

export const dbDelete = (id) => {
  return(dispatch) => {
    axios.delete(`http://localhost:3000/items/${id}`)
    .then(res => {
      dispatch(deleteData(res))
    })
    .catch(err => console.log(err))
  }
}
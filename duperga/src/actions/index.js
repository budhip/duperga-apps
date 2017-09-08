import axios from 'axios'

export const getData = (list) => {
  return {
    type: "GET_DATA",
    payload: {
      listData: list
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
  return (dispatch, getState) => {
    axios.get('http://localhost:3000/items')
    .then(res => {
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
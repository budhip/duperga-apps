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

export const dbGet = () => {
  return (dispatch, getState) => {
    axios.get('https://duperga-179314.appspot.com/api/wishlist/')
    .then(res => {
      
      var newDataFilter = []
      res.data.forEach(listData => {
        var dataFilter = []
        var objBudget = {}
        listData.predicted_budget.forEach(dataBudget => {
          let c = listData.predicted_price.filter(a => {
            return a.year === dataBudget.year
          })
          objBudget = {
            month: dataBudget.month,
            saving: dataBudget.saving,
            year: dataBudget.year,
            price: c[0].price
          }
          dataFilter.push(objBudget)
        })
        const newData = {...listData, dataFilter: dataFilter}
        newDataFilter.push(newData)
      })

      dispatch(getData(newDataFilter))
    })
    .catch(err => console.log(err))
  }
}

export const dbSearch = (keyword) => {
  return(dispatch) => {
    axios.get(`https://duperga-179314.appspot.com/api/wishlist/`)
    .then(res => {
      var newDataFilter = []
      res.data.forEach(listData => {
        var dataFilter = []
        var objBudget = {}
        listData.predicted_budget.forEach(dataBudget => {
          let c = listData.predicted_price.filter(a => {
            return a.year === dataBudget.year
          })
          objBudget = {
            month: dataBudget.month,
            saving: dataBudget.saving,
            year: dataBudget.year,
            price: c[0].price
          }
          dataFilter.push(objBudget)
        })
        const newData = {...listData, dataFilter: dataFilter}
        newDataFilter.push(newData)
      })

      dispatch(getData(newDataFilter))
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
  return(dispatch, getState) => {
    axios.delete(`https://duperga-179314.appspot.com/api/wishlist/${id}`)
    .then(res => {
    dispatch(dbGet())
  })
    .catch(err => console.log(err))
  }
}
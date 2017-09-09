const initialState = {
  listItem: []
}

export default (state=initialState, action) => {
  switch (action.type) {
    case 'GET_DATA':
      return {...state, listItem: action.payload.listData}
    case 'SEARCH':
      return {...state, listItem: state.listItem.filter(data => {
        return data.name.toLowerCase().indexOf(action.payload.keyword.toLowerCase())>=0
      })}
    case 'DELETE_DATA':
      return {...state, listItem:state.listItem.filter(data => {
        return data.id !== action.payload.index
      })}
    case 'GET_DATA_GRAPH':
      console.log('===================================================',action.payload.dataGrap);
      let hehe = state.listItem
      hehe.map(h => {
        return h.concat(action.payload.dataGrap)
      })
      return {...state, listItem: hehe }
    default:
      return state
  }
}
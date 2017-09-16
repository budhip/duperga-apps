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
    default:
      return state
  }
}
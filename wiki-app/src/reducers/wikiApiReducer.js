const initialState = {
  wikiApis: [],
  isFetching: false
}

function wikiApiReducer(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_WIKI_APIS':
      return {
        ...state,
        isFetching: true
      }
    case 'RECEIVE_WIKI_APIS':
      if(action.status) {
        return {
          ...state,
          status: 'error',
          isFetching: false,
          error: action.error
        }
      }
      return {
        ...state,
        wikiApis: action.apiWikis,
        isFetching: false,
        status: 'success'
      }
    default:
      return state
  }
}

export default wikiApiReducer

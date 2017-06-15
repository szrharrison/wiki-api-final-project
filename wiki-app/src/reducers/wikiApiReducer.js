const initialState = {
  wikiApis: [],
  wikiApi: {},
  viewingWiki: true,
  isFetching: false,
  areFetching: false
}

function wikiApiReducer(state = initialState, action) {
  switch (action.type) {
    case 'VIEWING_WIKI':
      return {
        ...state,
        viewingWiki: action.viewingWiki
      }
    case 'REQUEST_WIKI_APIS':
      return {
        ...state,
        areFetching: true
      }
    case 'RECEIVE_WIKI_APIS_ERROR':
      return {
        ...state,
        status: 'error',
        areFetching: false,
        error: action.error
      }
    case 'RECEIVE_WIKI_APIS':
      return {
        ...state,
        wikiApis: action.apiWikis,
        areFetching: false,
        status: 'success'
      }
    case 'REQUEST_WIKI_API':
      return {
        ...state,
        isFetching: true
      }
    case 'RECEIVE_WIKI_API_ERROR':
      return {
        ...state,
        status: 'error',
        isFetching: false,
        error: action.error
      }
    case 'RECEIVE_WIKI_API':
      return {
        ...state,
        wikiApi: action.apiWiki,
        isFetching: false,
        status: 'success'
      }
    default:
      return state
  }
}

export default wikiApiReducer

const initialState = {
  wikiApis: [],
  pages: [],
  name: '',
  slug: '',
  fetchWikiApis: {
    areFetching: false
  },
  fetchWikiApi: {
    isFetching: false,
  }
}

function wikiApiReducer(state = initialState, action) {
  switch (action.type) {
    case 'wikiApi.REQUEST_WIKI_APIS':
      return {
        ...state,
        fetchWikiApis: {
          areFetching: true
        }
      }
    case 'wikiApi.RECEIVE_WIKI_APIS_ERROR':
      return {
        ...state,
        fetchWikiApis: {
          status: action.status,
          areFetching: false,
          receivedAt: action.receivedAt,
          error: action.error
        }
      }
    case 'wikiApi.RECEIVE_WIKI_APIS':
      return {
        ...state,
        wikiApis: action.wikiApis,
        fetchWikiApis: {
          status: action.status,
          receivedAt: action.receivedAt,
          areFetching: false
        }
      }
    case 'wikiApi.REQUEST_WIKI_API':
      return {
        ...state,
        fetchWikiApi: {
          isFetching: true
        }
      }
    case 'wikiApi.RECEIVE_WIKI_API_ERROR':
      return {
        ...state,
        fetchWikiApi: {
          status: action.status,
          isFetching: false,
          receivedAt: action.receivedAt,
          error: action.error
        }
      }
    case 'wikiApi.RECEIVE_WIKI_API':
      return {
        ...state,
        name: action.name,
        slug: action.slug,
        pages: action.pages,
        fetchWikiApi: {
          status: action.status,
          isFetching: false,
          receivedAt: action.receivedAt,
          error: action.error
        }
      }
    default:
      return state
  }
}

export default wikiApiReducer

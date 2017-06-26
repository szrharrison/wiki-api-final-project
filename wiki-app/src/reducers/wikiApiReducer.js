const initialState = {
  wikiApis: [],
  pages: [],
  wikiInfo: {
    name: '',
    slug: ''
  },
  newWikiInfo: {
    name: '',
    slug: '',
    errors: [[null, null]]
  },
  fetchWikiApis: {
    areFetching: false
  },
  fetchWikiApi: {
    isFetching: false,
  },
  createWikiApi: {
    isCreating: false,
  },
  updateWikiApi: {
    isCreating: false,
  },
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
          error: action.error,
          receivedAt: action.receivedAt,
          areFetching: false
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
          error: action.error,
          receivedAt: action.receivedAt,
          isFetching: false
        }
      }
    case 'wikiApi.RECEIVE_WIKI_API':
      return {
        ...state,
        pages: action.pages,
        wikiInfo: {
          name: action.name,
          slug: action.slug
        },
        fetchWikiApi: {
          status: action.status,
          receivedAt: action.receivedAt,
          isFetching: false
        }
      }
    case 'wikiApi.REQUEST_CREATE_WIKI_API':
      return {
        ...state,
        createWikiApi: {
          isCreating: true
        }
      }
    case 'wikiApi.CREATE_WIKI_API_ERROR':
      return {
        ...state,
        createWikiApi: {
          status: action.status,
          error: action.error,
          receivedAt: action.receivedAt,
          isCreating: false
        }
      }
    case 'wikiApi.RECEIVE_CREATE_WIKI_API':
      return {
        ...state,
        wikiInfo: {
          name: action.name,
          slug: action.slug
        },
        createWikiApi: {
          status: action.status,
          receivedAt: action.receivedAt,
          isCreating: false
        }
      }
    case 'wikiApi.REQUEST_UPDATE_WIKI_API':
      return {
        ...state,
        updateWikiApi: {
          isCreating: true
        }
      }
    case 'wikiApi.UPDATE_WIKI_API_ERROR':
      return {
        ...state,
        updateWikiApi: {
          status: action.status,
          error: action.error,
          receivedAt: action.receivedAt,
          isCreating: false
        }
      }
    case 'wikiApi.RECEIVE_UPDATE_WIKI_API':
      return {
        ...state,
        pages: action.pages,
        wikiInfo: {
          name: action.name,
          slug: action.slug
        },
        updateWikiApi: {
          status: action.status,
          receivedAt: action.receivedAt,
          isCreating: false
        }
      }
    case 'wikiApi.SET_NEW_WIKI_NAME':
      const nonNameErrors = state.newWikiInfo.errors.filter( error => error[0] !== 'Name' )
      return {
        ...state,
        newWikiInfo: {
          ...state.newWikiInfo,
          name: action.name,
          errors: [
            ...action.errors,
            ...nonNameErrors
          ]
        }
      }
    case 'wikiApi.SET_NEW_WIKI_SLUG':
      const nonSlugErrors = state.newWikiInfo.errors.filter( error => error[0] !== 'Slug' )
      return {
        ...state,
        newWikiInfo: {
          ...state.newWikiInfo,
          slug: action.slug,
          errors: [
            ...nonSlugErrors,
            ...action.errors
          ]
        }
      }
    default:
      return state
  }
}

export default wikiApiReducer

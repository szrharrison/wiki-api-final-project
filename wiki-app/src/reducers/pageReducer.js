const initialState = {
  name: '',
  slug: '',
  datasetType: '',
  relativePath: '',
  fetchPage: {
    isFetching: false
  },
  updatePage: {
    isUpdating: false,
  },
  createPage: {
    isCreating: false,
  },
  deletePage: {
    isDeleting: false
  },
}

function pageReducer(state = initialState, action) {
  switch (action.type) {
    case 'page.REQUEST_PAGE':
      return {
        ...state,
        fetchPage: {
          isFetching: true
        }
      }
    case 'page.RECEIVE_PAGE_ERROR':
      return {
        ...state,
        fetchPage: {
          errors: action.error,
          status: action.status,
          receivedAt: action.receivedAt,
          isFetching: false
        }
      }
    case 'page.RECEIVE_PAGE':
      return {
        ...state,
        name: action.name,
        datasetType: action.datasetType,
        relativePath: action.relativePath,
        slug: action.slug,
        subPages: action.subPages,
        fetchPage: {
          status: action.status,
          receivedAt: action.receivedAt,
          isFetching: false
        }
      }
    case 'page.REQUEST_UPDATE_PAGE':
      return {
        ...state,
        updatePage: {
          isUpdating: true
        }
      }
    case 'page.RECEIVE_UPDATE_PAGE_ERROR':
      return {
        ...state,
        updatePage: {
          errors: action.error,
          status: action.status,
          receivedAt: action.receivedAt,
          isUpdating: false
        }
      }
    case 'page.RECEIVE_UPDATE_PAGE':
      return {
        ...state,
        name: action.name,
        datasetType: action.datasetType,
        relativePath: action.relativePath,
        slug: action.slug,
        subPages: action.subPages,
        updatePage: {
          status: action.status,
          receivedAt: action.receivedAt,
          isUpdating: false
        }
      }
    case 'page.REQUEST_CREATE_PAGE':
      return {
        ...state,
        createPage: {
          isCreating: true
        }
      }
    case 'page.RECEIVE_CREATE_PAGE_ERROR':
      return {
        ...state,
        createPage: {
          errors: action.error,
          status: action.status,
          receivedAt: action.receivedAt,
          isCreating: false
        }
      }
    case 'page.RECEIVE_CREATE_PAGE':
      return {
        ...state,
        name: action.name,
        datasetType: action.datasetType,
        relativePath: action.relativePath,
        slug: action.slug,
        subPages: action.subPages,
        createPage: {
          status: action.status,
          receivedAt: action.receivedAt,
          isCreating: false
        }
      }
    case 'page.REQUEST_DELETE_PAGE':
      return {
        ...state,
        deletePage: {
          isDeleting: true
        }
      }
    case 'page.RECEIVE_DELETE_PAGE_ERROR':
      return {
        ...state,
        deletePage: {
          errors: action.error,
          status: action.status,
          receivedAt: action.receivedAt,
          isDeleting: false
        }
      }
    case 'page.RECEIVE_DELETE_PAGE':
      return {
        ...state,
        name: action.name,
        relativePath: action.relativePath,
        slug: action.slug,
        subPages: action.subPages,
        deletePage: {
          status: action.status,
          receivedAt: action.receivedAt,
          isDeleting: false
        }
      }
    case 'page.SET_SLUG':
      return {
        ...state,
        slug: action.slug
      }
    default:
      return state
  }
}

export default pageReducer

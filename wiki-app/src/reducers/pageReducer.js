const initialState = {
  name: '',
  slug: '',
  datasetType: '',
  dataset: {},
  jsonView: true,
  jsonStatus: 'no errors',
  relativePath: '',
  isFetching: false
}

function pageReducer(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_PAGE':
      return {
        ...state,
        isFetching: true
      }
    case 'RECEIVE_PAGE_ERROR':
      return {
        ...state,
        errors: action.error,
        status: action.status,
        isFetching: false
      }
    case 'RECEIVE_PAGE':
      return {
        ...state,
        name: action.name,
        datasetType: action.datasetType,
        relativePath: action.relativePath,
        status: action.status,
        slug: action.slug,
        subPages: action.subPages,
        isFetching: false
      }
    case 'REQUEST_UPDATE_PAGE':
      return {
        ...state,
        isUpdating: true
      }
    case 'RECEIVE_UPDATE_PAGE_ERROR':
      return {
        ...state,
        errors: action.error,
        status: action.status,
        isUpdating: false
      }
    case 'RECEIVE_UPDATE_PAGE':
      return {
        ...state,
        name: action.name,
        datasetType: action.datasetType,
        relativePath: action.relativePath,
        status: action.status,
        slug: action.slug,
        subPages: action.subPages,
        isUpdating: false
      }
    case 'REQUEST_CREATE_PAGE':
      return {
        ...state,
        isCreating: true
      }
    case 'RECEIVE_CREATE_PAGE_ERROR':
      return {
        ...state,
        errors: action.error,
        status: action.status,
        isCreating: false
      }
    case 'RECEIVE_CREATE_PAGE':
      return {
        ...state,
        name: action.name,
        datasetType: action.datasetType,
        relativePath: action.relativePath,
        status: action.status,
        slug: action.slug,
        subPages: action.subPages,
        isCreating: false
      }
    case 'REQUEST_DELETE_PAGE':
      return {
        ...state,
        isDeleting: true
      }
    case 'RECEIVE_DELETE_PAGE_ERROR':
      return {
        ...state,
        errors: action.error,
        status: action.status,
        isDeleting: false
      }
    case 'RECEIVE_DELETE_PAGE':
      return {
        ...state,
        name: action.name,
        relativePath: action.relativePath,
        status: action.status,
        slug: action.slug,
        subPages: action.subPages,
        isDeleting: false
      }
    case 'SET_SLUG':
      return {
        ...state,
        slug: action.slug
      }
    default:
      return state
  }
}

export default pageReducer

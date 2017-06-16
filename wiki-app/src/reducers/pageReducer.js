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
        parentPath: action.parentPath,
        subPageSlugs: action.subPageSlugs,
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
        parentPath: action.parentPath,
        subPageSlugs: action.subPageSlugs,
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
        parentPath: action.parentPath,
        subPageSlugs: action.subPageSlugs,
        isCreating: false
      }
    case 'TOGGLE_JSON':
      return {
        ...state,
        jsonView: !state.jsonView
      }
    default:
      return state
  }
}

export default pageReducer

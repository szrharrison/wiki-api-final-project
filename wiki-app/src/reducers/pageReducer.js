const initialState = {
  name: '',
  slug: '',
  datasetType: '',
  relativePath: '',
  isFetching: false
}

function pageReducer(state = initialState, action) {
  switch (action.type) {
    case 'page.REQUEST_PAGE':
      return {
        ...state,
        isFetching: true
      }
    case 'page.RECEIVE_PAGE_ERROR':
      return {
        ...state,
        errors: action.error,
        status: action.status,
        isFetching: false
      }
    case 'page.RECEIVE_PAGE':
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
    case 'page.REQUEST_UPDATE_PAGE':
      return {
        ...state,
        isUpdating: true
      }
    case 'page.RECEIVE_UPDATE_PAGE_ERROR':
      return {
        ...state,
        errors: action.error,
        status: action.status,
        isUpdating: false
      }
    case 'page.RECEIVE_UPDATE_PAGE':
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
    case 'page.REQUEST_CREATE_PAGE':
      return {
        ...state,
        isCreating: true
      }
    case 'page.RECEIVE_CREATE_PAGE_ERROR':
      return {
        ...state,
        errors: action.error,
        status: action.status,
        isCreating: false
      }
    case 'page.RECEIVE_CREATE_PAGE':
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
    case 'page.REQUEST_DELETE_PAGE':
      return {
        ...state,
        isDeleting: true
      }
    case 'page.RECEIVE_DELETE_PAGE_ERROR':
      return {
        ...state,
        errors: action.error,
        status: action.status,
        isDeleting: false
      }
    case 'page.RECEIVE_DELETE_PAGE':
      return {
        ...state,
        name: action.name,
        relativePath: action.relativePath,
        status: action.status,
        slug: action.slug,
        subPages: action.subPages,
        isDeleting: false
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

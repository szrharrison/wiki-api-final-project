const initialState = {
  slug: '',
  dataset: {},
  jsonStatus: 'no errors',
  parentPath: '',
  isFetching: false,
  isUpdating: false
}

function datasetReducer(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_DATASET':
      return {
        ...state,
        isFetching: true
      }
    case 'RECEIVE_DATASET_ERROR':
      return {
        ...state,
        errors: action.error,
        status: action.status,
        isFetching: false
      }
    case 'RECEIVE_DATASET':
      return {
        ...state,
        dataset: action.dataset,
        status: action.status,
        parentPath: action.parentPath,
        parent: action.parent,
        subPageSlugs: action.subPageSlugs,
        datasetType: action.datasetType,
        name: action.name,
        isFetching: false
      }
    case 'REQUEST_UPDATE_DATASET':
      return {
        ...state,
        isUpdating: true
      }
    case 'RECEIVE_UPDATE_DATASET_ERROR':
      return {
        ...state,
        errors: action.error,
        status: action.status,
        isUpdating: false
      }
    case 'RECEIVE_UPDATE_DATASET':
      return {
        ...state,
        dataset: action.dataset,
        status: action.status,
        parentPath: action.parentPath,
        parent: action.parent,
        subPageSlugs: action.subPageSlugs,
        datasetType: action.datasetType,
        name: action.name,
        isUpdating: false
      }
    case 'UPDATE_DATASET_ERROR':
      return {
        ...state,
        jsonStatus: 'error in json',
        error: action.error
      }
    case 'UPDATE_DATASET':
      return {
        ...state,
        jsonStatus: 'no errors',
        dataset: action.dataset,
      }
    default:
      return state
  }
}

export default datasetReducer

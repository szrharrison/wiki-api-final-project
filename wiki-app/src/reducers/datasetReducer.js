const initialState = {
  slug: '',
  dataset: {},
  parentPath: '',
  isFetching: false,
  isUpdating: false
}

function datasetReducer(state = initialState, action) {
  switch (action.type) {
    case 'dataset.REQUEST_DATASET':
      return {
        ...state,
        isFetching: true
      }
    case 'dataset.RECEIVE_DATASET_ERROR':
      return {
        ...state,
        errors: action.error,
        status: action.status,
        isFetching: false
      }
    case 'dataset.RECEIVE_DATASET':
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
    case 'dataset.REQUEST_UPDATE_DATASET':
      return {
        ...state,
        isUpdating: true
      }
    case 'dataset.RECEIVE_UPDATE_DATASET_ERROR':
      return {
        ...state,
        errors: action.error,
        status: action.status,
        isUpdating: false
      }
    case 'dataset.RECEIVE_UPDATE_DATASET':
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
    case 'dataset.UPDATE_DATASET':
      return {
        ...state,
        dataset: action.dataset
      }
    default:
      return state
  }
}

export default datasetReducer

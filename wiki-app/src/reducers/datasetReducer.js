const initialState = {
  data: {},
  fetchDataset: {
    isFetching: false
  },
  updateDataset: {
    isUpdating: false
  }
}

function datasetReducer(state = initialState, action) {
  switch (action.type) {
    case 'dataset.REQUEST_DATASET':
      return {
        ...state,
        fetchDataset: {
          isFetching: true
        }
      }
    case 'dataset.RECEIVE_DATASET_ERROR':
      return {
        ...state,
        fetchDataset: {
          errors: action.error,
          status: action.status,
          receivedAt: action.receivedAt,
          isFetching: false
        }
      }
    case 'dataset.RECEIVE_DATASET':
      return {
        ...state,
        data: action.data,
        fetchDataset: {
          status: action.status,
          receivedAt: action.receivedAt,
          isFetching: false
        }
      }
    case 'dataset.REQUEST_UPDATE_DATASET':
      return {
        ...state,
        updateDataset: {
          isUpdating: true
        }
      }
    case 'dataset.RECEIVE_UPDATE_DATASET_ERROR':
      return {
        ...state,
        updateDataset: {
          errors: action.error,
          status: action.status,
          receivedAt: action.receivedAt,
          isUpdating: false
        }
      }
    case 'dataset.RECEIVE_UPDATE_DATASET':
      return {
        ...state,
        data: action.data,
        updateDataset: {
          status: action.status,
          receivedAt: action.receivedAt,
          isUpdating: false
        }
      }
    case 'dataset.UPDATE_DATASET':
      return {
        ...state,
        data: action.data
      }
    default:
      return state
  }
}

export default datasetReducer

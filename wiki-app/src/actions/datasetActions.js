import { getDataset, updateDatasetRequest } from '../api'

export function fetchDataset(relative_path) {
  return function (dispatch) {
    dispatch(requestDataset())

    return getDataset(relative_path)
      .then( data => {
        if(data.error) {
          dispatch(fetchDatasetError(data.error))
        } else {
          dispatch(receiveDataset(data))
          return data
        }
      })
  }
}

function requestDataset() {
  return {
    type: 'REQUEST_DATASET'
  }
}

function fetchDatasetError(error) {
  return {
    type: 'RECEIVE_DATASET_ERROR',
    status: 'error',
    error: error,
    receivedAt: Date.now()
  }
}

function receiveDataset(data) {
  return {
    type: 'RECEIVE_DATASET',
    dataset: data.data,
    parentPath: data.parent_path,
    status: 'success',
    receivedAt: Date.now()
  }
}

export function fetchUpdateDataset(dataset, relativePath) {
  return function (dispatch) {
    dispatch(requestUpdateDataset())

    return updateDatasetRequest(dataset, relativePath)
      .then( data => {
        if(data.error) {
          dispatch(fetchUpdateDatasetError(data.error))
        } else {
          dispatch(receiveUpdateDataset(data))
          return data
        }
      })
  }
}

function requestUpdateDataset() {
  return {
    type: 'REQUEST_UPDATE_DATASET'
  }
}

function fetchUpdateDatasetError(error) {
  return {
    type: 'RECEIVE_UPDATE_DATASET_ERROR',
    status: 'error',
    error: error,
    receivedAt: Date.now()
  }
}

function receiveUpdateDataset(data) {
  return {
    type: 'RECEIVE_UPDATE_DATASET',
    dataset: data.data,
    parentPath: data.parent_path,
    status: 'success',
    receivedAt: Date.now()
  }
}

export function updateDataset(dataString) {
  return function (dispatch) {
    let error = false
    let data
    try {
      data = JSON.parse(dataString)
    } catch (e) {
      error = e
      dispatch(updateDatasetError(e))
    }
    if(!error) {
      dispatch(updateDatasetSuccess(data))
    }
  }
}

function updateDatasetError(error, data) {
  return {
    type: 'UPDATE_DATASET_ERROR',
    error,
    jsonStatus: 'syntax error'
  }
}

function updateDatasetSuccess(data) {
  return {
    type: 'UPDATE_DATASET',
    dataset: data,
    jsonStatus: 'parseable'
  }
}

import { getDataset, updateDatasetRequest } from '../api'

export function fetchDataset(relativePath) {
  return function (dispatch) {
    dispatch(requestDataset())

    return getDataset(relativePath)
      .then( data => {
        if(!data || !data.error) {
          dispatch(receiveDataset(data, relativePath))
          return data
        } else {
          dispatch(fetchDatasetError(data.error))
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

function receiveDataset(data, relativePath) {
  return {
    type: 'RECEIVE_DATASET',
    dataset: data.data,
    parentPath: relativePath,
    status: 'success',
    receivedAt: Date.now()
  }
}

export function fetchUpdateDataset(dataset, relativePath) {
  return function (dispatch) {
    dispatch(requestUpdateDataset())

    return updateDatasetRequest(dataset, relativePath)
      .then( data => {
        if(!data || !data.error) {
          dispatch(receiveUpdateDataset(data, relativePath))
          return data
        } else {
          dispatch(fetchUpdateDatasetError(data.error))
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

function receiveUpdateDataset(data, parentPath) {
  return {
    type: 'RECEIVE_UPDATE_DATASET',
    dataset: data.data,
    parentPath: parentPath,
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

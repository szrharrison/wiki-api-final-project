import { getDataset, updateDatasetRequest } from '../api'

export function fetchDataset(relativePath) {
  return function (dispatch) {
    dispatch(requestDataset())

    return getDataset(relativePath)
      .then( data => {
        if(!data || !data.error) {
          dispatch(receiveDataset(data))
          return data
        } else {
          dispatch(fetchDatasetError(data.error))
        }
      })
  }
}

function requestDataset() {
  return {
    type: 'dataset.REQUEST_DATASET'
  }
}

function fetchDatasetError(error) {
  return {
    type: 'dataset.RECEIVE_DATASET_ERROR',
    status: 'error',
    error: error,
    receivedAt: Date.now()
  }
}

function receiveDataset(data) {
  return {
    type: 'dataset.RECEIVE_DATASET',
    data: data.data,
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
          dispatch(receiveUpdateDataset(data))
          return data
        } else {
          dispatch(fetchUpdateDatasetError(data.error))
        }
      })
  }
}

function requestUpdateDataset() {
  return {
    type: 'dataset.REQUEST_UPDATE_DATASET'
  }
}

function fetchUpdateDatasetError(error) {
  return {
    type: 'dataset.RECEIVE_UPDATE_DATASET_ERROR',
    status: 'error',
    error: error,
    receivedAt: Date.now()
  }
}

function receiveUpdateDataset(data, parentPath) {
  return {
    type: 'dataset.RECEIVE_UPDATE_DATASET',
    data: data.data,
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

function updateDatasetError(error) {
  console.log(error.message)
  return {
    type: 'pageForm.UPDATE_DATASET_ERROR',
    error: error.message.replace(/at position \d+$/,'')
  }
}

function updateDatasetSuccess(data) {
  return function (dispatch) {
    dispatch({
      type: 'dataset.UPDATE_DATASET',
      data
    })

    dispatch({
      type: 'pageForm.UPDATE_DATASET_ERROR',
      error: 'no errors'
    })
  }
}

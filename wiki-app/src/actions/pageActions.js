import { getPage } from '../api'

export function toggleJson() {
  return {
    type: 'TOGGLE_JSON'
  }
}

export function receivePage(options) {
  return {
    type: 'RECEIVE_PAGE',
    title: options.name,
    id: options.id,
    dataset_type: options.data_type,
    dataset: options.dataset,
    relative_path: options.relative_path,
    status: 'success',
    receivedAt: Date.now()
  }
}

export function fetchPage(relative_path) {
  return function (dispatch) {
    dispatch(requestPage())

    return getPage(relative_path)
      .then( data => {
        if(data.error) {
          dispatch(fetchPageError(data.error))
        } else {
          dispatch(receivePage(data))
          return data
        }
      })
  }
}

function fetchPageError(error) {
  return {
    type: 'RECEIVE_PAGE',
    status: 'error',
    error: error,
    receivedAt: Date.now()
  }
}

function requestPage() {
  return {
    type: 'REQUEST_PAGE'
  }
}

export function updateDataset(dataString) {
  return function (dispatch) {
    let error = false
    let data
    try {
      data = JSON.parse(dataString)
    } catch(err) {
      error = err
      dispatch({
        type: 'UPDATE_DATASET',
        status: 'error',
        error
      })
    }
    if(!error) {
      dispatch({
        type: 'UPDATE_DATASET',
        data
      })
    }
  }
}

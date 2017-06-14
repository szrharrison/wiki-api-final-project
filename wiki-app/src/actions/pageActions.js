import { getPage, createPage, updatePage, deletePage } from '../api'

export function toggleJson() {
  return {
    type: 'TOGGLE_JSON'
  }
}

function receivePage(data) {
  return {
    type: 'RECEIVE_PAGE',
    title: data.name,
    id: data.id,
    dataset_type: data.data_type,
    dataset: data.dataset,
    relative_path: data.relative_path,
    sub_page_slugs: data.sub_page_slugs,
    parentPath: data.parent,
    slug: data.slug,
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

export function fetchUpdatePage(page) {
  return function (dispatch) {
    dispatch(requestUpdatePage())

    return updatePage(page)
      .then( data => {
        if(data.error) {
          dispatch(fetchUpdatePageError(data.error))
        } else {
          dispatch(receiveUpdatePage(data))
          return data
        }
      })
  }
}

function fetchUpdatePageError(error) {
  return {
    type: 'RECEIVE_UPDATE_PAGE_ERROR',
    status: 'error',
    error: error,
    receivedAt: Date.now()
  }
}

function receiveUpdatePage(data) {
  return {
    type: 'RECEIVE_UPDATE_PAGE',
    title: data.name,
    id: data.id,
    dataset_type: data.data_type,
    dataset: data.dataset,
    relative_path: data.relative_path,
    sub_page_slugs: data.sub_page_slugs,
    parentPath: data.parent,
    slug: data.slug,
    status: 'success',
    receivedAt: Date.now()
  }
}


function requestUpdatePage() {
  return {
    type: 'REQUEST_UPDATE_PAGE'
  }
}

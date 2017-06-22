import { getPage, createPage, updatePage, deletePage, createWikiPage } from '../api'

export function toggleJson() {
  return {
    type: 'TOGGLE_JSON'
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

function requestPage() {
  return {
    type: 'REQUEST_PAGE'
  }
}

function fetchPageError(error) {
  return {
    type: 'RECEIVE_PAGE_ERROR',
    status: 'error',
    error: error,
    receivedAt: Date.now()
  }
}

function receivePage(data) {
  return {
    type: 'RECEIVE_PAGE',
    name: data.name,
    datasetType: data.data_type,
    relativePath: data.relative_path,
    subPages: data.sub_pages,
    slug: data.slug,
    status: 'success',
    receivedAt: Date.now()
  }
}

export function fetchUpdatePage(page, relativePath) {
  return function (dispatch) {
    dispatch(requestUpdatePage())

    return updatePage(page, relativePath)
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

function requestUpdatePage() {
  return {
    type: 'REQUEST_UPDATE_PAGE'
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
    name: data.name,
    datasetType: data.data_type,
    relativePath: data.relative_path,
    subPages: data.sub_pages,
    slug: data.slug,
    status: 'success',
    receivedAt: Date.now()
  }
}

export function fetchCreatePage(page, relativePath) {
  return function (dispatch) {
    dispatch(requestCreatePage())

    return createPage(page, relativePath)
      .then( data => {
        if(data.error) {
          dispatch(fetchCreatePageError(data.error))
        } else {
          dispatch(receiveCreatePage(data))
          return data
        }
      })
  }
}

function requestCreatePage() {
  return {
    type: 'REQUEST_CREATE_PAGE'
  }
}

function fetchCreatePageError(error) {
  return {
    type: 'RECEIVE_CREATE_PAGE_ERROR',
    status: 'error',
    error: error,
    receivedAt: Date.now()
  }
}

function receiveCreatePage(data) {
  return {
    type: 'RECEIVE_CREATE_PAGE',
    name: data.name,
    datasetType: data.data_type,
    relativePath: data.relative_path,
    subPages: data.sub_pages,
    slug: data.slug,
    status: 'success',
    receivedAt: Date.now()
  }
}

export function fetchCreateWikiPage(page, wikiSlug) {
  return function (dispatch) {
    dispatch(requestCreatePage())

    return createWikiPage(page, wikiSlug)
      .then( data => {
        if(data.error) {
          dispatch(fetchCreatePageError(data.error))
        } else {
          dispatch(receiveCreatePage(data))
          return data
        }
      })
  }
}

export function fetchDeletePage(relativePath) {
  return function (dispatch) {
    dispatch(requestDeletePage())

    return deletePage(relativePath)
      .then( data => {
        if(data.error) {
          dispatch(fetchDeletePageError(data.error))
        } else {
          dispatch(receiveDeletePage(data))
          return data
        }
      })
  }
}

function requestDeletePage() {
  return {
    type: 'REQUEST_DELETE_PAGE'
  }
}

function fetchDeletePageError(error) {
  return {
    type: 'RECEIVE_DELETE_PAGE_ERROR',
    status: 'error',
    error: error,
    receivedAt: Date.now()
  }
}

function receiveDeletePage(data) {
  return {
    type: 'RECEIVE_DELETE_PAGE',
    name: data.name,
    relativePath: data.relative_path,
    subPages: data.sub_pages,
    status: 'success',
    receivedAt: Date.now()
  }
}

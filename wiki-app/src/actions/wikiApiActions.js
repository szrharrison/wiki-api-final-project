import { getWikiApis } from '../api'
import { getWikiApi } from '../api'

export function viewingWiki(boolean) {
  return {
    type: 'VIEWING_WIKI',
    viewingWiki: boolean
  }
}

export function fetchWikiApis() {
  return function (dispatch) {
    dispatch(requestWikiApis())

    return getWikiApis()
      .then( data => {
        if(data.error) {
          dispatch(fetchWikisError(data.error))
        } else {
          dispatch(receiveWikiApis(data))
          return data
        }
      })
  }
}

function requestWikiApis() {
  return {
    type: 'REQUEST_WIKI_APIS'
  }
}

function fetchWikisError(error) {
  return {
    type: 'RECEIVE_WIKI_APIS_ERROR',
    status: 'error',
    error
  }
}

function receiveWikiApis(apiWikis) {
  return {
    type: 'RECEIVE_WIKI_APIS',
    apiWikis
  }
}

export function fetchWikiApi(slug) {
  return function (dispatch) {
    dispatch(requestWikiApi())

    return getWikiApi(slug)
      .then( data => {
        if(data.error) {
          dispatch(fetchWikiError(data.error))
        } else {
          dispatch(receiveWikiApi(data))
          return data
        }
      })
  }
}

function requestWikiApi() {
  return {
    type: 'REQUEST_WIKI_API'
  }
}

function fetchWikiError(error) {
  return {
    type: 'RECEIVE_WIKI_API_ERROR',
    status: 'error',
    error
  }
}

function receiveWikiApi(apiWiki) {
  return {
    type: 'RECEIVE_WIKI_API',
    apiWiki
  }
}

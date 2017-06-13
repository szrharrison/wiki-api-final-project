import { getWikiApis } from '../api'
import { getWikiApi } from '../api'

function requestWikiApis() {
  return {
    type: 'REQUEST_WIKI_APIS'
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

function receiveWikiApis(apiWikis) {
  return {
    type: 'RECEIVE_WIKI_APIS',
    apiWikis
  }
}

function fetchWikisError(error) {
  return {
    type: 'RECEIVE_WIKI_APIS_ERROR',
    status: 'error',
    error
  }
}

function requestWikiApi() {
  return {
    type: 'REQUEST_WIKI_API'
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

function receiveWikiApi(apiWiki) {
  return {
    type: 'RECEIVE_WIKI_API',
    apiWiki
  }
}

function fetchWikiError(error) {
  return {
    type: 'RECEIVE_WIKI_API_ERROR',
    status: 'error',
    error
  }
}

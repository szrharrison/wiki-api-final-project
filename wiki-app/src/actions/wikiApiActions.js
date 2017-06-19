import { getWikiApis, getWikiApi  } from '../api'

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

function receiveWikiApis(wikiApis) {
  return {
    type: 'RECEIVE_WIKI_APIS',
    wikiApis
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

function receiveWikiApi(wikiApi) {
  return {
    type: 'RECEIVE_WIKI_API',
    name: wikiApi.name,
    slug: wikiApi.slug,
    pages: wikiApi.pages
  }
}

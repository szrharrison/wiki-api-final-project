import { getWikiApis, getWikiApi, createNewWikiApi, updateWikiApi  } from '../api'

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
    type: 'wikiApi.REQUEST_WIKI_APIS'
  }
}

function fetchWikisError(error) {
  return {
    type: 'wikiApi.RECEIVE_WIKI_APIS_ERROR',
    status: 'error',
    error: error.map(err => err.split(' : '))
  }
}

function receiveWikiApis(wikiApis) {
  return {
    type: 'wikiApi.RECEIVE_WIKI_APIS',
    status: 'success',
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
    type: 'wikiApi.REQUEST_WIKI_API'
  }
}

function fetchWikiError(error) {
  return {
    type: 'wikiApi.RECEIVE_WIKI_API_ERROR',
    status: 'error',
    error: error.map(err => err.split(' : '))
  }
}

function receiveWikiApi(wikiApi) {
  return {
    type: 'wikiApi.RECEIVE_WIKI_API',
    status: 'success',
    name: wikiApi.name,
    slug: wikiApi.slug,
    pages: wikiApi.pages
  }
}

export function createWikiApi(name) {
  return function (dispatch) {
    dispatch(requestCreateWikiApi())

    return createNewWikiApi(name)
      .then( data => {
        if(data.error) {
          dispatch(createWikiError(data.error))
        } else {
          dispatch(receiveCreateWikiApi(data))
          return data
        }
      })
  }
}

function requestCreateWikiApi() {
  return {
    type: 'wikiApi.REQUEST_CREATE_WIKI_API'
  }
}

function createWikiError(error) {
  return {
    type: 'wikiApi.CREATE_WIKI_API_ERROR',
    status: 'error',
    error: error.map(err => err.split(' : '))
  }
}

function receiveCreateWikiApi(wikiApi) {
  return {
    type: 'wikiApi.RECEIVE_CREATE_WIKI_API',
    status: 'success',
    name: wikiApi.name,
    slug: wikiApi.slug
  }
}

export function fetchUpdateWikiApi(wikiInfo, slug) {
  return function (dispatch) {
    dispatch(requestUpdateWikiApi())

    return updateWikiApi(wikiInfo, slug)
      .then( data => {
        if(data.error) {
          dispatch(updateWikiError(data.error))
        } else {
          dispatch(receiveUpdateWikiApi(data))
          return data
        }
      })
  }
}

function requestUpdateWikiApi() {
  return {
    type: 'wikiApi.REQUEST_UPDATE_WIKI_API'
  }
}

function updateWikiError(error) {
  return {
    type: 'wikiApi.UPDATE_WIKI_API_ERROR',
    status: 'error',
    error: error.map(err => err.split(' : '))
  }
}

function receiveUpdateWikiApi(wikiApi) {
  return {
    type: 'wikiApi.RECEIVE_UPDATE_WIKI_API',
    status: 'success',
    name: wikiApi.name,
    slug: wikiApi.slug,
    pages: wikiApi.pages
  }
}

export function setNewWikiInfo(wikiInfo) {
  let errors = []
  if(wikiInfo.name === '') {
    errors.push(['Name', 'All wikis must have a name'])
  }
  if(wikiInfo.slug === '') {
    errors.push(['Slug', 'All wikis must have a slug'])
  }
  if(wikiInfo.slug === 'new' || wikiInfo.slug === 'dataset' || wikiInfo.slug === 'api') {
    errors = [['Slug', `"${wikiInfo.slug}" is a reserved slug. If your new name results in that slug, then choose a different name for now and change the name of your wiki later.`]]
  }
  if(!errors.length) {
    errors = [[null, null]]
  }
  return {
    type: 'wikiApi.SET_NEW_WIKI_INFO',
    name: wikiInfo.name,
    slug: wikiInfo.slug,
    errors
  }
}

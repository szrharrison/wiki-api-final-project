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


export function setNewWikiInfo(newWikiInfo) {
  return function(dispatch) {
    dispatch(setNewWikiName(newWikiInfo.name))
    dispatch(setNewWikiSlug(newWikiInfo.slug))
  }
}

export function setNewWikiName(wikiName) {
  let errors = []
  if(wikiName === '') {
    errors.push(['Name', 'All wikis must have a name'])
  }
  if(!errors.length) {
    errors = [['Name', null]]
  }
  return {
    type: 'wikiApi.SET_NEW_WIKI_NAME',
    name: wikiName,
    errors
  }
}

export function setNewWikiSlug(wikiSlug) {
  const reservedSlugs = ['new', 'api']
  let errors = []
  const slug = wikiSlug.trim()
  .toLowerCase()
  .replace(/[\s./\\]/g, '-')
  .replace(/[^\w-]/g, '')
  .replace(/[-]{2,}/g, '-')
  .replace(/[_]{2,}/g, '_')
  .replace(/[-_]{2,}/g, '-')
  .replace(/^[-_]+/, "")
  .replace(/[-_]+$/, "")
  if(slug === '') {
    errors.push(['Slug', 'All wikis must have a slug'])
  }
  if(reservedSlugs.includes(slug)) {
    errors.push(['Slug', `"${slug}" is a reserved slug.`])
  }
  if(slug !== wikiSlug) {
    errors.push(['Slug', 'Invalid slug'])
  }
  if(!errors.length) {
    errors = [['Slug', null]]
  }
  return {
    type: 'wikiApi.SET_NEW_WIKI_SLUG',
    slug: wikiSlug,
    errors
  }
}

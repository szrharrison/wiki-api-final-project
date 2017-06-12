import { getWikiApis } from '../api'

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
    type: 'RECEIVE_WIKI_APIS',
    status: 'error',
    error
  }
}

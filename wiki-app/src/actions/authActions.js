import { logIn, refreshAccount } from '../api'

export function logInAction(username) {
  return {
    type: 'LOG_IN',
    username: username
  }
}

export function logOut() {
  return function (dispatch) {
    localStorage.clear()
    dispatch({
      type: 'LOG_OUT'
    })
  }
}

export function fetchLogIn(account, history) {
  return function (dispatch) {

    dispatch(requestLogIn())

    return logIn(account)
      .then( data => {
        if(data.error) {
          dispatch(logInError(data.error))
        } else {
          dispatch(receiveLogIn(data))
          history.push('/account')
          return data
        }
      })
  }
}

export function logInError( error ) {
  return {
    type: 'RECEIVE_LOG_IN_ERROR',
    status: 'error',
    error,
    receivedAt: Date.now()
  }
}

export function requestLogIn() {
  return {
    type: 'REQUEST_LOG_IN'
  }
}

export function receiveLogIn( data ) {
  return function (dispatch) {
    localStorage.setItem('jwt', data.token)
    localStorage.setItem('user', data.account.username)
    dispatch(logInAction(data.account.username))
    dispatch({
      type: 'RECEIVE_LOG_IN',
      username: data.account.username,
      firstName: data.account.first_name,
      lastName: data.account.last_name,
      status: 'success',
      receivedAt: Date.now()
    })
  }
}

export function fetchAccountRefresh() {
  return function (dispatch) {

    dispatch(requestAccountRefresh())

    return refreshAccount()
      .then( data => {
        if(data.error) {
          dispatch(accountRefreshError(data.error))
        } else {
          dispatch(receiveAccountRefresh(data))
          return data
        }
      })
  }
}

export function requestAccountRefresh() {
  return {
    type: 'REQUEST_ACCOUNT_REFRESH'
  }
}

export function accountRefreshError( error ) {
  return {
    type: 'RECEIVE_ACCOUNT_REFRESH_ERROR',
    status: 'error',
    error,
    receivedAt: Date.now()
  }
}

export function receiveAccountRefresh( data ) {
  return function (dispatch) {
    dispatch(logInAction(data.username))
    dispatch({
      type: 'RECEIVE_ACCOUNT_REFRESH',
      status: 'success',
      username: data.username,
      firstName: data.first_name,
      lastName: data.last_name,
      receivedAt: Date.now()
    })
  }
}

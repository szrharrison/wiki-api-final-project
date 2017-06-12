import { logIn } from '../api'

export function logInAction() {
  return {
    type: 'LOG_IN'
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
    type: 'RECEIVE_LOG_IN',
    status: 'error',
    error,
    receivedAt: Date.now()
  }
}

export function requestLogIn( account ) {
  return {
    type: 'REQUEST_LOG_IN'
  }
}

export function receiveLogIn( data ) {
  return function (dispatch) {
    localStorage.setItem('jwt', data.token)
    localStorage.setItem('user', data.account.username)
    dispatch(logInAction())
    dispatch({
      type: 'RECEIVE_LOG_IN',
      status: 'success',
      username: data.account.username,
      receivedAt: Date.now()
    })
  }
}

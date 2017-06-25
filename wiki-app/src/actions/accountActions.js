import { signUp, updateUser, logIn, refreshAccount } from '../api'

export function logOut() {
  localStorage.clear()
  return {
    type: 'account.LOG_OUT'
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

function requestLogIn() {
  return {
    type: 'account.REQUEST_LOG_IN'
  }
}

function logInError( error ) {
  return {
    type: 'account.RECEIVE_LOG_IN_ERROR',
    status: 'error',
    error,
    receivedAt: Date.now()
  }
}

function receiveLogIn( data ) {
  localStorage.setItem('jwt', data.token)
  localStorage.setItem('user', data.account.username)
  return {
    type: 'account.RECEIVE_LOG_IN',
    userInfo: {
      username: data.account.username,
      firstName: data.account.first_name,
      lastName: data.account.last_name
    },
    status: 'success',
    receivedAt: Date.now()
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

function requestAccountRefresh() {
  return {
    type: 'account.REQUEST_ACCOUNT_REFRESH'
  }
}

function accountRefreshError( error ) {
  return {
    type: 'account.RECEIVE_ACCOUNT_REFRESH_ERROR',
    status: 'error',
    error,
    receivedAt: Date.now()
  }
}

function receiveAccountRefresh( data ) {
  return {
    type: 'account.RECEIVE_ACCOUNT_REFRESH',
    status: 'success',
    userInfo: {
      username: data.username,
      firstName: data.first_name,
      lastName: data.last_name
    },
    receivedAt: Date.now()
  }
}


export function fetchSignUp(account, history) {
  return function (dispatch) {
    dispatch(postSignUp())

    return signUp(account)
      .then( data => {
        if(!!data.error) {
          dispatch(signUpError(data.error))
        } else {
          dispatch(receiveSignUp(data))
          history.push('/account')
          return data
        }
      })
  }
}

function postSignUp() {
  return {
    type: 'account.POST_SIGN_UP'
  }
}

function signUpError(error) {
  return {
    type: 'account.RECEIVE_SIGN_UP_ERROR',
    status: 'error',
    error,
    receivedAt: Date.now()
  }
}

function receiveSignUp(data) {
  localStorage.setItem('jwt', data.token)
  localStorage.setItem('user', data.account.username)
  return {
    type: 'account.RECEIVE_SIGN_UP',
    status: 'success',
    userInfo: {
      username: data.account.username,
      firstName: data.account.first_name,
      lastName: data.account.last_name
    },
    receivedAt: Date.now()
  }
}

export function fetchUpdateUser(newAccount, username) {
  return function (dispatch) {
    dispatch(fetchUpdate())
    const account = {
      username: newAccount.username,
      first_name: newAccount.firstName,
      last_name: newAccount.lastName
    }
    return updateUser(account, username)
      .then( data => {
        if(data.error) {
          dispatch(updateUserError(data.error))
        } else {
          dispatch(receiveUpdateUser(data))
          return data
        }
      })
  }
}

function fetchUpdate() {
  return {
    type: 'account.FETCH_UPDATE_USER'
  }
}

function updateUserError(error) {
  return {
    type: 'account.RECEIVE_UPDATE_USER_ERROR',
    status: 'error',
    error,
    receivedAt: Date.now()
  }
}

function receiveUpdateUser(data) {
  localStorage.setItem('user', data.username)
  return {
    type: 'account.RECEIVE_UPDATE_USER',
    status: 'success',
    userInfo: {
      username: data.username,
      firstName: data.first_name,
      lastName: data.last_name
    },
    receivedAt: Date.now()
  }
}

export function setNewUserValues(newUserInfo) {
  return {
    type: 'account.SET_NEW_USER_VALUES',
    newUserInfo
  }
}

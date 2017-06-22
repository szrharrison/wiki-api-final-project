import { signUp, updateUser } from '../api'
import { logInAction } from './authActions'

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
  return function (dispatch) {
    localStorage.setItem('jwt', data.token)
    localStorage.setItem('user', data.account.username)
    dispatch(logInAction())
    dispatch({
      type: 'account.RECEIVE_SIGN_UP',
      status: 'success',
      userInfo: {
        username: data.account.username,
        firstName: data.account.first_name,
        lastName: data.account.last_name
      },
      receivedAt: Date.now()
    })
    dispatch({
      type: 'auth.RECEIVE_SIGN_UP',
      userInfo: {
        username: data.account.username,
        firstName: data.account.first_name,
        lastName: data.account.last_name
      }
    })
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
        if(!!data.error) {
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
  return function (dispatch) {
    localStorage.setItem('user', data.username)
    dispatch(logInAction())
    dispatch({
      type: 'account.RECEIVE_UPDATE_USER',
      status: 'success',
      userInfo: {
        username: data.account.username,
        firstName: data.account.first_name,
        lastName: data.account.last_name
      },
      receivedAt: Date.now()
    })
    dispatch({
      type: 'auth.RECEIVE_UPDATE_USER',
      userInfo: {
        username: data.account.username,
        firstName: data.account.first_name,
        lastName: data.account.last_name
      }
    })
  }
}

export function setNewUserValues(newUserInfo) {
  return {
    type: 'account.SET_NEW_USER_VALUES',
    newUserInfo
  }
}

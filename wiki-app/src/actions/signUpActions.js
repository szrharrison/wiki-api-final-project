import { signUp } from '../api'
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
    type: 'POST_SIGN_UP'
  }
}

function signUpError(error) {
  return {
    type: 'RECEIVE_SIGN_UP',
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
      type: 'RECEIVE_SIGN_UP',
      status: 'success',
      username: data.account.username,
      receivedAt: Date.now()
    })
  }
}

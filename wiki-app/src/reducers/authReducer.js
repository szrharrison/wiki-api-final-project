const initialState = {
  isFetching: false,
  isRefreshing: false,
  loggedIn: false,
  userInfo: {
    username: '',
    firstName: '',
    lastName: ''
  }
}

function authReducer(state = initialState, action) {
  switch (action.type) {
    case 'auth.LOG_IN':
      return {
        ...state,
        loggedIn: true,
        userInfo: {
          ...state.userInfo,
          username: action.username
        }
      }
    case 'auth.LOG_OUT':
      return {
        ...state,
        loggedIn: false,
        userInfo: {
          username: '',
          firstName: '',
          lastName: ''
        }
      }
    case 'auth.REQUEST_LOG_IN':
      return {
        ...state,
        isFetching: true
      }
    case 'auth.RECEIVE_LOG_IN_ERROR':
      return {
        ...state,
        isFetching: false,
        status: action.status,
        receivedAt: action.receivedAt,
        error: action.error
      }
    case 'auth.RECEIVE_LOG_IN':
      return {
        ...state,
        isFetching: false,
        status: action.status,
        userInfo: action.userInfo,
        receivedAt: action.receivedAt
      }
    case 'auth.REQUEST_ACCOUNT_REFRESH':
      return {
        ...state,
        isRefreshing: true
      }
    case 'auth.RECEIVE_ACCOUNT_REFRESH_ERROR':
      return {
        ...state,
        isRefreshing: false,
        status: action.status,
        receivedAt: action.receivedAt,
        error: action.error
      }
    case 'auth.RECEIVE_ACCOUNT_REFRESH':
      return {
        ...state,
        isRefreshing: false,
        status: action.status,
        userInfo: action.userInfo,
        receivedAt: action.receivedAt
      }
    case 'auth.RECEIVE_SIGN_UP':
      return {
        ...state,
        userInfo: action.userInfo
      }
    case 'auth.RECEIVE_UPDATE_USER':
      return {
        ...state,
        userInfo: action.userInfo
      }
    default:
      return state
  }
}

export default authReducer

const initialState = {
  isFetching: false,
  isRefreshing: false,
  loggedIn: false,
}

function authReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOG_IN':
      return {
        ...state,
        loggedIn: true,
        username: action.username
      }
    case 'LOG_OUT':
      return {
        ...state,
        loggedIn: false,
        username: ''
      }
    case 'REQUEST_LOG_IN':
      return {
        ...state,
        isFetching: true
      }
    case 'RECEIVE_LOG_IN_ERROR':
      return {
        ...state,
        isFetching: false,
        status: action.status,
        receivedAt: action.receivedAt,
        error: action.error
      }
    case 'RECEIVE_LOG_IN':
      return {
        ...state,
        isFetching: false,
        status: action.status,
        receivedAt: action.receivedAt
      }
    case 'REQUEST_ACCOUNT_REFRESH':
      return {
        ...state,
        isRefreshing: true
      }
    case 'RECEIVE_ACCOUNT_REFRESH_ERROR':
      return {
        ...state,
        isRefreshing: false,
        status: action.status,
        receivedAt: action.receivedAt,
        error: action.error
      }
    case 'RECEIVE_ACCOUNT_REFRESH':
      return {
        ...state,
        isRefreshing: false,
        status: action.status,
        receivedAt: action.receivedAt,
        firstName: action.first_name,
        lastName: action.last_name
      }
    default:
      return state
  }
}

export default authReducer

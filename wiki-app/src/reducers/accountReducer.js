const initialState = {
  loggedIn: false,
  userInfo: {
    firstName: '',
    lastName: '',
    username: ''
  },
  newUserInfo: {
    firstName: '',
    lastName: '',
    username: ''
  },
  postAccount: {
    isPosting: false
  },
  updateAccount: {
    isUpdating: false
  },
  fetchAuth: {
    isFetching: false
  },
  refreshAuth: {
    isRefreshing: false
  }
}

function accountReducer(state = initialState, action) {
  switch (action.type) {
    case 'account.LOG_OUT':
      return {
        ...state,
        loggedIn: false,
        userInfo: {
          firstName: '',
          lastName: '',
          username: ''
        }
      }
    case 'account.REQUEST_LOG_IN':
      return {
        ...state,
        fetchAuth: {
          isFetching: true
        }
      }
    case 'account.RECEIVE_LOG_IN_ERROR':
      return {
        ...state,
        loggedIn: false,
        userInfo: {
          firstName: '',
          lastName: '',
          username: ''
        },
        fetchAuth: {
          status: action.status,
          error: action.error,
          receivedAt: action.receivedAt,
          isFetching: false
        }
      }
    case 'account.RECEIVE_LOG_IN':
      return {
        ...state,
        loggedIn: true,
        userInfo: action.userInfo,
        fetchAuth: {
          status: action.status,
          receivedAt: action.receivedAt,
          isFetching: false
        }
      }
    case 'account.REQUEST_ACCOUNT_REFRESH':
      return {
        ...state,
        refreshAuth: {
          isRefreshing: true
        }
      }
    case 'account.RECEIVE_ACCOUNT_REFRESH_ERROR':
      return {
        ...state,
        loggedIn: false,
        userInfo: {
          firstName: '',
          lastName: '',
          username: ''
        },
        refreshAuth: {
          status: action.status,
          error: action.error,
          receivedAt: action.receivedAt,
          isRefreshing: false
        }
      }
    case 'account.RECEIVE_ACCOUNT_REFRESH':
      return {
        ...state,
        loggedIn: true,
        userInfo: action.userInfo,
        refreshAuth: {
          status: action.status,
          error: action.error,
          receivedAt: action.receivedAt,
          isRefreshing: false
        }
      }
    case 'account.POST_SIGN_UP':
      return {
        ...state,
        postAccount: {
          isPosting: true
        }
      }
    case 'account.RECEIVE_SIGN_UP_ERROR':
      return {
        ...state,
        loggedIn: false,
        postAccount: {
          status: action.status,
          error: action.error,
          receivedAt: action.receivedAt,
          isPosting: false
        }
      }
    case 'account.RECEIVE_SIGN_UP':
      return {
        ...state,
        loggedIn: true,
        userInfo: action.userInfo,
        postAccount: {
          status: action.status,
          receivedAt: action.receivedAt,
          isPosting: false
        }
      }
    case 'account.FETCH_UPDATE_USER':
      return {
        ...state,
        updateAccount: {
          isUpdating: true
        }
      }
    case 'account.RECEIVE_UPDATE_USER_ERROR':
      return {
        ...state,
        updateAccount: {
          status: action.status,
          error: action.error,
          receivedAt: action.receivedAt,
          isUpdating: false
        }
      }
    case 'account.RECEIVE_UPDATE_USER':
      return {
        ...state,
        userInfo: action.userInfo,
        updateAccount: {
          status: action.status,
          receivedAt: action.receivedAt,
          isUpdating: false
        }
      }
    case 'account.SET_NEW_USER_VALUES':
      return {
        ...state,
        newUserInfo: action.newUserInfo
      }
    default:
      return state
  }
}

export default accountReducer

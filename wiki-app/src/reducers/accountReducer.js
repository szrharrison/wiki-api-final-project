const initialState = {
  isPosting: false,
  isUpdating: false,
  newUserInfo: {
    firstName: '',
    lastName: '',
    username: '',
  },
  error: null,
  receivedAt: null
}

function accountReducer(state = initialState, action) {
  switch (action.type) {
    case 'account.POST_SIGN_UP':
      return {
        ...state,
        isPosting: true
      }
    case 'account.RECEIVE_SIGN_UP_ERROR':
      return {
        ...state,
        status: action.status,
        error: action.error,
        isPosting: false,
        receivedAt: action.receivedAt
      }
    case 'account.RECEIVE_SIGN_UP':
      return {
        ...state,
        status: action.status,
        userInfo: action.userInfo,
        isPosting: false,
        receivedAt: action.receivedAt
      }
    case 'account.FETCH_UPDATE_USER':
      return {
        ...state,
        isUpdating: true
      }
    case 'account.RECEIVE_UPDATE_USER_ERROR':
      return {
        ...state,
        status: action.status,
        error: action.error,
        isUpdating: false,
        receivedAt: action.receivedAt
      }
    case 'account.RECEIVE_UPDATE_USER':
      return {
        ...state,
        status: action.status,
        userInfo: action.userInfo,
        isUpdating: false,
        receivedAt: action.receivedAt
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

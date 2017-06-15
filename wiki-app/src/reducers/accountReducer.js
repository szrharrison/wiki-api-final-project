const initialState = {
  isPosting: false
}

function accountReducer(state = initialState, action) {
  switch (action.type) {
    case 'POST_SIGN_UP':
      return {
        ...state,
        isPosting: true
      }
    case 'RECEIVE_SIGN_UP_ERROR':
      return {
        ...state,
        status: action.status,
        error: action.error,
        isPosting: false,
        receivedAt: action.receivedAt
      }
    case 'RECEIVE_SIGN_UP':
      return {
        ...state,
        status: action.status,
        username: action.username,
        firstName: action.firstName,
        lastName: action.lastName,
        isPosting: false,
        receivedAt: action.receivedAt
      }
    default:
      return state
  }
}

export default accountReducer

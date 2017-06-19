const initialState = {
  jsonView: true,
  basicAutocompletion: false,
  liveAutocompletion: false,
  snippets: false,
  fontSize: 14,
  newSlug: '',
  newName: ''
}

function pageFormReducer(state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_BOOLEAN':
      return {
        ...state,
        [action.name]: !state[action.name]
      }
    case 'SET_FONT_SIZE':
      return {
        ...state,
        fontSize: action.fontSize
      }
    case 'SET_NEW_SLUG':
      return {
        ...state,
        newSlug: action.newSlug
      }
    case 'SET_NEW_TITLE':
      return {
        ...state,
        newName: action.newName
      }
    default:
      return state
  }
}

export default pageFormReducer

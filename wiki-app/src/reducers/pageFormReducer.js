const initialState = {
  jsonView: true,
  basicAutocompletion: false,
  liveAutocompletion: false,
  snippets: false,
  fontSize: 14,
  newSlug: '',
  newName: '',
  newSlugError: 'no errors',
  newNameError: 'no errors',
  jsonStatus: 'no errors'
}

function pageFormReducer(state = initialState, action) {
  switch (action.type) {
    case 'pageForm.TOGGLE_BOOLEAN':
      return {
        ...state,
        [action.name]: !state[action.name]
      }
    case 'pageForm.SET_FONT_SIZE':
      return {
        ...state,
        fontSize: action.fontSize
      }
    case 'pageForm.SET_NEW_SLUG':
      return {
        ...state,
        newSlug: action.newSlug,
        newSlugError: action.error
      }
    case 'pageForm.SET_NEW_TITLE':
      return {
        ...state,
        newName: action.newName,
        newNameError: action.error
      }
    case 'pageForm.UPDATE_DATASET_ERROR':
      return {
        ...state,
        jsonStatus: action.error
      }
    default:
      return state
  }
}

export default pageFormReducer

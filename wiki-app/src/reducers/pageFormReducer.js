const initialState = {
  jsonView: true,
  basicAutocompletion: false,
  liveAutocompletion: false,
  snippets: false,
  fontSize: 14,
  newPageInfo: {
    name: '',
    slug: '',
    errors: [[null, null]]
  },
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
    case 'pageForm.SET_NEW_PAGE_INFO':
      return {
        ...state,
        newPageInfo: action.newPageInfo
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

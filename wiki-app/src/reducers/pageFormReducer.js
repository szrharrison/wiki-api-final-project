const initialState = {
  jsonView: true,
  basicAutocompletion: false,
  liveAutocompletion: false,
  snippets: false,
  fontSize: 14,
  newPageInfo: {
    name: '',
    slug: '',
    errors: [['Name', null],['Slug', null]]
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
    case 'pageForm.SET_NEW_PAGE_NAME':
      const nonNameErrors = state.newPageInfo.errors.filter( error => error[0] !== 'Name' )
      return {
        ...state,
        newPageInfo: {
          ...state.newPageInfo,
          name: action.name,
          errors: [
            ...nonNameErrors,
            ...action.errors
          ]
        }
      }
    case 'pageForm.SET_NEW_PAGE_SLUG':
      const nonSlugErrors = state.newPageInfo.errors.filter( error => error[0] !== 'Slug' )
      return {
        ...state,
        newPageInfo: {
          ...state.newPageInfo,
          slug: action.slug,
          errors: [
            ...nonSlugErrors,
            ...action.errors
          ]
        }
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

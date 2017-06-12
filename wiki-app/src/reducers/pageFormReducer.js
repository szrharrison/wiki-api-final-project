const initialState = {
  title: '',
  slug: '',
  dataset_type: '',
  dataset: {},
  jsonView: false,
  id: '',
  relative_path: '',
  isFetching: false
}

function pageFormReducer(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_PAGE':
      return {
        ...state,
        isFetching: true
      }
    case 'RECEIVE_PAGE':
      return {
        ...state,
        title: action.title,
        id: action.id,
        dataset_type: action.dataset_type,
        dataset: action.dataset,
        relative_path: action.relative_path,
        isFetching: false
      }
    case 'TOGGLE_JSON':
      return {
        ...state,
        jsonView: !state.jsonView
      }
    case 'UPDATE_DATASET':
      if(action.status) {
        return {
          ...state,
          status: 'error',
          error: action.error
        }
      }
      return {
        ...state,
        dataset: action.data,
        status: 'no errors',
      }
    default:
      return state
  }
}

export default pageFormReducer

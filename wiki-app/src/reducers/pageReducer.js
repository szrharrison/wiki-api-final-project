const initialState = {
  title: '',
  slug: '',
  dataset_type: '',
  dataset: {},
  jsonView: true,
  jsonStatus: 'no errors',
  relative_path: '',
  isFetching: false
}

function pageReducer(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_PAGE':
      return {
        ...state,
        isFetching: true
      }
    case 'RECEIVE_PAGE_ERROR':
      return {
        ...state,
        errors: action.error,
        status: action.status,
        isFetching: false
      }
    case 'RECEIVE_PAGE':
      return {
        ...state,
        title: action.title,
        dataset_type: action.dataset_type,
        dataset: action.dataset,
        relative_path: action.relative_path,
        status: action.status,
        slug: action.slug,
        parentPath: action.parentPath,
        subPageSlugs: action.sub_page_slugs,
        isFetching: false
      }
    case 'REQUEST_UPDATE_PAGE':
      return {
        ...state,
        isUpdating: true
      }
    case 'RECEIVE_UPDATE_PAGE_ERROR':
      return {
        ...state,
        errors: action.error,
        status: action.status,
        isUpdating: false
      }
    case 'RECEIVE_UPDATE_PAGE':
      return {
        ...state,
        title: action.title,
        dataset_type: action.dataset_type,
        dataset: action.dataset,
        relative_path: action.relative_path,
        status: action.status,
        slug: action.slug,
        parentPath: action.parentPath,
        subPageSlugs: action.sub_page_slugs,
        isUpdating: false
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
          jsonStatus: 'error in json',
          error: action.error
        }
      }
      return {
        ...state,
        dataset: action.data,
        jsonStatus: 'no errors',
      }
    default:
      return state
  }
}

export default pageReducer

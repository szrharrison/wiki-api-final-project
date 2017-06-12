import { combineReducers } from 'redux'
import pageFormReducer from './pageFormReducer'
import authReducer from './authReducer'
import wikiApiReducer from './wikiApiReducer'
import accountReducer from './accountReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  pageForm: pageFormReducer,
  wikiApi: wikiApiReducer,
  account: accountReducer
})

export default rootReducer

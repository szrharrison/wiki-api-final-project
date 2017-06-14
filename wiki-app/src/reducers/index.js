import { combineReducers } from 'redux'
import pageReducer from './pageReducer'
import authReducer from './authReducer'
import wikiApiReducer from './wikiApiReducer'
import accountReducer from './accountReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  pageForm: pageReducer,
  wikiApi: wikiApiReducer,
  account: accountReducer
})

export default rootReducer

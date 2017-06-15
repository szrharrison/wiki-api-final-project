import { combineReducers } from 'redux'
import pageReducer from './pageReducer'
import authReducer from './authReducer'
import wikiApiReducer from './wikiApiReducer'
import accountReducer from './accountReducer'
import datasetReducer from './datasetReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  pageForm: pageReducer,
  wikiApi: wikiApiReducer,
  account: accountReducer,
  dataset: datasetReducer
})

export default rootReducer

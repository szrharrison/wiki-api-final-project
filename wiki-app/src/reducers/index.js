import { combineReducers } from 'redux'
import pageReducer from './pageReducer'
import wikiApiReducer from './wikiApiReducer'
import accountReducer from './accountReducer'
import datasetReducer from './datasetReducer'
import pageFormReducer from './pageFormReducer'

const rootReducer = combineReducers({
  pageForm: pageFormReducer,
  page: pageReducer,
  wikiApi: wikiApiReducer,
  account: accountReducer,
  dataset: datasetReducer
})

export default rootReducer

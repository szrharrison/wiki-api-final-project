import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import './index.css'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

import 'semantic-ui-css/semantic.min.css'
import rootReducer from './reducers'
import Root from './Root'

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
  )
)

ReactDOM.render(<Root store={store} />, document.getElementById('root'))
registerServiceWorker()

import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux'
import 'semantic-ui-css/semantic.min.css'

import './index.css'
import rootReducer from './reducers'
import Root from './Root'

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
    )
  )
)

ReactDOM.render(<Root store={store} />, document.getElementById('root'))
registerServiceWorker()

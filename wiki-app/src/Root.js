import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import PropTypes from 'prop-types'

import AppContainer from './containers/AppContainer'

const Root = ({ store }) => (
  <Router>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </Router>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Root

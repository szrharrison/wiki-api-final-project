import React, { Component } from 'react'
import { Link, Switch, Route } from 'react-router-dom'
import { Grid, List } from 'semantic-ui-react'

import isAuthenticated from '../hocs/isAuthenticated'
import connectedWithRoutes from '../hocs/connectedWithRoutes'
import { fetchPage } from '../actions/pageActions'

import PageFormContainer from './PageFormContainer'
import PagePage from '../components/page/PagePage'

class PageContainer extends Component {

  componentDidMount() {
    this.props.fetchPage(this.props.match.params.relativePath)
  }



  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/:username/:relativePath+/new" component={PageFormContainer} />
          <Route exact path="/:username/:relativePath+/dataset" component={PageFormContainer} />
          <Route exact path='/:username/:relativePath+' component={PagePage} />
        </Switch>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return ownProps
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    fetchPage: relativePath => dispatch(fetchPage(relativePath)),
  }
}

export default connectedWithRoutes(mapStateToProps, mapDispatchToProps)(isAuthenticated(PageContainer))

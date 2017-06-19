import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import { fetchDataset } from '../actions/datasetActions'
import connectedWithRoutes from '../hocs/connectedWithRoutes'

import DatasetView from '../components/page/dataset/DatasetView'
import NewDatasetView from '../components/page/newDataset/NewDatasetView'


class PageFormContainer extends Component {

  componentDidMount() {
    const slug = this.props.match.params.relativePath
    if(slug.split('/').length > 1) {
      this.props.fetchDataset(slug)
    }
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/:username/:relativePath+/dataset" component={DatasetView} />
          <Route exact path="/:username/:relativePath+/new" component={NewDatasetView} />
        </Switch>
      </div>
    )
  }
}

function mapStateToProps( state, ownProps ) {
  return ownProps
}

function mapDispatchToProps( dispatch, ownProps ) {
  return {
    fetchDataset: relativePath => dispatch(fetchDataset(relativePath))
  }
}

export default connectedWithRoutes(mapStateToProps, mapDispatchToProps)(PageFormContainer)

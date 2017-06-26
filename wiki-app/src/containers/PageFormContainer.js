import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import { fetchDataset } from '../actions/datasetActions'
import connectedWithRoutes from '../hocs/connectedWithRoutes'

import DatasetView from '../components/page/dataset/DatasetView'
import NewDatasetView from '../components/page/newDataset/NewDatasetView'


class PageFormContainer extends Component {

  componentDidMount() {
    if(!this.props.isNewForm && !this.props.isWiki) {
      this.props.fetchDataset(this.props.relativePath)
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

function mapDispatchToProps( dispatch ) {
  return {
    fetchDataset: relativePath => dispatch(fetchDataset(relativePath))
  }
}

export default connectedWithRoutes(null, mapDispatchToProps)(PageFormContainer)

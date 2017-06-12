import React, { Component } from 'react'
import { Header, Grid, Loader, Segment, Dimmer } from 'semantic-ui-react'
import { connect } from 'react-redux'

import { fetchPage } from '../actions'
import isAuthenticated from '../hocs/isAuthenticated'

import DatasetJsonEditor from '../components/datset/DatasetJsonEditor'
import PageFormSidebar from '../components/PageFormSidebar'

class PageFormContainer extends Component {
  componentDidMount() {
    this.props.fetchPage(this.props.match.params.relativePath)
  }

  render() {
    let dataView
    if( this.props.isFetching ) {
      dataView = (
        <Dimmer active>
          <Loader size='massive'>Loading</Loader>
        </Dimmer>
      )
    } else {
      dataView = (
        <Segment inverted>
          <Header as='h2' content={this.props.title} />
          {this.props.jsonView? <DatasetJsonEditor /> : 'null'}
        </Segment>
      )
    }
    return (
      <div>
        <Grid>
          <Grid.Column width={5}>
            <PageFormSidebar />
          </Grid.Column>
          <Grid.Column width={11}>
            {dataView}
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

function mapStateToProps( state, ownProps ) {
  return {
    ...ownProps,
    ...state.pageForm
  }
}

function mapDispatchToProps( dispatch, ownProps ) {
  return {
    fetchPage: relative_path => dispatch(fetchPage(relative_path)),
  }
}

export default isAuthenticated(connect(mapStateToProps, mapDispatchToProps)(PageFormContainer))

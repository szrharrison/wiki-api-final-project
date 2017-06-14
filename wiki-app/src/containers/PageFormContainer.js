import React, { Component } from 'react'
import { Grid, Loader, Segment, Dimmer } from 'semantic-ui-react'
import { connect } from 'react-redux'

import { fetchPage } from '../actions'
import isAuthenticated from '../hocs/isAuthenticated'

import DatasetJsonEditor from '../components/dataset/DatasetJsonEditor'
import PageFormSidebar from '../components/dataset/PageFormSidebar'
import PageBreadcrumbs from '../components/dataset/PageBreadcrumbs'



class PageFormContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      basicAutocompletion: false,
      liveAutocompletion: false,
      snippets: false,
      fontSize: 14
    }
  }

  componentDidMount() {
    this.props.fetchPage(this.props.match.params.relativePath)
  }

  setFontSize = (fontSize) => {
    this.setState({
      fontSize: parseInt(fontSize,10)
    })
  }

  setBoolean = (name, value) => {
    this.setState({
      [name]: value
    })
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
        <Segment inverted className='dataset-editor'>
          <PageBreadcrumbs />
          {this.props.jsonView
            ?
              <DatasetJsonEditor
                fontSize={this.state.fontSize}
                basicAutocompletion={this.state.basicAutocompletion}
                liveAutocompletion={this.state.liveAutocompletion}
                snippets={this.state.snippets}
              />
            :
              null
          }
        </Segment>
      )
    }
    return (
      <div>
        <Grid>
          <Grid.Column width={5}>
            <PageFormSidebar
              handleFontSize={this.setFontSize}
              handleBoolean={this.setBoolean}
              fontSize={this.state.fontSize}
              basicAutocompletion={this.state.basicAutocompletion}
              liveAutocompletion={this.state.liveAutocompletion}
              snippets={this.state.snippets}
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(isAuthenticated(PageFormContainer))

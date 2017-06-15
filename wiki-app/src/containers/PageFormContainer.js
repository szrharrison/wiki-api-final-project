import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'

import { fetchPage } from '../actions/pageActions'
import { fetchDataset } from '../actions/datasetActions'
import isAuthenticated from '../hocs/isAuthenticated'

import PageFormSidebar from '../components/page/PageFormSidebar'
import DatasetView from '../components/page/dataset/DatasetView'


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
    this.props.fetchPageData(this.props.match.params.relativePath)
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
            <DatasetView
              fontSize={this.state.fontSize}
              basicAutocompletion={this.state.basicAutocompletion}
              liveAutocompletion={this.state.liveAutocompletion}
              snippets={this.state.snippets}
            />
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

function mapStateToProps( state, ownProps ) {
  return ownProps
}

function mapDispatchToProps( dispatch, ownProps ) {
  return {
    fetchPageData: relativePath => {
      dispatch(fetchPage(relativePath))
      dispatch(fetchDataset(relativePath))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(isAuthenticated(PageFormContainer))

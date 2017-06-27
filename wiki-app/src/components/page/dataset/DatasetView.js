import React, { Component } from 'react'
import { Segment, Dimmer, Loader } from 'semantic-ui-react'
import { connect } from 'react-redux'

import PageTitle from './PageTitle'
import PageBreadcrumbs from './PageBreadcrumbs'
import DatasetJsonEditor from './DatasetJsonEditor'

class DatasetView extends Component {
  componentDidMount() {
    import('../custom.css')
  }
  render() {
    return (
      <Segment inverted className='dataset-editor'>
        { this.props.isFetching
          ?
            <Dimmer active>
              <Loader size='massive'>Loading</Loader>
            </Dimmer>
          :
          <div>
            <PageTitle />
            <PageBreadcrumbs />
            { this.props.jsonView
              ?
                <DatasetJsonEditor/>
              :
              null
            }
          </div>
        }
      </Segment>
    )
  }
}

function mapStateToProps(state) {
  return {
    jsonView: state.pageForm.jsonView,
    isFetching: state.page.fetchPage.isFetching || state.dataset.fetchDataset.isFetching
  }
}

export default connect(mapStateToProps)(DatasetView)

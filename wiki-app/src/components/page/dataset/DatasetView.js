import React from 'react'
import { Segment, Dimmer, Loader } from 'semantic-ui-react'
import { connect } from 'react-redux'

import '../custom.css'

import PageTitle from './PageTitle'
import PageBreadcrumbs from './PageBreadcrumbs'
import DatasetJsonEditor from './DatasetJsonEditor'

function DatasetView(props) {
  return (
    <Segment inverted className='dataset-editor'>
      { props.isFetching
        ?
          <Dimmer active>
            <Loader size='massive'>Loading</Loader>
          </Dimmer>
        :
        <div>
          <PageTitle />
          <PageBreadcrumbs />
          { props.jsonView
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

function mapStateToProps(state) {
  return {
    jsonView: state.pageForm.jsonView,
    isFetching: state.page.isFetching || state.dataset.isFetching
  }
}

export default connect(mapStateToProps)(DatasetView)

import React from 'react'
import { Segment, Dimmer, Loader } from 'semantic-ui-react'
import { connect } from 'react-redux'

import PageBreadcrumbs from '../PageBreadcrumbs'
import DatasetJsonEditor from './DatasetJsonEditor'

const DatasetView = (props) => {
  return (
    <div>
      { props.isFetching || props.isUpdating
        ?
          <Dimmer active={props.isFetching}>
            <Loader size='massive'>Loading</Loader>
          </Dimmer>
        :
        <Segment inverted className='dataset-editor'>
          <PageBreadcrumbs />
          { props.jsonView
            ?
              <DatasetJsonEditor
                fontSize={props.fontSize}
                basicAutocompletion={props.basicAutocompletion}
                liveAutocompletion={props.liveAutocompletion}
                snippets={props.snippets}
              />
            :
            null
          }
        </Segment>
      }
    </div>
  )
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    jsonView: state.pageForm.jsonView,
    isFetching: state.pageForm.isFetching || state.dataset.isFetching,
    isUpdating: state.dataset.isUpdating
  }
}

export default connect(mapStateToProps)(DatasetView)

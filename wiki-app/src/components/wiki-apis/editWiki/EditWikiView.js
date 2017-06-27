import React from 'react'
import { Segment, Dimmer, Loader } from 'semantic-ui-react'
import { connect } from 'react-redux'

import EditWikiBreadcrumbs from './EditWikiBreadcrumbs'
import WikiName from './WikiName'

const EditWikiView = props => {
  return (
    <Segment inverted className='dataset-editor'>
      { props.isFetching
        ?
          <Dimmer active>
            <Loader size='massive'>Loading</Loader>
          </Dimmer>
        :
        <div>
          <WikiName />
          <EditWikiBreadcrumbs />
        </div>
      }
    </Segment>
  )
}

function mapStateToProps(state) {
  return {
    isFetching: state.wikiApi.fetchWikiApi.isFetching || state.wikiApi.updateWikiApi.isUpdating || state.wikiApi.createWikiApi.isCreating
  }
}

export default connect(mapStateToProps)(EditWikiView)

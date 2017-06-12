import React from 'react'
import { Checkbox } from 'semantic-ui-react'
import { connect } from 'react-redux'

import { toggleJson } from '../../actions'

const DatasetViewSwitcher = (props) => {
  return (
    <div>
      <p>viewing as {props.jsonView? 'json' : 'input'}</p>
      <Checkbox slider onChange={props.handleChange} checked={props.jsonView} />
    </div>
  )
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    jsonView: state.pageForm.jsonView
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    handleChange: () => dispatch(toggleJson())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DatasetViewSwitcher)

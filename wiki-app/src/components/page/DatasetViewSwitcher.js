import React from 'react'
import { Checkbox } from 'semantic-ui-react'
import { connect } from 'react-redux'

import { toggleJson } from '../../pageActions'

const DatasetViewSwitcher = (props) => {
  return (
    <div>
      <p>viewing as {props.jsonView? 'json' : 'input'}</p>
      <Checkbox slider onChange={props.handleChange} checked={props.jsonView} />
    </div>
  )
}

function mapStateToProps(state) {
  return {
    jsonView: state.page.jsonView
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleChange: () => dispatch(toggleJson())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DatasetViewSwitcher)

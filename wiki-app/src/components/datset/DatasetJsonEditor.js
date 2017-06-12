import React, { Component } from 'react'
import { connect } from 'react-redux'
import CodeMirror from 'react-codemirror'
import formatJson from 'format-json-pretty'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/theme/dracula.css'

import { updateDataset } from '../../actions'

class DatasetJsonEditor extends Component {
  constructor(props) {
    super(props)

    this.state = {
      theme: 'dracula'
    }
  }

  render() {
    const options = {
      theme: this.state.theme,
      mode: {name: "javascript", json: true},
      tabSize: 2,
      lineNumbers: true,
    }
    return <CodeMirror value={formatJson(this.props.data)} onChange={this.props.handleChange} options={options} preserveScrollPosition={true} autoFocus={true} />
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    data: state.pageForm.dataset
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    handleChange: (dataString) => dispatch(updateDataset(dataString))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DatasetJsonEditor)

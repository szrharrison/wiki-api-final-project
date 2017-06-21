import React, { Component } from 'react'
import { connect } from 'react-redux'
import AceEditor from 'react-ace'
import formatJson from 'format-json-pretty'
import 'brace/mode/json'
import 'brace/theme/monokai'
import 'brace/snippets/json'
import 'brace/ext/language_tools'
import 'brace/ext/searchbox'

import { updateDataset } from '../../../actions/datasetActions'

class DatasetJsonEditor extends Component {
  state = {
    data: ''
  }

  componentDidMount = () => {
    if(formatJson(this.props.data) !== this.state.data) {
      this.setState({
        data: formatJson(this.props.data)
      })
    }

    const undo_manager = this.refs.ace.editor.getSession().getUndoManager()

    undo_manager.reset()

    this.refs.ace.editor.getSession().setUndoManager(undo_manager)
  }

  handleChange = (value) => {
    this.setState({
      data: value
    })
    this.props.handleChange(value)
  }

  render() {
    const options = {
      enableBasicAutocompletion: this.props.basicAutocompletion,
      enableLiveAutocompletion: this.props.liveAutocompletion,
      enableSnippets: this.props.snippets,
      showLineNumbers: true,
      tabSize: 2,
    }
    return (
      <div>
        <AceEditor
          mode='json'
          editorProps={{
            $blockScrolling: Infinity
          }}
          theme='monokai'
          name="json-editor"
          ref="ace"
          onChange={this.handleChange}
          fontSize={this.props.fontSize}
          width='100%'
          showPrintMargin={false}
          showGutter={true}
          highlightActiveLine={true}
          value={this.state.data}
          setOptions={options}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    snippets: state.pageForm.snippets,
    basicAutocompletion: state.pageForm.basicAutocompletion,
    liveAutocompletion: state.pageForm.liveAutocompletion,
    fontSize: state.pageForm.fontSize,
    data: state.dataset.dataset
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleChange: (dataString) => dispatch(updateDataset(dataString))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DatasetJsonEditor)

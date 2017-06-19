import React, { Component } from 'react'
import { connect } from 'react-redux'
import AceEditor from 'react-ace'
import 'brace/mode/json'
import 'brace/theme/monokai'
import 'brace/snippets/json'
import 'brace/ext/language_tools'
import 'brace/ext/searchbox'

import { updateDataset } from '../../../actions/datasetActions'



class NewDatasetJsonEditor extends Component {
  state = {
    data: ""
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

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    data: state.dataset.dataset,
    fontSize: state.pageForm.fontSize,
    basicAutocompletion: state.pageForm.basicAutocompletion,
    liveAutocompletion: state.pageForm.liveAutocompletion,
    snippets: state.pageForm.snippets,
    isFetching: state.dataset.isFetching,
    isUpdating: state.dataset.isUpdating
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    handleChange: (dataString) => dispatch(updateDataset(dataString))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDatasetJsonEditor)

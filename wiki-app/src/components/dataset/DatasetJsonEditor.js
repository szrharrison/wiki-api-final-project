import React from 'react'
import { connect } from 'react-redux'
import brace from 'brace'
import AceEditor from 'react-ace'
import formatJson from 'format-json-pretty'
import 'brace/mode/json'
import 'brace/theme/monokai'
import 'brace/snippets/json'
import 'brace/ext/language_tools'
import 'brace/ext/searchbox'

import './custom.css'

import { updateDataset } from '../../actions'

function DatasetJsonEditor(props)  {
  const options = {
    enableBasicAutocompletion: props.basicAutocompletion,
    enableLiveAutocompletion: props.liveAutocompletion,
    enableSnippets: props.snippets,
    showLineNumbers: true,
    tabSize: 2,
  }
  if((!props.data) || props.isFetching) {
    return null
  } else {
    return (
      <div>
        <AceEditor
          mode='json'
          editorProps={{
            $blockScrolling: Infinity
          }}
          theme='monokai'
          name="json-editor"
          onChange={props.handleChange}
          fontSize={props.fontSize}
          width='100%'
          showPrintMargin={false}
          showGutter={true}
          highlightActiveLine={true}
          value={formatJson(props.data)}
          setOptions={options}
        />
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    data: state.pageForm.dataset,
    isFetching: state.pageForm.isFetching
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    handleChange: (dataString) => dispatch(updateDataset(dataString))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DatasetJsonEditor)

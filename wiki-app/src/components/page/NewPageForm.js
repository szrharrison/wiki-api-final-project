import React from 'react'
import { connect } from 'react-redux'
import AceEditor from 'react-ace'
import formatJson from 'format-json-pretty'
import 'brace/mode/json'
import 'brace/theme/monokai'
import 'brace/snippets/json'
import 'brace/ext/language_tools'
import 'brace/ext/searchbox'

import './custom.css'



class NewPageForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: {}
    }
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
          onChange={this.props.handleChange}
          fontSize={this.props.fontSize}
          width='100%'
          showPrintMargin={false}
          showGutter={true}
          highlightActiveLine={true}
          value={formatJson(this.state.data)}
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
    isFetching: state.dataset.isFetching,
    isUpdating: state.dataset.isUpdating
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    handleChange: (dataString) => dispatch(updateDataset(dataString))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPageForm)

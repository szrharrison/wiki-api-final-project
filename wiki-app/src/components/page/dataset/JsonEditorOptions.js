import React from 'react'
import { connect } from 'react-redux'
import { Checkbox, Dropdown } from 'semantic-ui-react'

import { toggleBoolean, setFontSize } from '../../../actions/pageFormActions'

function JsonEditorOptions(props) {
  const { basicAutocompletion, liveAutocompletion, snippets, fontSize } = props
  if((!props.data) || props.isFetching) {
    return null
  } else {
    return (
      <div>
        <Dropdown
          id="font-size"
          name="font-size"
          onChange={ (e, dropdown) => props.handleFontSize(dropdown.value) }
          value={fontSize}
          header='Font Size'
          text={fontSize + ' px'}
          search
          selection
          allowAdditions
          additionLabel={<span className="description">px</span>}
          compact
          item
          minCharacters={0}
          options={[
            {
              text: '14',
              value: 14,
              description: 'px',
            }, {
              text: '16',
              value: 16,
              description: 'px',
            }, {
              text: '18',
              value: 18,
              description: 'px',
            }, {
              text: '20',
              value: 20,
              description: 'px',
            }, {
              text: '24',
              value: 24,
              description: 'px',
            }, {
              text: '28',
              value: 28,
              description: 'px',
            }, {
              text: '32',
              value: 32,
              description: 'px',
            }, {
              text: '40',
              value: 40,
              description: 'px',
            }
          ]}
        />
        <Checkbox
          checked={basicAutocompletion}
          onChange={(e, checkbox) => {props.handleBoolean('basicAutocompletion', checkbox.checked)}}
          label='Enable Basic Autocomplete'
          slider
        />
        <Checkbox
          checked={liveAutocompletion}
          onChange={(e, checkbox) => props.handleBoolean('liveAutocompletion', checkbox.checked)}
          label='Enable Live Autocomplete'
          slider
        />
        <Checkbox
          checked={snippets}
          onChange={(e, checkbox) => props.handleBoolean('snippets', checkbox.checked)}
          label='Enable Snippets'
          slider
        />
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    snippets: state.pageForm.snippets,
    basicAutocompletion: state.pageForm.basicAutocompletion,
    liveAutocompletion: state.pageForm.liveAutocompletion,
    fontSize: state.pageForm.fontSize,
    data: state.dataset.dataset,
    isFetching: state.dataset.isFetching
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    handleBoolean: name => dispatch(toggleBoolean(name)),
    handleFontSize: size => dispatch(setFontSize(size))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JsonEditorOptions)

import React from 'react'
import { Menu, Segment, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
// import DatasetViewSwitcher from './datset/DatasetViewSwitcher'
import { connect } from 'react-redux'

import SubPageDropdown from './SubPageDropdown'
import JsonEditorOptions from './dataset/JsonEditorOptions'
import { fetchUpdateDataset } from '../../actions/datasetActions'

function PageFormSidebar(props)  {
  const jsonErrors = props.jsonStatus !== 'no errors'
  const page = {
    name: props.title,
    relativePath: props.relativePath,
    parentPath: props.parentPath
  }
  return (
    <Segment inverted color="black">
      <Menu vertical inverted pointing secondary >
        <Menu.Header>
          { props.parentPath? <Link to={'/' + page.parentPath}>{page.parentPath}</Link> : null }
        </Menu.Header>
        <Menu.Item name='page-name' active>
          { page.name }
        </Menu.Item>
        <SubPageDropdown />

        <Menu.Item name='dataset-view'>
          {/* <DatasetViewSwitcher /> */}
        </Menu.Item>
        <JsonEditorOptions
          handleFontSize={props.handleFontSize}
          handleBoolean={props.handleBoolean}
          fontSize={props.fontSize}
          basicAutocompletion={props.basicAutocompletion}
          liveAutocompletion={props.liveAutocompletion}
          snippets={props.snippets}
        />
        <Button
          color={ !jsonErrors ? 'green' : 'red' }
          disabled={jsonErrors}
          content='Save'
          icon='save'
          attached='bottom'
          label={jsonErrors ? { basic: true, color: 'red', pointing: 'left', content: 'syntax error' } : null }
          onClick={() => props.updateDataset(props.dataset, props.relativePath)}
        />
      </Menu>
    </Segment>
  )
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    username: state.auth.username,
    title: state.pageForm.title,
    slug: state.pageForm.slug,
    parentPath: state.pageForm.parentPath,
    jsonStatus: state.dataset.jsonStatus,
    dataset: state.dataset.dataset,
    relativePath: state.pageForm.relativePath
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateDataset: (dataset, relativePath) => dispatch(fetchUpdateDataset(dataset, relativePath))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageFormSidebar)

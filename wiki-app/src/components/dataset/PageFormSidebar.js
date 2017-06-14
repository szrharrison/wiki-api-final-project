import React from 'react'
import { Menu, Segment, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
// import DatasetViewSwitcher from './datset/DatasetViewSwitcher'
import { connect } from 'react-redux'

import SubPageDropdown from './SubPageDropdown'
import JsonEditorOptions from './JsonEditorOptions'
import { fetchUpdatePage } from '../../actions/pageActions'

function PageFormSidebar(props)  {
  const jsonErrors = props.jsonStatus !== 'no errors'
  const page = {
    name: props.title,
    relativePath: props.relative_path,
    dataset: props.dataset
  }
  return (
    <Segment inverted color="black">
      <Menu vertical inverted pointing secondary >
        <Menu.Header>
          { props.parentPath? <Link to={props.parentPath}>{props.parentPath}</Link> : null }
        </Menu.Header>
        <Menu.Item name='inbox' active>
          { props.title }
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
          onClick={() => props.updatePage(page)}
        />
      </Menu>
    </Segment>
  )
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    title: state.pageForm.title,
    slug: state.pageForm.slug,
    parentPath: state.pageForm.parentPath,
    jsonStatus: state.pageForm.jsonStatus,
    dataset: state.pageForm.dataset,
    relative_path: state.pageForm.relative_path
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updatePage: (page) => dispatch(fetchUpdatePage(page))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageFormSidebar)

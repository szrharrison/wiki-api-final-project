import React from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
// import DatasetViewSwitcher from './datset/DatasetViewSwitcher'
import { connect } from 'react-redux'

import SubPageMenu from './SubPageMenu'
import JsonEditorOptions from './JsonEditorOptions'

function PageFormSidebar(props) {
  return (
    <Segment inverted color="black">
      <Menu vertical inverted pointing secondary >
        <Menu.Header>
          { props.parentPath? <Link to={props.parentPath}>{props.parentPath}</Link> : null }
        </Menu.Header>
        <Menu.Item name='inbox' active>
          { props.title }
        </Menu.Item>
        { props.title? <SubPageMenu /> : null }

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
  }
}

export default connect(mapStateToProps)(PageFormSidebar)

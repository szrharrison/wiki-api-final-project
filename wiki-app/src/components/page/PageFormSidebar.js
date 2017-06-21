import React from 'react'
import { Menu, Segment, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
// import DatasetViewSwitcher from './datset/DatasetViewSwitcher'

import { fetchPage } from '../../actions/pageActions'
import connectedWithRoutes from '../../hocs/connectedWithRoutes'
import SubPageDropdown from './SubPageDropdown'
import PageSidebarButton from './PageSidebarButton'
import JsonEditorOptions from './dataset/JsonEditorOptions'

function PageFormSidebar(props)  {
  const locationEnding = props.location.pathname.split('/').slice(-1)[0]
  let parentPath
  let sidebarOptions
  if( locationEnding === 'dataset' || locationEnding === 'new') {
    parentPath = props.location.pathname.split('/').slice(2,-2).join('/')
    sidebarOptions = (
      <div>
        { locationEnding === 'dataset'
          ?
            <Menu.Item
              className="link"
              name="view-page"
              as={Link}
              to={props.location.pathname.split('/').slice(0,-1).join('/')}
            >
              View Page
            </Menu.Item>
          :
          null
        }
        {/* <DatasetViewSwitcher /> */}
        <JsonEditorOptions />
        <PageSidebarButton />
      </div>
    )
  } else {
    parentPath = props.location.pathname.split('/').slice(2,-1).join('/')
    sidebarOptions = (
      <Button
        as={Link}
        to={props.location.pathname + '/dataset'}
        content='Edit Page'
        icon='edit'
        attached='bottom'
      />
    )
  }
  return (
    <Segment inverted color="black" className="page-sidebar">
      <Menu vertical inverted pointing secondary fluid >
        <Menu.Header>
          { parentPath
            ?
              <Link
                to={`/${props.username}/${parentPath}`}
                onClick={() => props.fetchPage(parentPath)}
              >
                {parentPath}
              </Link>
            :
              null
          }
        </Menu.Header>
        <Menu.Item className='page-name' active>
          { props.name }
        </Menu.Item>
        <SubPageDropdown />
        {sidebarOptions}
      </Menu>
    </Segment>
  )
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    username: state.auth.username,
    name: state.page.name
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPage: relativePath => dispatch(fetchPage(relativePath))
  }
}

export default connectedWithRoutes(mapStateToProps, mapDispatchToProps)(PageFormSidebar)

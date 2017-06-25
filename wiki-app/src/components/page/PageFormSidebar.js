import React from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
// import DatasetViewSwitcher from './datset/DatasetViewSwitcher'

import { fetchPage } from '../../actions/pageActions'
import { fetchWikiApi } from '../../actions/wikiApiActions'
import connectedWithRoutes from '../../hocs/connectedWithRoutes'
import SubPageDropdown from './SubPageDropdown'
import PageSidebarButton from './PageSidebarButton'
import JsonEditorOptions from './dataset/JsonEditorOptions'

function PageSidebar(props)  {
  const location = props.location.pathname.replace(/^\/.+?\//, '')
  const locationEnding = location.split('/').slice(-1)[0]
  const relativePathArray = location.split('/')
  let printedName = props.name
  if( locationEnding === 'dataset' || locationEnding === 'new') {
    relativePathArray.pop()
    if( locationEnding === 'new' ) {
      printedName = `New Page for ${props.name}`
    }
  }
  const relativePath = relativePathArray.join('/')
  const parentPath = relativePathArray.slice(0, -1).join('/')
  let sidebarOptions
  if( locationEnding === 'dataset' || locationEnding === 'new') {
    sidebarOptions = (
      <div>
        { locationEnding === 'dataset'
          ?
            <Menu.Item
              className="link"
              name="view-page"
              as={Link}
              to={`/${props.username}/${relativePath}`}
            >
              View Page
            </Menu.Item>
          :
          null
        }
        {/* <DatasetViewSwitcher /> */}
        <JsonEditorOptions />
      </div>
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
                onClick={() => {
                  if(parentPath.includes('/')) {
                    props.fetchPage(parentPath)
                  } else {
                    props.fetchWikiApi(parentPath)
                  }
                }}
              >
                {parentPath}
              </Link>
            :
              null
          }
        </Menu.Header>
        <Menu.Item className='page-name' active>
          { printedName }
        </Menu.Item>
        <SubPageDropdown />
        {sidebarOptions}
        <PageSidebarButton />
      </Menu>
    </Segment>
  )
}

function mapStateToProps(state) {
  return {
    username: state.account.userInfo.username,
    name: state.page.name
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPage: relativePath => dispatch(fetchPage(relativePath)),
    fetchWikiApi: relativePath => dispatch(fetchWikiApi(relativePath))
  }
}

export default connectedWithRoutes(mapStateToProps, mapDispatchToProps)(PageSidebar)

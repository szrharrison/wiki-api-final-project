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
  let printedName = props.pageName
  if( props.isNewForm ) {
    if( props.isWiki ) {
      printedName = `New Page for ${props.wikiName}`
    } else {
      printedName = `New Page for ${props.pageName}`
    }
  }
  let sidebarOptions
  if( props.isEditForm || props.isNewForm) {
    sidebarOptions = (
      <div>
        { props.isEditForm
          ?
            <Menu.Item
              className="link"
              name="view-page"
              as={Link}
              to={`/${props.username}/${props.relativePath}`}
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
          { props.parentPath.length
            ?
              <Link
                to={`/${props.username}/${props.parentPath}`}
                onClick={() => {
                  if(props.parentPath.includes('/')) {
                    props.fetchPage(props.parentPath)
                  } else {
                    props.fetchWikiApi(props.parentPath)
                  }
                }}
              >
                {props.parentPath}
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
    pageName: state.page.pageInfo.name,
    wikiName: state.wikiApi.wikiInfo.name
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPage: relativePath => dispatch(fetchPage(relativePath)),
    fetchWikiApi: relativePath => dispatch(fetchWikiApi(relativePath))
  }
}

export default connectedWithRoutes(mapStateToProps, mapDispatchToProps)(PageSidebar)

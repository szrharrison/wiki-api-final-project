import React from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import connectedWithRoutes from '../../hocs/connectedWithRoutes'
import WikiPageDropdown from './WikiPageDropdown'
import WikiPageSidebarButton from './WikiPageSidebarButton'

function WikiApiPageSidebar(props)  {
  const isNewWikiForm = props.location.pathname.endsWith('new')
  const {name, slug} = isNewWikiForm ? props.newWikiInfo : props.wikiInfo
  return (
    <Segment inverted color="black">
      <Menu vertical inverted pointing secondary >
        <Menu.Item active>
          { name }
        </Menu.Item>
        { !isNewWikiForm || props.location.pathname.endsWith('dataset')
          ?
            <Menu.Item
              className="link"
              name="view-wiki"
              as={Link}
              to={`/${props.username}/${slug}`}
            >
              {/* <DatasetViewSwitcher /> */}
            </Menu.Item>
          :
          null
        }
        { isNewWikiForm
          ?
            <WikiPageSidebarButton />
          :
          null
        }
      </Menu>
    </Segment>
  )
}

function mapStateToProps(state) {
  return {
    username: state.account.userInfo.username,
    wikiInfo: state.wikiApi.wikiInfo,
    newWikiInfo: state.wikiApi.newWikiInfo
  }
}

export default connectedWithRoutes(mapStateToProps)(WikiApiPageSidebar)

import React from 'react'
import { Menu, Segment } from 'semantic-ui-react'

import connectedWithRoutes from '../../hocs/connectedWithRoutes'
import WikiPageDropdown from './WikiPageDropdown'
import WikiPageSidebarButton from './WikiPageSidebarButton'

function WikiApiPageSidebar(props)  {
  return (
    <Segment inverted color="black">
      <Menu vertical inverted pointing secondary >
        <Menu.Item name='name' active>
          { props.name }
        </Menu.Item>
        <WikiPageDropdown />
        { props.location.pathname.endsWith('new')
          ?
            <WikiPageSidebarButton />
          :
          null
        }
      </Menu>
    </Segment>
  )
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    username: state.auth.username,
    name: state.wikiApi.name,
    slug: state.wikiApi.slug,
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return ownProps
}

export default connectedWithRoutes(mapStateToProps, mapDispatchToProps)(WikiApiPageSidebar)

import React from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'

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
        <WikiPageSidebarButton />
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

export default connect(mapStateToProps)(WikiApiPageSidebar)

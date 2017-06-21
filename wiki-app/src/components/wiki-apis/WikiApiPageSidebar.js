import React from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import connectedWithRoutes from '../../hocs/connectedWithRoutes'
import WikiPageDropdown from './WikiPageDropdown'
import WikiPageSidebarButton from './WikiPageSidebarButton'

function WikiApiPageSidebar(props)  {
  const isNewPageForm = props.location.pathname.endsWith('new')
  return (
    <Segment inverted color="black">
      <Menu vertical inverted pointing secondary >
        <Menu.Item name='name' active>
          { props.name }
        </Menu.Item>
        { isNewPageForm || props.location.pathname.endsWith('dataset')
          ?
            <Menu.Item
              className="link"
              name="view-wiki"
              as={Link}
              to={`/${props.username}/${props.slug}`}
            >
              {/* <DatasetViewSwitcher /> */}
            </Menu.Item>
          :
          null
        }
        <WikiPageDropdown />
        { isNewPageForm
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

import React from 'react'
import { NavLink } from 'react-router-dom'
import { Dropdown } from 'semantic-ui-react'

import connectedWithRoutes from '../../hocs/connectedWithRoutes'
import { fetchWikiApis, fetchWikiApi } from '../../actions/wikiApiActions'


const ApiNav = (props) => {
  let apiNav = (
    <Dropdown
      text="Your Apis"
      pointing
      onClick={() => {
        if(!props.apis.length) {
          props.apisClick()
        }
      }}
      disabled={props.apisLoading}
      loading={props.apisLoading}
      item
    >
      <Dropdown.Menu>
        {
          props.apis
            ?
              props.apis.map( api => (
                <Dropdown.Item
                  key={api.slug}
                  as={NavLink}
                  to={`/${props.username}/${api.slug}`}
                  onClick={() => props.apiLinkClick(api.slug)}
                  active={props.location.pathname.startsWith(`/${props.username}/${api.slug}`)}
                >
                  {api.name}
                </Dropdown.Item>
              ))
            :
            null
        }
      </Dropdown.Menu>
    </Dropdown>
  )
  if(!props.loggedIn) {
    apiNav = null
  }
  return apiNav
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    username: state.account.userInfo.username,
    loggedIn: state.account.loggedIn,
    apis: state.wikiApi.wikiApis,
    apisLoading: state.wikiApi.fetchWikiApis.areFetching
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    apisClick: () => dispatch(fetchWikiApis()),
    apiLinkClick: (slug) => dispatch(fetchWikiApi(slug))
  }
}

export default connectedWithRoutes(mapStateToProps, mapDispatchToProps)(ApiNav)

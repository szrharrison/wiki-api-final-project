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
        if(props.apis.length === 0) {
          props.apisClick()
        }
      }}
      loading={props.apisLoading}
      className='link item'>
      <Dropdown.Menu>
        {props.apis.map( api => (
          <Dropdown.Item
            key={api.slug}
          >
            <NavLink
              to={'/' + api.slug}
              onClick={() => props.apiLinkClick(api.slug)}
            >
              {api.name}
            </NavLink>
          </Dropdown.Item>
        ))}
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
    loggedIn: state.auth.loggedIn,
    apis: state.wikiApi.wikiApis,
    apisLoading: state.wikiApi.areFetching
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    apisClick: () => {
      dispatch(fetchWikiApis())
    },
    apiLinkClick: (slug) => {
      dispatch(fetchWikiApi(slug))
    }
  }
}

export default connectedWithRoutes(mapStateToProps, mapDispatchToProps)(ApiNav)

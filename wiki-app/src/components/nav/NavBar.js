import React from 'react'
import { Link } from 'react-router-dom'
import { Segment, Menu } from 'semantic-ui-react'

import connectedWithRoutes from '../../hocs/connectedWithRoutes'
import UserNav from './UserNav'
import ApiNav from './ApiNav'

import './NavBar.css'

function NavBar(props) {
  return (
    <Segment inverted color="black" className="nav">
      <Menu inverted pointing secondary stackable>
        <Menu.Item header color="grey" active={props.location.pathname === '/'} >
          <Link to="/">Wiki Api</Link>
        </Menu.Item>
        <ApiNav />
        <UserNav />
      </Menu>
    </Segment>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    loggedIn: state.account.loggedIn
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

export default connectedWithRoutes(mapStateToProps, mapDispatchToProps)(NavBar)

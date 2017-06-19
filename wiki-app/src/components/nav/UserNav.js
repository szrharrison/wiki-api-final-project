import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Dropdown, Icon } from 'semantic-ui-react'

import connectedWithRoutes from '../../hocs/connectedWithRoutes'
import { logOut } from '../../actions/authActions'

const UserNav = (props) => {
  const trigger = (
  <span>
    <Icon name='user circle' /> Hello, {props.username}
  </span>
)
  let userNav = (
    <Menu.Menu position="right">
      <Dropdown
        trigger={trigger}
        className="link item"
        pointing
      >
        <Dropdown.Menu>
          <Dropdown.Item
            icon="address card"
            content="Your Profile"
            as={Link}
            to="/account"
          />
          <Dropdown.Item
            icon="log out"
            content="Logout"
            as={Link}
            to="/"
            onClick={props.handleLogOut}
          />
        </Dropdown.Menu>
      </Dropdown>
      </Menu.Menu>
  )
  if(!props.loggedIn) {
    userNav = null
  }
  return userNav
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    loggedIn: state.auth.loggedIn,
    username: state.auth.username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogOut: () => {
      dispatch(logOut())
    }
  }
}

export default connectedWithRoutes(mapStateToProps, mapDispatchToProps)(UserNav)

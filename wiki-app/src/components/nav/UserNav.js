import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Dropdown, Icon } from 'semantic-ui-react'

import connectedWithRoutes from '../../hocs/connectedWithRoutes'
import { logOut } from '../../actions/authActions'

// const trigger = (
//   <span>
//     <Icon name='user' /> Hello
//   </span>
// )
//
// const options = [
//   {
//     key: 'user',
//     text: <span>Signed in as <strong>Bob Smith</strong></span>,
//     disabled: true,
//   },
//   { key: 'profile', text: 'Your Profile' },
//   { key: 'stars', text: 'Your Stars' },
//   { key: 'explore', text: 'Explore' },
//   { key: 'integrations', text: 'Integrations' },
//   { key: 'help', text: 'Help' },
//   { key: 'settings', text: 'Settings' },
//   { key: 'sign-out', text: 'Sign Out' },
// ]

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
          <Dropdown.Item>
            <Link to='/account'>Your Profile</Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link to="/"
              onClick={props.handleLogOut}
            >
              Logout
            </Link>
          </Dropdown.Item>
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

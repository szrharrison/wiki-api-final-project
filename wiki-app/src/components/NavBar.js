import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Segment, Menu, Dropdown, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'

import UserNav from './UserNav'

class NavBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selected: ''
    }
  }
  render() {
    const menuItems = (
      <Menu.Item color="grey">
      </Menu.Item>
    )
    return (
      <Segment inverted color="black" className="nav">
        <Menu inverted pointing secondary stackable>
          <Menu.Item header color="grey">
            <Link to="/">Wiki Api</Link>
          </Menu.Item>
          <Menu.Menu position='right'>
            <UserNav />
          </Menu.Menu>
        </Menu>
      </Segment>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    loggedIn: state.auth.loggedIn
  }
}

export default connect(mapStateToProps)(NavBar)

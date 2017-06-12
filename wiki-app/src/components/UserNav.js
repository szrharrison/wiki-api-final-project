import React from 'react'
import { connect } from 'react-redux'
import { Menu } from 'semantic-ui-react'

import { logOut } from '../actions'

const UserNav = (props) => {
  let userNav = (<Menu.Item name='logout' onClick={props.handleLogOut} color="grey"/>)
  if(!props.loggedIn) {
    userNav = null
  }
  return userNav
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    loggedIn: state.auth.loggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogOut: () => {
      dispatch(logOut())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserNav)

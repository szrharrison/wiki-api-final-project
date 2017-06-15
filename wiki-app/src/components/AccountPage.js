import React, { Component } from 'react'
import { Grid, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'

import isAuthenticated from '../hocs/isAuthenticated'
import WikiApiList from './wiki-apis/WikiApiList'
import { fetchAccountRefresh } from '../actions/authActions'

function AccountPage(props) {
  return (
    <Grid>
      <Grid.Row centered>
        <Header as='h2' content={`Welcome ${this.props.firstName} ${this.props.lastName}`} />
      </Grid.Row>
      <Grid.Row centered>
        <WikiApiList />
      </Grid.Row>
    </Grid>
  )
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    username: state.auth.username,
    firstName: state.auth.firstName,
    lastName: state.auth.lastName
  }
}

export default connect(mapStateToProps)(isAuthenticated(AccountPage))

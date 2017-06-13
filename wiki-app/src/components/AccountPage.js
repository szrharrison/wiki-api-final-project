import React, { Component } from 'react'
import { Grid, Header } from 'semantic-ui-react'

import isAuthenticated from '../hocs/isAuthenticated'
import connectedWithRoutes from '../hocs/connectedWithRoutes'
import WikiApiList from './wiki-apis/WikiApiList'
import { fetchAccountRefresh } from '../actions/authActions'

class AccountPage extends Component {
  componentDidMount() {
    if(!!localStorage.jwt && !this.props.firstName) {
      this.props.refreshAccount()
    }
  }

  render() {
    return (
      <Grid>
        <Grid.Row centered>
          <Header as='h2' content={'Welcome ' + this.props.firstName} />
        </Grid.Row>
        <Grid.Row centered>
          <WikiApiList />
        </Grid.Row>
      </Grid>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    username: state.auth.username,
    firstName: state.auth.firstName,
    lastName: state.auth.lastName
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    refreshAccount: () => dispatch(fetchAccountRefresh())
  }
}

export default connectedWithRoutes(mapStateToProps, mapDispatchToProps)(isAuthenticated(AccountPage))

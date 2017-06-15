import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import './App.css';

import connectedWithRoutes from '../hocs/connectedWithRoutes'

import NavBar from '../components/nav/NavBar'
import PageContainer from './PageContainer'
import WelcomePage from '../components/WelcomePage'
import AccountPage from '../components/AccountPage'
import SignUpForm from '../components/SignUpForm'
import { logInAction, fetchAccountRefresh } from '../actions/authActions'


class AppContainer extends Component {

  componentDidMount() {
    if(!!localStorage.jwt) {
      this.props.refreshAccount()
    }
  }

  render() {
    console.log(this.props)
    return (
      <div className="App">
        <NavBar />
        <Container>
          <Switch>
            <Route exact path="/" component={WelcomePage} />
            <Route exact path="/signup" component={SignUpForm} />
            <Route exact path="/account" component={AccountPage} />
            <Route path={':username/:relativePath+'} component={PageContainer} />
          </Switch>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    username: state.auth.username,
    firstName: state.auth.firstName,
    lastName: state.auth.lastName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loggedIn: () => dispatch(logInAction()),
    refreshAccount: () => dispatch(fetchAccountRefresh())
  }
}

export default connectedWithRoutes(mapStateToProps, mapDispatchToProps)(AppContainer)

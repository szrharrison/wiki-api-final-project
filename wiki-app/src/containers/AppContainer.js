import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import './App.css';

import connectedWithRoutes from '../hocs/connectedWithRoutes'

import NavBar from '../components/nav/NavBar'
import PageFormContainer from './PageFormContainer'
import PageContainer from './PageContainer'
import WelcomePage from '../components/WelcomePage'
import AccountPage from '../components/AccountPage'
import SignUpForm from '../components/SignUpForm'
import { logInAction } from '../actions/authActions'


class AppContainer extends Component {

  componentDidMount() {
    if(!!localStorage.jwt) {
      this.props.loggedIn(localStorage.username)
    }
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <Container>
          <Switch>
            <Route exact path="/" component={WelcomePage} />
            <Route exact path="/signup" component={SignUpForm} />
            <Route exact path="/account" component={AccountPage} />
            <Route exact path="/:slug" component={PageContainer} />
            <Route path="/:relativePath+/dataset" component={PageFormContainer} />
          </Switch>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loggedIn: () => {
      dispatch(logInAction())
    }
  }
}

export default connectedWithRoutes(mapStateToProps, mapDispatchToProps)(AppContainer)

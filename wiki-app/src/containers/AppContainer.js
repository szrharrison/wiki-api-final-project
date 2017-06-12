import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'
import './App.css';

import NavBar from '../components/NavBar'
import PageFormContainer from './PageFormContainer'
import WikiApiContainer from './WikiApiContainer'
import WelcomePage from '../components/WelcomePage'
import AccountPage from '../components/AccountPage'
import SignUpForm from '../components/SignUpForm'
import { logInAction } from '../actions'


class AppContainer extends Component {

  componentDidMount() {
    if(!!localStorage.jwt) {
      this.props.loggedIn()
    }
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <Container>
          <Switch>
            <Route exact path="/" component={WelcomePage} />
            <Route path="/signup" component={SignUpForm} />
            <Route path="/account" component={AccountPage} />
            <Route path="/wiki-apis" component={WikiApiContainer} />
            <Route path="/:relativePath+/dataset-test" component={PageFormContainer} />
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

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loggedIn: () => {
      dispatch(logInAction())
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppContainer))

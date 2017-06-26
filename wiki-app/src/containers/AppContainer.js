import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import './App.css';

import connectedWithRoutes from '../hocs/connectedWithRoutes'
import { fetchAccountRefresh } from '../actions/accountActions'

import NavBar from '../components/nav/NavBar'
import PageContainer from './PageContainer'
import WelcomePage from '../components/WelcomePage'
import AccountPage from '../components/AccountPage'
import SignUpForm from '../components/SignUpForm'
import WikiContainer from './WikiContainer'


class AppContainer extends Component {

  componentDidMount() {
    if(!!localStorage.jwt) {
      this.props.refreshAccount()
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
            <Route exact path="/:username/new" component={WikiContainer} />
            <Route exact path="/:username/:slug" component={WikiContainer} />
            <Route exact path="/:username/:slug/edit" component={WikiContainer} />
            <Route path="/:username/:relativePath+" component={PageContainer} />
          </Switch>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.account.userInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    refreshAccount: () => dispatch(fetchAccountRefresh())
  }
}

export default connectedWithRoutes(mapStateToProps, mapDispatchToProps)(AppContainer)

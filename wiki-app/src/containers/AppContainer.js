import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import connectedWithRoutes from '../hocs/connectedWithRoutes'
import { fetchAccountRefresh } from '../actions/accountActions'

class NavBar extends Component {
  componentWillMount = () => {
    import('../components/nav/NavBar').then(Component => {
      this.Component = Component
      this.forceUpdate()
    })
  }
  render = () => (
    this.Component ? <this.Component.default /> : null
  )
}
class PageContainer extends Component {
  componentWillMount = () => {
    import('./PageContainer').then(Component => {
      this.Component = Component
      this.forceUpdate()
    })
  }
  render = () => (
    this.Component ? <this.Component.default /> : null
  )
}
class WelcomePage extends Component {
  componentWillMount = () => {
    import('../components/WelcomePage').then(Component => {
      this.Component = Component
      this.forceUpdate()
    })
  }
  render = () => (
    this.Component ? <this.Component.default /> : null
  )
}
class AccountPage extends Component {
  componentWillMount = () => {
    import('../components/AccountPage').then(Component => {
      this.Component = Component
      this.forceUpdate()
    })
  }
  render = () => (
    this.Component ? <this.Component.default /> : null
  )
}
class SignUpForm extends Component {
  componentWillMount = () => {
    import('../components/SignUpForm').then(Component => {
      this.Component = Component
      this.forceUpdate()
    })
  }
  render = () => (
    this.Component ? <this.Component.default /> : null
  )
}
class WikiContainer extends Component {
  componentWillMount = () => {
    import('./WikiContainer').then(Component => {
      this.Component = Component
      this.forceUpdate()
    })
  }
  render = () => (
    this.Component ? <this.Component.default /> : null
  )
}


class AppContainer extends Component {

  componentDidMount() {
    if(!!localStorage.jwt) {
      this.props.refreshAccount()
    }
    import('./App.css')
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

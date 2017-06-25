import React, { Component } from 'react'
import { Form, Message, Segment } from 'semantic-ui-react'

import connectedWithRoutes from '../hocs/connectedWithRoutes'
import { fetchLogIn } from '../actions/accountActions'

class LogIn extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }
  }

  handleChange = (e, {name, value}) => {
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.handleLogin( this.state, this.props.history )

    this.setState({
      username: '',
      password: ''
    })
  }

  render() {
    const { username, password } = this.state
    return (
      <Segment inverted color="black">
        <Form
          onSubmit={this.handleSubmit}
          error={this.props.status === 'error'}
        >
          <Form.Group>
            <Form.Input
              placeholder="Username"
              name="username" value={username}
              onChange={ this.handleChange }
            />
            <Form.Input
              placeholder="Password"
              name="password"
              type="password"
              value={password}
              onChange={ this.handleChange }
            />
            <Form.Button
              content="Login"
              icon="sign in"
              loading={this.props.loading}
              color="teal"
            />
          </Form.Group>
          <Message
            error
            header='Invalid Log In'
            content={this.props.error}
          />
        </Form>
      </Segment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.account.fetchAuth.status,
    error: state.account.fetchAuth.error,
    loading: state.account.fetchAuth.isFetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogin: (account, history) => {
      dispatch(fetchLogIn(account, history))
    }
  }
}

export default connectedWithRoutes(mapStateToProps, mapDispatchToProps)(LogIn)

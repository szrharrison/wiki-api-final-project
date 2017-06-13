import React, { Component } from 'react'
import { Form, Message } from 'semantic-ui-react'

import connectedWithRoutes from '../hocs/connectedWithRoutes'
import { fetchLogIn } from '../actions/authActions'

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
      <Form onSubmit={this.handleSubmit} error={this.props.status === 'error'} loading={this.props.loading}>
        <Form.Group>
          <Form.Input placeholder="Username" name="username" value={username} onChange={ this.handleChange } />
          <Form.Input placeholder="Password" name="password" type="password" value={password} onChange={ this.handleChange } />
          <Form.Button content="Login" />
        </Form.Group>
        <Message
          error
          header='Invalid Log In'
          content={this.props.error}
        />
      </Form>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    status: state.auth.status,
    error: state.auth.error,
    loading: state.auth.isFetching
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleLogin: (account, history) => {
      dispatch(fetchLogIn(account, history))
    }
  }
}

export default connectedWithRoutes(mapStateToProps, mapDispatchToProps)(LogIn)

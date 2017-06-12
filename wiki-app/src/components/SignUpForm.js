import React, { Component } from 'react'
import { Form, Message, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { fetchSignUp } from '../actions'

class SignUpForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      first_name: '',
      last_name: ''
    }
  }

  handleChange = (e, {name, value}) => {
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.handleSignUp( this.state, this.props.history )

    this.setState({
      username: '',
      password: '',
      first_name: '',
      last_name: ''
    })
  }

  render() {
    // console.log(this.props.error);
    const { username, password, first_name, last_name } = this.state
    return (
      <Grid centered columns={3}>
        <Grid.Column>
          <Form
            onSubmit={this.handleSubmit}
            error={this.props.status === 'error'}
            loading={this.props.loading}
          >
            <Form.Input
              label="Username:"
              name="username"
              value={username}
              onChange={ this.handleChange }
              required
              error={this.props.status === 'error'}
            />
            <Form.Input
              label="Password:"
              name="password"
              type="password"
              value={password}
              onChange={ this.handleChange }
              required
              error={this.props.status === 'error'}
            />
            <Message
              error
              header='Invalid Credentials'
              content={this.props.error}
            />
            <Form.Input
              label="First Name:"
              name="first_name"
              value={first_name}
              onChange={ this.handleChange }
            />
            <Form.Input
              label="Last Name:"
              name="last_name"
              value={last_name}
              onChange={ this.handleChange }
            />
            <Form.Button content="Sign Up" />
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    status: state.account.status,
    error: state.account.error,
    loading: state.account.isPosting
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSignUp: (account, history) => {
      dispatch(fetchSignUp(account, history))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUpForm))

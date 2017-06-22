import React, { Component } from 'react'
import { Form, Message, Grid, Segment, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import connectedWithRoutes from '../hocs/connectedWithRoutes'
import { fetchSignUp } from '../actions/accountActions'

class SignUpForm extends Component {
  state = {
    username: '',
    password: '',
    first_name: '',
    last_name: ''
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
      password: ''
    })
  }

  render() {
    const { username, password, first_name, last_name } = this.state
    return (
      <Grid centered columns='equal'>
        <Grid.Column width={8}>
          <Segment inverted color='black'>
            <Header dividing as='h2' inverted>
              Sign Up
              <Header.Subheader>
                {'Already have an account? '}
                <Link
                  to='/'
                >
                  Login
                </Link>
              </Header.Subheader>
            </Header>
            <Form
              inverted
              onSubmit={this.handleSubmit}
              error={this.props.status === 'error'}
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
              <Form.Button
                loading={this.props.loading}
                icon="group"
                color="teal"
                content="Sign Up"
              />
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.account.status,
    error: state.account.error,
    loading: state.account.isPosting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSignUp: (account, history) => {
      dispatch(fetchSignUp(account, history))
    }
  }
}

export default connectedWithRoutes(mapStateToProps, mapDispatchToProps)(SignUpForm)

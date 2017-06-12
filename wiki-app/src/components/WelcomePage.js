import React from 'react'
import { Grid, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import Login from './LogIn'

function WelcomePage(props) {
  return (
    <Grid>
      <Grid.Row centered>
        <Header as='h2' content="Sign In:" />
      </Grid.Row>
      <Grid.Row centered>
        <Login />
      </Grid.Row>
      <Grid.Row centered>
        <Header as='h2' content='Dont have an account?' />
      </Grid.Row>
      <Grid.Row centered>
        <Link to='/signup' className="ui button inverted black" tabIndex="0">Sign Up</Link>
      </Grid.Row>
    </Grid>
  )
}

export default WelcomePage

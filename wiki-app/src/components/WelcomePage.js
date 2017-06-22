import React from 'react'
import { Grid, Header, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import Login from './LogIn'

function WelcomePage(props) {
  return (
    <Grid>
      <Grid.Row centered>
        <Header as='h2' content="Log In:" />
      </Grid.Row>
      <Grid.Row centered>
        <Login />
      </Grid.Row>
      <Grid.Row centered>
        <Header as='h2' content='Dont have an account?' />
      </Grid.Row>
      <Grid.Row centered>
        <Button
          as={Link}
          to="/signup"
          icon="group"
          inverted
          color="black"
          content="Sign Up"
        />
      </Grid.Row>
    </Grid>
  )
}

export default WelcomePage

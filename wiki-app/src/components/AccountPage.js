import React from 'react'
import { Grid, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

function AccountPage(props) {
  return (
    <Grid>
      <Grid.Row centered>
        <Header as='h2' content="Your Account" />
      </Grid.Row>
      <Grid.Row centered>
        <Link to='/wiki-apis'>View your wikis</Link>
      </Grid.Row>
    </Grid>
  )
}

export default AccountPage

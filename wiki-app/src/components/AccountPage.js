import React, { Component } from 'react'
import { Grid, Header, Dimmer, Loader, Segment, List } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchWikiApis } from '../actions/wikiApiActions'
import isAuthenticated from '../hocs/isAuthenticated'

class AccountPage extends Component {
  componentDidMount() {
    this.props.fetchWikiApis()
  }

  render() {
    return (
      <Grid>
        <Grid.Row centered>
          <Header as='h2' content={`Welcome ${this.props.firstName} ${this.props.lastName}`} />
        </Grid.Row>
        <Grid.Row centered>
          { this.props.areFetching || !this.props.wikiApis
            ?
              <Dimmer active>
                <Loader>Loading</Loader>
              </Dimmer>
            :
            <Segment color="black" inverted>
              <List>
                {this.props.wikiApis.map( wikiApi => (
                  <List.Item
                    key={wikiApi.slug}
                    as={Link}
                    to={`/${this.props.username}/${wikiApi.slug}`}
                    content={wikiApi.name}
                  />
                ))}
              </List>
            </Segment>
          }
        </Grid.Row>
      </Grid>
    )
  }
}

function mapStateToProps(state) {
  return {
    username: state.auth.username,
    firstName: state.auth.firstName,
    lastName: state.auth.lastName,
    areFetching: state.wikiApi.areFetching,
    wikiApis: state.wikiApi.wikiApis
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchWikiApis: () => dispatch(fetchWikiApis())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(isAuthenticated(AccountPage))

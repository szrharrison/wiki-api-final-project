import React, { Component } from 'react'
import { Grid, Header, Dimmer, Loader, Segment, List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { fetchWikiApis, fetchWikiApi } from '../actions/wikiApiActions'
import isAuthenticated from '../hocs/isAuthenticated'
import connectedWithRoutes from '../hocs/connectedWithRoutes'

class AccountPage extends Component {
  componentDidMount() {
    this.props.fetchWikiApis()
  }

  render() {
    return (
        <Grid inverted>
          <Grid.Row centered>
            <Header as='h2' content={`Welcome ${this.props.firstName} ${this.props.lastName}`} />
          </Grid.Row>
          <Grid.Row centered columns='equal' divided>
            <Segment color="black" inverted>
              <Header as={'h3'} content='Your Wiki Apis:' />
              { this.props.areFetching || !this.props.wikiApis
                ?
                  <Dimmer active>
                    <Loader>Loading</Loader>
                  </Dimmer>
                :
                <List>
                  {this.props.wikiApis.map( wikiApi => (
                    <List.Item
                      key={wikiApi.slug}
                      as={Link}
                      to={`/${this.props.username}/${wikiApi.slug}`}
                      content={wikiApi.name}
                      onClick={() => this.props.fetchWikiApi(wikiApi.slug)}
                    />
                  ))}
                </List>
              }
            </Segment>
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
    fetchWikiApis: () => dispatch(fetchWikiApis()),
    fetchWikiApi: slug => dispatch(fetchWikiApi(slug))
  }
}

export default connectedWithRoutes(mapStateToProps, mapDispatchToProps)(isAuthenticated(AccountPage))

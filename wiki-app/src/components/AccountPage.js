import React, { Component } from 'react'
import { Grid, Header, Dimmer, Loader, List, Icon, Form } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { fetchWikiApis, fetchWikiApi } from '../actions/wikiApiActions'
import { setNewUserValues, fetchUpdateUser } from '../actions/accountActions'
import isAuthenticated from '../hocs/isAuthenticated'
import connectedWithRoutes from '../hocs/connectedWithRoutes'

class AccountPage extends Component {

  componentDidMount() {
    this.props.fetchWikiApis()
    if(this.props.userInfo) {
      this.props.setNewUserValues(this.props.userInfo)
    }
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.newUserInfo.firstName && !this.props.newUserInfo.firstName && (!!this.props.userInfo.firstName || !!nextProps.userInfo.firstName)) {
      const userInfo = !!this.props.userInfo.firstName ? this.props.userInfo : nextProps.userInfo
      this.props.setNewUserValues(userInfo)
    }
  }

  handleChange = (e, {name, value}) => {
    this.props.setNewUserValues({
        ...this.props.newUserInfo,
        [name]: value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.fetchUpdateUser(this.props.newUserInfo, this.props.userInfo.username)
  }

  render() {
    const { firstName, lastName, username } = this.props.userInfo
    const newUserInfo = this.props.newUserInfo

    return (
        <Grid inverted stackable padded="vertically" divided columns={2}>
          <Grid.Row centered>
            <Header as='h2' content={`Welcome ${firstName} ${lastName}`} />
          </Grid.Row>
          <Grid.Row centered columns='equal' color="black">
            <Grid.Column>
              <Header textAlign='center' content='Your Wiki Apis:' dividing inverted />
              { this.props.areFetching || !this.props.wikiApis
                ?
                  <Dimmer active>
                    <Loader>Loading</Loader>
                  </Dimmer>
                :
                <List selection inverted animated>
                  <List.Item
                    as={Link}
                    to={`/${username}/new`}
                    content="Create a New Wiki"
                    icon="add"
                  />
                  {this.props.wikiApis.map( wikiApi => (
                    <List.Item
                      key={wikiApi.slug}
                      as={Link}
                      icon="linkify"
                      to={`/${username}/${wikiApi.slug}`}
                      content={wikiApi.name}
                      onClick={() => this.props.fetchWikiApi(wikiApi.slug)}
                    />
                  ))}
                </List>
              }
            </Grid.Column>
            <Grid.Column>
              <Header as='h2' textAlign='center' icon dividing inverted>
                <Icon name='settings' />
                Account Settings
                <Header.Subheader>
                  Manage your account settings and change user info
                </Header.Subheader>
              </Header>
              <Form inverted onSubmit={this.handleSubmit}>
                <Form.Input
                  label='First Name'
                  placeholder={firstName}
                  name='firstName' value={newUserInfo.firstName}
                  onChange={this.handleChange}
                />
                <Form.Input
                  label='Last Name'
                  placeholder={lastName}
                  name='lastName' value={newUserInfo.lastName}
                  onChange={this.handleChange}
                />
                <Form.Input
                  label='Username'
                  placeholder={username}
                  name='username' value={newUserInfo.username}
                  onChange={this.handleChange}
                />
                <Form.Button icon='save' color='green' content='Update User Info'/>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
    )
  }
}

function mapStateToProps(state) {
  return {
    userInfo: state.account.userInfo,
    newUserInfo: state.account.newUserInfo,
    areFetching: state.wikiApi.fetchWikiApis.areFetching,
    wikiApis: state.wikiApi.wikiApis
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchWikiApis: () => dispatch(fetchWikiApis()),
    fetchWikiApi: slug => dispatch(fetchWikiApi(slug)),
    setNewUserValues: newUserValues => dispatch(setNewUserValues(newUserValues)),
    fetchUpdateUser: (newUserInfo, username) => dispatch(fetchUpdateUser(newUserInfo, username))
  }
}

export default connectedWithRoutes(mapStateToProps, mapDispatchToProps)(isAuthenticated(AccountPage))

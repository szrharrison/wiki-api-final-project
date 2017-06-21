import React from 'react'
import { Header, List, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { fetchPage } from '../../actions/pageActions'
import connectedWithRoutes from '../../hocs/connectedWithRoutes'

function PagePage(props) {
  let pages = null
  if(props.subPages) {
    pages = props.subPages.map( subPage => (
      <List.Item
        key={subPage.slug}
        as={Link}
        to={`/${props.username}/${props.relativePath}/${subPage.slug}`}
        onClick={() => props.fetchPage(`${props.relativePath}/${subPage.slug}`)}
      >
        <List.Icon name="file" verticalAlign="middle" />
        <List.Content>
          <List.Header>{subPage.name}</List.Header>
          <List.Description>/{subPage.slug}</List.Description>
        </List.Content>
      </List.Item>
    ))
  }
  return (
    <Segment inverted>
      <Header as="h2" content={props.name} />
      <List inverted animated verticalAlign="middle">
        <List.Item as={Link} to={`/${props.username}/${props.relativePath}/new`}>
          <List.Icon name='add' />
          <List.Content>
            Add a page
          </List.Content>
        </List.Item>
        {pages}
      </List>
    </Segment>
  )
}

function mapStateToProps(state) {
  return {
    username: state.auth.username,
    name: state.page.name,
    subPages: state.page.subPages,
    relativePath: state.page.relativePath

  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPage: relativePath => dispatch(fetchPage(relativePath))
  }
}

export default connectedWithRoutes(mapStateToProps, mapDispatchToProps)(PagePage)

import React from 'react'
import { List, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { fetchPage } from '../../actions/pageActions'
import connectedWithRoutes from '../../hocs/connectedWithRoutes'

function PageList(props) {
  const { username, relativePath } = props
  let pages = null
  if(props.subPages) {
    pages = props.subPages.map( subPage => (
      <List.Item
        key={subPage.slug}
        as={Link}
        to={`/${username}/${relativePath}/${subPage.slug}`}
        onClick={() => props.fetchPage(`${relativePath}/${subPage.slug}`)}
      >
        <List.Icon name="file" verticalAlign="middle" />
        <List.Content>
          <List.Header>{subPage.name}</List.Header>
          <List.Description><Icon name='linkify'/>{'/ ' + subPage.slug}</List.Description>
        </List.Content>
      </List.Item>
      ))
    }
  return (
    <List inverted animated selection verticalAlign="middle">
      <List.Item as={Link} to={`/${username}/${relativePath}/new`}>
        <List.Icon name='add' />
        <List.Content>
          Add a page
        </List.Content>
      </List.Item>
      {pages}
    </List>
  )
}

function mapStateToProps(state) {
  return {
    username: state.account.userInfo.username,
    name: state.page.pageInfo.name,
    subPages: state.page.subPages,
    relativePath: state.page.pageInfo.relativePath

  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPage: relativePath => dispatch(fetchPage(relativePath))
  }
}

export default connectedWithRoutes(mapStateToProps, mapDispatchToProps)(PageList)

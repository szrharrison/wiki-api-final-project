import React from 'react'
import { Grid, List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import connectedWithRoutes from '../../hocs/connectedWithRoutes'

function PagePage(props) {
  let pages = null
  if(props.name) {
    pages = props.subPageSlugs.map( subPageSlug => (
      <List.Item key={subPageSlug} as={Link} to={`/${props.username}/${props.relativePath}/${subPageSlug}`}>
        {subPageSlug}
      </List.Item>
    ))
  }
  console.log(props)
  return (
    <Grid>
      <h2>{props.name}</h2>
      <List>
        <List.Item as={Link} to={`/${props.username}/${props.relativePath}/new`}>
          <List.Icon name='add' />
          <List.Content>
            Add a page
          </List.Content>
        </List.Item>
        {pages}
      </List>
    </Grid>
  )
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    username: state.auth.username,
    name: state.pageForm.name,
    subPageSlugs: state.pageForm.subPageSlugs,
    relativePath: state.pageForm.relativePath

  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return ownProps
}

export default connectedWithRoutes(mapStateToProps, mapDispatchToProps)(PagePage)

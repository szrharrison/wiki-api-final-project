import React from 'react'
import { Grid, List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

function PagePage(props) {
  let pages = null
  if(this.props.name) {
    pages = this.props.subPageSlugs.map( subPageSlug => (
      <List.Item key={subPageSlug}>
        <Link to={`/${this.props.relativePath}/${subPageSlug}`}>
          {subPageSlug}
        </Link>
      </List.Item>
    ))
  }
  return (
    <Grid>
      <h2>{this.props.name}</h2>
      <List>
        {pages}
      </List>
    </Grid>
  )
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    name: state.pageForm.name,
    subPageSlugs: state.pageForm.subPageSlugs,
    relativePath: state.pageForm.relativePath

  }
}

export default connect(mapStateToProps)(PagePage)

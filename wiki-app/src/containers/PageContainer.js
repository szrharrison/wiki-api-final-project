import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Grid, List } from 'semantic-ui-react'

import isAuthenticated from '../hocs/isAuthenticated'
import { fetchWikiApi } from '../actions/wikiApiActions'

class PageContainer extends Component {

  componentDidMount() {
    this.props.fetchWikiApi(this.props.match.params.slug)
  }



  render() {
    let pages = null
    if(this.props.wikiApi.pages) {
      pages = this.props.wikiApi.pages.map( page => (
        <List.Item key={page.relative_path}>
          <Link to={'/' + page.relative_path + '/dataset'}>
            {page.name}
          </Link>
        </List.Item>
      ))
    }
    return (
      <Grid>
        <h2>{this.props.wikiApi.name}</h2>
        <List>
          {pages}
        </List>
      </Grid>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    ...state.wikiApi
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    fetchWikiApi: (apiSlug) => dispatch(fetchWikiApi(apiSlug))
  }
}

export default isAuthenticated(connect(mapStateToProps, mapDispatchToProps)(PageContainer))

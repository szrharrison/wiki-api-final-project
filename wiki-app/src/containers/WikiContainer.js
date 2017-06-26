import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'

import isAuthenticated from '../hocs/isAuthenticated'
import connectedWithRoutes from '../hocs/connectedWithRoutes'
import { fetchWikiApi } from '../actions/wikiApiActions'

import WikiApiPage from '../components/wiki-apis/WikiApiPage'
import WikiApiPageSidebar from '../components/wiki-apis/WikiApiPageSidebar'
import WikiFormContainer from './WikiFormContainer'

class WikiContainer extends Component {

  componentDidMount() {
    if( this.props.isWiki && !this.props.isLoading) {
      this.props.fetchWikiApi(this.props.slug)
    }
  }

  componentWillReceiveProps(nextProps) {
    const isWikiAlreadyLoaded = nextProps.slug === nextProps.wikiSlug
    const wikiShouldFetch = nextProps.isWiki && !isWikiAlreadyLoaded && !nextProps.isLoading
    if (wikiShouldFetch) {
      nextProps.fetchWikiApi(nextProps.slug)
    }
  }



  render() {
    return (
      <Grid>
        <Grid.Column width={4}>
          <WikiApiPageSidebar />
        </Grid.Column>
        <Grid.Column width={12}>
          <Switch>
            <Route exact path="/:username/:slug/edit" component={WikiFormContainer} />
            <Route exact path="/:username/new" component={WikiFormContainer} />
            <Route path='/:username/:slug' component={WikiApiPage} />
          </Switch>
        </Grid.Column>
      </Grid>
    )
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.wikiApi.isCreating || state.wikiApi.isUpdating || state.wikiApi.fetchWikiApi.isFetching,
    wikiSlug: state.wikiApi.wikiInfo.slug
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchWikiApi: slug => dispatch(fetchWikiApi(slug))
  }
}

export default connectedWithRoutes(mapStateToProps, mapDispatchToProps)(isAuthenticated(WikiContainer))

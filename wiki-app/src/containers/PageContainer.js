import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'

import isAuthenticated from '../hocs/isAuthenticated'
import connectedWithRoutes from '../hocs/connectedWithRoutes'
import { fetchPage } from '../actions/pageActions'
import { fetchWikiApi } from '../actions/wikiApiActions'

import PageFormContainer from './PageFormContainer'
import PagePage from '../components/page/PagePage'
import PageFormSidebar from '../components/page/PageFormSidebar'
import WikiApiPage from '../components/wiki-apis/WikiApiPage'
import WikiApiPageSidebar from '../components/wiki-apis/WikiApiPageSidebar'

class PageContainer extends Component {

  componentDidMount() {

    let pagePath = this.props.match.params.relativePath
    if( pagePath.split('/').length > 1 ) {
      this.props.fetchPage(pagePath)
      this.ShowComponent = PagePage
      this.ShowComponentSidebar = PageFormSidebar
    } else {
      this.props.fetchWikiApi(pagePath)
      this.ShowComponent = WikiApiPage
      this.ShowComponentSidebar = WikiApiPageSidebar
    }
  }

  componentWillReceiveProps(nextProps) {
    const nextPagePath = nextProps.match.params.relativePath
    let nextPageSlugArray = nextPagePath.split('/')
    if(nextPagePath.endsWith('dataset') || nextPagePath.endsWith('new')) {
      nextPageSlugArray.pop()
    }
    const nextPageSlug = nextPageSlugArray.join('/')
    const isWiki = nextPageSlugArray.length === 1
    const isPageAlreadyLoaded = nextPageSlug === nextProps.pagePath
    const isWikiAlreadyLoaded = nextPageSlug === nextProps.wikiSlug
    const pageShouldFetch = !isWiki && !isPageAlreadyLoaded && !nextProps.isLoadingPage
    const wikiShouldFetch = isWiki && !isWikiAlreadyLoaded && !nextProps.isLoadingWiki
    if( !isWiki ) {
      this.ShowComponentSidebar = PageFormSidebar
      this.ShowComponent = PagePage
      if(nextPagePath.endsWith('new')) {
        this.ShowComponent = PageFormContainer
      }
      if(pageShouldFetch) {
        nextProps.fetchPage(nextPageSlug)
      }
    } else {
      this.ShowComponentSidebar = WikiApiPageSidebar
      this.ShowComponent = WikiApiPage
      if(nextPagePath.endsWith('new')) {
        this.ShowComponent = PageFormContainer
      }
      if (wikiShouldFetch) {
        nextProps.fetchWikiApi(nextPageSlug)
      }
    }
  }



  render() {
    return (
      <Grid>
        <Grid.Column width={4}>
          <Switch>
            <Route exact path='/:username/:relativePath+' component={this.ShowComponentSidebar} />
            <Route path="/:username/:relativePath+" component={PageFormSidebar} />
          </Switch>
        </Grid.Column>
        <Grid.Column width={12}>
          <Switch>
            <Route exact path="/:username/:relativePath+/new" component={this.ShowComponent} />
            <Route exact path="/:username/:relativePath+/dataset" component={PageFormContainer} />
            <Route path='/:username/:relativePath+' component={this.ShowComponent} />
          </Switch>
        </Grid.Column>
      </Grid>
    )
  }
}

function mapStateToProps(state) {
  return {
    isLoadingPage: state.page.isCreating || state.page.isUpdating || state.page.isFetching,
    isLoadingWiki: state.wikiApi.isCreating || state.wikiApi.isUpdating || state.wikiApi.isFetching,
    wikiSlug: state.wikiApi.slug,
    pagePath: state.page.relativePath
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPage: relativePath => dispatch(fetchPage(relativePath)),
    fetchWikiApi: relativePath => dispatch(fetchWikiApi(relativePath))
  }
}

export default connectedWithRoutes(mapStateToProps, mapDispatchToProps)(isAuthenticated(PageContainer))

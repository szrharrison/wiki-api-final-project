import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'

import isAuthenticated from '../hocs/isAuthenticated'
import connectedWithRoutes from '../hocs/connectedWithRoutes'
import { fetchPage } from '../actions/pageActions'
import { fetchWikiApi } from '../actions/wikiApiActions'
import PageFormSidebar from '../components/page/PageFormSidebar'

class PageFormContainer extends Component {
  componentWillMount = () => {
    import('./PageFormContainer').then( Component => {
      this.Component = Component
      this.forceUpdate()
    })
  }
  render = () => (
    this.Component? <this.Component.default /> : null
  )
}
class PagePage extends Component {
  componentWillMount = () => {
    import('../components/page/PagePage').then( Component => {
      this.Component = Component
      this.forceUpdate()
    })
  }
  render = () => (
    this.Component? <this.Component.default /> : null
  )
}

class PageContainer extends Component {

  componentDidMount() {
    if( !this.props.isWiki ) {
      this.props.fetchPage(this.props.relativePath)
    }
  }

  componentWillReceiveProps(nextProps) {
    const isPageAlreadyLoaded = nextProps.relativePath === nextProps.pagePath
    const pageShouldFetch = !nextProps.isWiki && !isPageAlreadyLoaded && !nextProps.isLoadingPage
    if(pageShouldFetch) {
      nextProps.fetchPage(nextProps.relativePath)
    }
  }



  render() {
    return (
      <Grid>
        <Grid.Column width={4}>
          <PageFormSidebar />
        </Grid.Column>
        <Grid.Column width={12}>
          <Switch>
            <Route exact path="/:username/:relativePath+/new" component={PageFormContainer} />
            <Route exact path="/:username/:relativePath+/dataset" component={PageFormContainer} />
            <Route path='/:username/:relativePath+' component={PagePage} />
          </Switch>
        </Grid.Column>
      </Grid>
    )
  }
}

function mapStateToProps(state) {
  return {
    isLoadingPage: state.page.createPage.isCreating || state.page.updatePage.isUpdating || state.page.fetchPage.isFetching,
    isLoadingWiki: state.wikiApi.isCreating || state.wikiApi.isUpdating || state.wikiApi.fetchWikiApi.isFetching,
    wikiSlug: state.wikiApi.wikiInfo.slug,
    pagePath: state.page.pageInfo.relativePath
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPage: relativePath => dispatch(fetchPage(relativePath)),
    fetchWikiApi: relativePath => dispatch(fetchWikiApi(relativePath))
  }
}

export default connectedWithRoutes(mapStateToProps, mapDispatchToProps)(isAuthenticated(PageContainer))

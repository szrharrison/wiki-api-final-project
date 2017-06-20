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
    let pagePath = nextProps.match.params.relativePath
    let pageSlug = pagePath.split('/')
    if(pagePath.endsWith('dataset') || pagePath.endsWith('new')) {
      pageSlug.pop()
    }
    if(pageSlug.length > 1) {
      nextProps.fetchPage(pageSlug.join('/'))
      this.ShowComponentSidebar = PageFormSidebar
      if(pagePath.endsWith('new')) {
        this.ShowComponent = PageFormContainer
      } else {
        this.ShowComponent = PagePage
      }
    } else if(pagePath.endsWith('new')) {
      nextProps.fetchWikiApi(pageSlug[0])
      this.ShowComponent = PageFormContainer
      this.ShowComponentSidebar = WikiApiPageSidebar
    } else {
      nextProps.fetchWikiApi(pageSlug[0])
      this.ShowComponent = WikiApiPage
      this.ShowComponentSidebar = WikiApiPageSidebar
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
            <Route exact path='/:username/:relativePath+' component={this.ShowComponent} />
          </Switch>
        </Grid.Column>
      </Grid>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return ownProps
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    fetchPage: relativePath => dispatch(fetchPage(relativePath)),
    fetchWikiApi: relativePath => dispatch(fetchWikiApi(relativePath))
  }
}

export default connectedWithRoutes(mapStateToProps, mapDispatchToProps)(isAuthenticated(PageContainer))

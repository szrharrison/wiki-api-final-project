import React, { Component } from 'react'
import { Breadcrumb } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import connectedWithRoutes from '../../../hocs/connectedWithRoutes'
import { fetchWikiApi } from '../../../actions/wikiApiActions'
import { fetchPage } from '../../../actions/pageActions'
import { setNewPageInfo } from '../../../actions/pageFormActions'
import { fetchDataset } from '../../../actions/datasetActions'


class NewPagePageBreadcrumbs extends Component {
  state = {
    value: ''
  }
  componentDidMount() {
    this.props.setNewPageInfo({
      ...this.props.newPageInfo,
      slug: ''
    })
  }

  onChange = (e) => {
    const slug = e.target.value
    this.setState({
      value: slug
    })
  }

  render() {
    const newPageSlugForm = {
      key: "new-page-slug-form",
      content: this.props.newPageInfo.slug ? this.props.newPageInfo.slug : "Page Slug"
    }
    const wikiSlug = this.props.match.params.relativePath.split('/')[0]
    const isBasePage = this.props.match.params.relativePath === wikiSlug
    if(isBasePage) {
      let breadcrumbs = [{
        key: wikiSlug,
        content: (
          <Link
            to={`/${this.props.username}/${wikiSlug}`}
            onClick={() => this.props.fetchWikiApi(wikiSlug)}
          >
            {wikiSlug}
          </Link>
        )
      }]
      breadcrumbs.push(newPageSlugForm)
      return (
        <Breadcrumb icon='caret right' sections={breadcrumbs} />
      )
    } else if( !!this.props.match.params.relativePath && !this.props.isFetching ) {
      let splitPath = this.props.relativePath.split('/')
      let breadcrumbs = splitPath.map( (path,i) => {
        const relativePath = splitPath.slice(0, i + 1 ).join('/')
        let url = `/${this.props.username}/${relativePath}`

        return {
          key: relativePath,
          content: (
            <Link
              to={url}
              onClick={() => {
                if( i === 0 ) {
                  this.props.fetchWikiApi(wikiSlug)
                } else {
                  this.props.fetchPageData(relativePath)
                }
              }}
            >
              {path}
            </Link>
          )
        }
      })
      breadcrumbs.push(newPageSlugForm)

      return (
        <Breadcrumb icon='caret right' sections={breadcrumbs} />
      )
    } else {
      return null
    }
  }
}

function mapStateToProps( state ) {
  return {
    username: state.account.userInfo.username,
    relativePath: state.page.relativePath,
    wikiSlug: state.wikiApi.wikiInfo.slug,
    isFetching: state.page.fetchPage.isFetching,
    newPageInfo: state.pageForm.newPageInfo
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPageData: relativePath => {
      dispatch(fetchPage(relativePath))
      dispatch(fetchDataset(relativePath))
    },
    fetchWikiApi: slug => dispatch(fetchWikiApi(slug)),
    setNewPageInfo: pageInfo => dispatch(setNewPageInfo(pageInfo))
  }
}
export default connectedWithRoutes(mapStateToProps, mapDispatchToProps)(NewPagePageBreadcrumbs)

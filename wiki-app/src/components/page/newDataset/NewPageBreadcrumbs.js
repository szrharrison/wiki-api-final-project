import React, { Component } from 'react'
import { Breadcrumb } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import connectedWithRoutes from '../../../hocs/connectedWithRoutes'
import { fetchWikiApi } from '../../../actions/wikiApiActions'
import { fetchPage } from '../../../actions/pageActions'
import { setNewPageSlug } from '../../../actions/pageFormActions'
import { fetchDataset } from '../../../actions/datasetActions'


class NewPagePageBreadcrumbs extends Component {
  state = {
    value: ''
  }
  componentDidMount() {
    this.props.setNewPageSlug('')
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
      content: this.props.newPageSlug ? this.props.newPageSlug : "Page Slug"
    }
    const isBasePage = this.props.relativePath === this.props.slug
    if(isBasePage) {
      let breadcrumbs = [{
        key: this.props.slug,
        content: (
          <Link
            to={`/${this.props.username}/${this.props.slug}`}
            onClick={() => this.props.fetchWikiApi(this.props.slug)}
          >
            {this.props.slug}
          </Link>
        )
      }]
      breadcrumbs.push(newPageSlugForm)
      return (
        <Breadcrumb icon='caret right' sections={breadcrumbs} />
      )
    } else if( !!this.props.relativePath && !this.props.isFetching ) {
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
                  this.props.fetchWikiApi(this.props.slug)
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
    relativePath: state.page.pageInfo.relativePath,
    wikiSlug: state.wikiApi.wikiInfo.slug,
    isFetching: state.page.fetchPage.isFetching,
    newPageSlug: state.pageForm.newPageInfo.slug
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPageData: relativePath => {
      dispatch(fetchPage(relativePath))
      dispatch(fetchDataset(relativePath))
    },
    fetchWikiApi: slug => dispatch(fetchWikiApi(slug)),
    setNewPageSlug: slug => dispatch(setNewPageSlug(slug))
  }
}
export default connectedWithRoutes(mapStateToProps, mapDispatchToProps)(NewPagePageBreadcrumbs)

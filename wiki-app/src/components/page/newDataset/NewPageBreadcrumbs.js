import React, { Component } from 'react'
import { Breadcrumb } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import connectedWithRoutes from '../../../hocs/connectedWithRoutes'
import { fetchWikiApi } from '../../../actions/wikiApiActions'
import { fetchPage } from '../../../actions/pageActions'
import { setNewSlug } from '../../../actions/pageFormActions'
import { fetchDataset } from '../../../actions/datasetActions'


class NewPagePageBreadcrumbs extends Component {
  state = {
    value: ''
  }
  componentDidMount() {
    this.props.setNewSlug('')
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
      content: this.props.newSlug ? this.props.newSlug : "Page Slug"
    }
    const isBasePage = this.props.match.params.relativePath === this.props.wikiSlug
    if(isBasePage) {
      let breadcrumbs = [{
        key: this.props.wikiSlug,
        content: (
          <Link
            to={`/${this.props.username}/${this.props.wikiSlug}`}
            onClick={() => this.props.fetchWikiApi(this.props.wikiSlug)}
          >
            {this.props.wikiSlug}
          </Link>
        )
      }]
      breadcrumbs.push(newPageSlugForm)
      return (
        <Breadcrumb icon='caret right' sections={breadcrumbs} />
      )
    }
    if( !!this.props.relativePath && !this.props.isFetching ) {
      let splitPath = this.props.relativePath.split('/')
      let breadcrumbs = splitPath.map( (path,i) => {
        const relativePath = splitPath.slice(0, i + 1 ).join('/')
        let url = `/${this.props.username}/${relativePath}`
        return {
          key: relativePath,
          content: (
            <Link
              to={url}
              onClick={() => this.props.fetchPageData(relativePath)}
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
    username: state.auth.userInfo.username,
    relativePath: state.page.relativePath,
    wikiSlug: state.wikiApi.slug,
    isFetching: state.page.isFetching,
    newSlug: state.pageForm.newSlug
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPageData: relativePath => {
      dispatch(fetchPage(relativePath))
      dispatch(fetchDataset(relativePath))
    },
    fetchWikiApi: slug => dispatch(fetchWikiApi(slug)),
    setNewSlug: slug => dispatch(setNewSlug(slug))
  }
}
export default connectedWithRoutes(mapStateToProps, mapDispatchToProps)(NewPagePageBreadcrumbs)

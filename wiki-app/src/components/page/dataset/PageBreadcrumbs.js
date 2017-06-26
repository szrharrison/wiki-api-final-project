import React, { Component } from 'react'
import { Breadcrumb, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchWikiApi } from '../../../actions/wikiApiActions'
import { fetchPage } from '../../../actions/pageActions'
import { setNewPageSlug } from '../../../actions/pageFormActions'
import { fetchDataset } from '../../../actions/datasetActions'


class PageBreadcrumbs extends Component {
  componentDidMount() {
    if(this.props.pageSlug) {
      this.props.setNewPageSlug(this.props.pageSlug)
      this.span.textContent = this.props.pageSlug
      const inputSize = this.span.getBoundingClientRect().width + 8
      this.input.style.width = inputSize + 'px' // set the width based on the width of the span
    }
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.newPageSlug && !this.props.newPageSlug && (this.props.pageSlug || nextProps.pageSlug)) {
      let slug
      if(this.props.pageSlug) {
        slug = this.props.pageSlug
      } else {
        slug = nextProps.pageSlug
      }
      this.props.setNewPageSlug(slug)
      this.span.textContent = slug
      const inputSize = this.span.getBoundingClientRect().width + 8
      this.input.style.width = inputSize + 'px'
    }
  }

  onChange = (e) => {
    const slug = e.target.value
    this.props.setNewPageSlug(slug)
    this.span.textContent = slug
    const inputSize = this.span.getBoundingClientRect().width + 8
    this.input.style.width = inputSize + 'px'
  }

  render() {
    if( !!this.props.relativePath && !this.props.isFetching ) {
      let splitPath = this.props.relativePath.split('/')
      let breadcrumbs = splitPath.map( (path,i) => {
        const relativePath = splitPath.slice(0, i + 1 ).join('/')
        let url = `/${this.props.username}/${relativePath}`
        if(i) {
          url = `/${this.props.username}/${relativePath}/dataset`
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
        }
        return {
          key: relativePath,
          content: (
            <Link
              to={url}
              onClick={() => this.props.fetchWikiApi(relativePath)}
            >
              {path}
            </Link>
          )
        }
      })
      breadcrumbs.pop()
      breadcrumbs.push({
        key: "page-slug-form",
        content: (
          <Form id="slug-editor">
            <Form.Field
              inline
            >
              <input
                onChange={this.onChange}
                placeholder={this.props.pageSlug}
                type="text"
                name="slug"
                spellCheck={false}
                ref={input => this.input = input}
                value={this.props.newPageSlug}
              />
              <span ref={span => this.span = span}>
                {this.props.newPageSlug}
              </span>
            </Form.Field>
          </Form>
        )
      })
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
    pageSlug: state.page.pageInfo.slug,
    newPageSlug: state.pageForm.newPageInfo.slug,
    isFetching: state.page.fetchPage.isFetching
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPageData: (relativePath) => {
      dispatch(fetchPage(relativePath))
      dispatch(fetchDataset(relativePath))
    },
    setNewPageSlug: slug => dispatch(setNewPageSlug(slug)),
    fetchWikiApi: slug => dispatch(fetchWikiApi(slug))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PageBreadcrumbs)

// Resize based on text if text.length > 0
// Otherwise resize based on the placeholder

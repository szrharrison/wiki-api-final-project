import React, { Component } from 'react'
import { Breadcrumb, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchWikiApi } from '../../../actions/wikiApiActions'
import { fetchPage } from '../../../actions/pageActions'
import { setNewSlug } from '../../../actions/pageFormActions'
import { fetchDataset } from '../../../actions/datasetActions'


class PageBreadcrumbs extends Component {
  componentDidMount() {
    if(this.props.slug) {
      this.props.setNewSlug(this.props.slug)
      this.span.textContent = this.props.slug
      const inputSize = this.span.getBoundingClientRect().width + 8
      this.input.style.width = inputSize + 'px' // set the width based on the width of the span
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if(!nextProps.newSlug && !this.props.newSlug && (this.props.slug || nextProps.slug)) {
      let slug
      if(this.props.slug) {
        slug = this.props.slug
      } else {
        slug = nextProps.slug
      }
      this.props.setNewSlug(slug)
      // this.span.textContent = slug
      // const inputSize = this.span.getBoundingClientRect().width + 8
      // this.input.style.width = inputSize + 'px'
    }
  }

  onChange = (e) => {
    const slug = e.target.value
    this.props.setNewSlug(slug)
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
                placeholder={this.props.slug}
                type="text"
                name="slug"
                spellCheck={false}
                ref={input => this.input = input}
                value={this.props.newSlug}
              />
              <span ref={span => this.span = span}>
                {this.props.newSlug}
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

function mapStateToProps( state, ownProps ) {
  return {
    ...ownProps,
    username: state.auth.username,
    relativePath: state.page.relativePath,
    slug: state.page.slug,
    newSlug: state.pageForm.newSlug,
    isFetching: state.page.isFetching
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    fetchPageData: (relativePath) => {
      dispatch(fetchPage(relativePath))
      dispatch(fetchDataset(relativePath))
    },
    setNewSlug: slug => dispatch(setNewSlug(slug)),
    fetchWikiApi: slug => dispatch(fetchWikiApi(slug))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PageBreadcrumbs)

// Resize based on text if text.length > 0
// Otherwise resize based on the placeholder

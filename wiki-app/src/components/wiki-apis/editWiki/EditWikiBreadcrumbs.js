import React, { Component } from 'react'
import { Breadcrumb, Input, Message, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'

import { setNewWikiSlug } from '../../../actions/wikiApiActions'
import './EditWikiBreadcrumbs.css'


class EditWikiBreadcrumbs extends Component {
  componentDidMount() {
    if(this.props.wikiSlug) {
      this.props.setNewWikiSlug(this.props.wikiSlug)
      this.span.textContent = this.props.wikiSlug
      const inputSize = this.span.getBoundingClientRect().width + 8
      this.input.style.width = inputSize + 'px' // set the width based on the width of the span
    }
    import('./EditWikiBreadcrumbs.css')
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.newWikiSlug && !this.props.newWikiSlug && (this.props.wikiSlug || nextProps.wikiSlug)) {
      let slug
      if(this.props.wikiSlug) {
        slug = this.props.wikiSlug
      } else {
        slug = nextProps.wikiSlug
      }
      this.props.setNewWikiSlug(slug)
      this.span.textContent = slug
      const inputSize = this.span.getBoundingClientRect().width + 8
      this.input.style.width = inputSize + 'px'
    } else if (!nextProps.newWikiSlug && nextProps.wikiSlug) {
      this.span.textContent = nextProps.wikiSlug
      const inputSize = this.span.getBoundingClientRect().width + 8
      this.input.style.width = inputSize + 'px'
    }
  }

  onChange = (e) => {
    const slug = e.target.value
    this.props.setNewWikiSlug(slug)
    this.span.textContent = slug
    const inputSize = this.span.getBoundingClientRect().width + 8
    this.input.style.width = inputSize + 'px'
  }

  render() {
    const isSlugError = !!this.props.newWikiErrors.filter( error => error[0] === 'Slug' ).filter( error => error[1] ).length
    const slugErrors = this.props.newWikiErrors.filter( error => error[0] === 'Slug' )
    const breadcrumbs = [{
      key: "wiki-slug-form",
      content: (
        <Input
          id='wiki-slug-form'
          transparent
          error={isSlugError}
          onChange={this.onChange}
          placeholder={this.props.wikiSlug}
          name='slug'
          iconPosition='left'
          spellCheck={false}
        >
          { isSlugError
            ?
              <Icon name='exclamation' color='red' />
            :
            <Icon name='check' color='green' />
          }
          <input
            ref={input => this.input = input}
            value={this.props.newWikiSlug}
          />
          <span ref={span => this.span = span}>
            {this.props.newWikiSlug}
          </span>
        </Input>
      )
    }]
    return (
      <div>
        <Breadcrumb icon='caret right' sections={breadcrumbs} />
        <Message
          attached='bottom'
          error
          hidden={!isSlugError}
          icon='exclamation circle'
          header={'Error with Slug:'}
          content={slugErrors.map( (error, i) => `${i+1}. ${error[1]}\n`)}
        />
      </div>
    )
  }
}

function mapStateToProps( state ) {
  return {
    wikiSlug: state.wikiApi.wikiInfo.slug,
    newWikiSlug: state.wikiApi.newWikiInfo.slug,
    newWikiErrors: state.wikiApi.newWikiInfo.errors
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setNewWikiSlug: slug => dispatch(setNewWikiSlug(slug)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditWikiBreadcrumbs)

// Resize based on text if text.length > 0
// Otherwise resize based on the placeholder

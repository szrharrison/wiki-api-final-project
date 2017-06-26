import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Segment, Input, Header, Breadcrumb, Message, Icon, Popup } from 'semantic-ui-react'

import { setNewWikiInfo } from '../actions/wikiApiActions'
import connectedWithRoutes from '../hocs/connectedWithRoutes'

import WikiApiPageSidebar from '../components/wiki-apis/WikiApiPageSidebar'


class WikiFormContainer extends Component {
  state = {
    showErrors: false
  }

  componentDidMount() {
    this.props.setNewWikiInfo({
      name: '',
      slug: ''
    })
  }

  onChange = (e) => {
    const name = e.target.value
    const slug = name
    .trim()
    .toLowerCase()
    .replace(/[\s./\\]/g, '-')
    .replace(/[^\w-]/g, '')
    .replace(/[-]{2,}/g, '-')
    .replace(/[_]{2,}/g, '_')
    .replace(/[-_]{2,}/g, '-')
    .replace(/^[-_]+/, "")
    .replace(/[-_]+$/, "")
    this.props.setNewWikiInfo({
      name,
      slug
    })
  }

  render() {
    const isNewWikiForm = this.props.location.pathname.endsWith('new')
    const hasSubmitErrors = isNewWikiForm ? !!this.props.creationErrors : !!this.props.updateErrors
    const hasNewErrors = !!this.props.newWikiInfo.errors[0][0]
    let errors = [[null, null]]
    if(isNewWikiForm && hasSubmitErrors) {
      errors = this.props.creationErrors
    } else if(hasSubmitErrors) {
      errors = this.props.updateErrors
    } else if (hasNewErrors) {
      errors = this.props.newWikiInfo.errors
    }

    const isSlugError = !!errors.filter( error => error[0] === 'Slug' ).length
    const slugErrors = errors.filter( error => error[0] === 'Slug' )
    const isNameError = !!errors.filter( error => error[0] === 'Name' ).length
    const nameErrors = errors.filter( error => error[0] === 'Name' )
    const { name, slug } = this.props.newWikiInfo
    const wikiSlugForm = [{
        key: "slug-form",
        content: (
          <Input
            transparent
            error={isSlugError}
            placeholder={this.props.wikiInfo.slug}
            iconPosition='left'
          >
            { isSlugError
              ?
                <Icon
                  name='exclamation'
                  color='red'
                />
              :
              null
            }
            <input
              ref={input => this.input = input}
              value={slug}
              spellCheck={false}
            />
            <span ref={span => this.span = span}>
              {slug}
            </span>
          </Input>
        )
      }]
    return (
      <Grid>
        <Grid.Column width={4}>
          <WikiApiPageSidebar />
        </Grid.Column>
        <Grid.Column width={12}>
          <Segment inverted color='black'>
            <Input
              id='name'
              transparent
              fluid
              size='huge'
              error={isNameError}
              value={name}
              onChange={this.onChange}
              placeholder="Wiki Name"
              icon={ isNameError ? { name: 'exclamation', color: 'red'} : null }
              iconPosition='left'
            />
            <Message
              attached='bottom'
              error
              hidden={!isNameError && !this.state.showErrors}
              icon='exclamation circle'
              header={'Error with Name:'}
              content={nameErrors.map( (error, i) => `${i+1}. ${error[1]}\n`)}
            />
            <Breadcrumb icon='caret right' id='slug-editor' sections={wikiSlugForm} />
            <Message
              attached='bottom'
              error
              hidden={!isSlugError && !this.state.showErrors}
              icon='exclamation circle'
              header={'Error with Slug:'}
              content={slugErrors.map( (error, i) => `${i+1}. ${error[1]}\n`)}
            />
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}

function mapStateToProps( state ) {
  return {
    newWikiInfo: state.wikiApi.newWikiInfo,
    wikiInfo: state.wikiApi.wikiInfo,
    creationErrors: state.wikiApi.createWikiApi.error,
    updateErrors: state.wikiApi.updateWikiApi.error,
  }
}

function mapDispatchToProps( dispatch ) {
  return {
    setNewWikiInfo: (wikiInfo) => dispatch(setNewWikiInfo(wikiInfo))
  }
}

export default connectedWithRoutes(mapStateToProps, mapDispatchToProps)(WikiFormContainer)

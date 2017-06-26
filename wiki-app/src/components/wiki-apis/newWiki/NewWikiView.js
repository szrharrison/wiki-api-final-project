import React, { Component } from 'react'
import { Segment, Input, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'

import { setNewWikiInfo } from '../../../actions/wikiApiActions'
import NewWikiBreadcrumbs from './NewWikiBreadcrumbs'

class NewWikiView extends Component {
  componentDidMount() {
    this.props.setNewWikiInfo({
      ...this.props.newWikiInfo,
      name: '',
      slug: ''
    }
    )
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
      ...this.props.newWikiInfo,
      name,
      slug
    })
  }

  render() {
    const { name, errors } = this.props.newWikiInfo
    const isNameError = !!errors.filter( error => error[0] === 'Name' ).filter( error => error[1] ).length
    const nameErrors = errors.filter( error => error[0] === 'Name' )
    return (
      <Segment inverted className='wiki-editor'>
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
          hidden={!isNameError}
          icon='exclamation circle'
          header={'Error with Name:'}
          content={nameErrors.map( (error, i) => `${i+1}. ${error[1]}\n`)}
        />
        <NewWikiBreadcrumbs />
      </Segment>
    )
  }
}

function mapStateToProps(state) {
  return {
    newWikiInfo: state.wikiApi.newWikiInfo
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setNewWikiInfo: wikiInfo => dispatch(setNewWikiInfo(wikiInfo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewWikiView)

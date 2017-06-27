import React, { Component } from 'react'
import { Input, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'

import { setNewWikiName } from '../../../actions/wikiApiActions'

class WikiName extends Component {
  componentDidMount() {
    this.props.setNewWikiName(this.props.wikiName)
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.newWikiName && !this.props.newWikiName && (this.props.wikiName || nextProps.wikiName)) {
      const name = this.props.wikiName ? this.props.wikiName : nextProps.wikiName
      this.props.setNewWikiName(name)
    }
  }

  onChange = e => {
    const name = e.target.value
    this.props.setNewWikiName(name)
  }

  render() {
    const isNameError = !!this.props.newWikiErrors.filter( error => error[0] === 'Name' ).filter( error => error[1] ).length
    const nameErrors = this.props.newWikiErrors.filter( error => error[0] === 'Name' )
    return (
      <div>
        <Input
          id='name'
          transparent
          fluid
          size='huge'
          error={isNameError}
          value={this.props.newWikiName}
          onChange={this.onChange}
          placeholder={this.props.wikiName}
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
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    newWikiName: state.wikiApi.newWikiInfo.name,
    newWikiErrors: state.wikiApi.newWikiInfo.errors,
    wikiName: state.wikiApi.wikiInfo.name
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setNewWikiName: name => dispatch(setNewWikiName(name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WikiName)

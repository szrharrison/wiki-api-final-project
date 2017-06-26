import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
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
    return (
      <Form id="name-editor">
        <Form.Input
          value={this.props.newWikiName}
          onChange={this.onChange}
          placeholder={this.props.wikiName}
        />
      </Form>
    )
  }
}

function mapStateToProps(state) {
  return {
    newWikiName: state.wikiApi.newWikiInfo.name,
    wikiName: state.wikiApi.wikiInfo.name
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setNewWikiName: name => dispatch(setNewWikiName(name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WikiName)

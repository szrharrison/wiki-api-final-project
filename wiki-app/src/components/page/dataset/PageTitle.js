import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

import connectedWithRoutes from '../../../hocs/connectedWithRoutes'
import { setNewName } from '../../../actions/pageFormActions'

class PageTitle extends Component {
  componentDidMount() {
    if(this.props.location.pathname.endsWith('dataset')) {
      this.props.setNewName(this.props.name)
    } else {
      this.props.setNewName('')
    }
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.newName && !this.props.newName && (this.props.name || nextProps.name)) {
      const name = this.props.name ? this.props.name : nextProps.name
      this.props.setNewName(name)
    }
  }

  onChange = e => {
    const name = e.target.value
    this.props.setNewName(name)
  }

  render() {
    return (
      <Form id="name-editor">
        <Form.Input
          value={this.props.newName}
          onChange={this.onChange}
          placeholder={this.props.name}
        />
      </Form>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    newName: state.pageForm.newName,
    name: state.page.name
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    setNewName: name => dispatch(setNewName(name))
  }
}

export default connectedWithRoutes(mapStateToProps, mapDispatchToProps)(PageTitle)

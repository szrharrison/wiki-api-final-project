import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

import connectedWithRoutes from '../../../hocs/connectedWithRoutes'
import { setNewPageName } from '../../../actions/pageFormActions'

class PageTitle extends Component {
  componentDidMount() {
    if(this.props.location.pathname.endsWith('dataset')) {
      this.props.setNewPageName(this.props.pageName)
    } else {
      this.props.setNewPageName('')
    }
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.newPageName && !this.props.newPageName && (this.props.pageName || nextProps.pageName)) {
      const name = this.props.pageName ? this.props.pageName : nextProps.pageName
      this.props.setNewPageName(name)
    }
  }

  onChange = e => {
    const name = e.target.value
    this.props.setNewPageName(name)
  }

  render() {
    return (
      <Form id="name-editor">
        <Form.Input
          value={this.props.newPageName}
          onChange={this.onChange}
          placeholder={this.props.pageName}
        />
      </Form>
    )
  }
}

function mapStateToProps(state) {
  return {
    newPageName: state.pageForm.newPageInfo.name,
    pageName: state.page.pageInfo.name
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setNewPageName: name => dispatch(setNewPageName(name))
  }
}

export default connectedWithRoutes(mapStateToProps, mapDispatchToProps)(PageTitle)

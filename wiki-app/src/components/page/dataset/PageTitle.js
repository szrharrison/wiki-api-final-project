import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

import connectedWithRoutes from '../../../hocs/connectedWithRoutes'
import { setNewPageInfo } from '../../../actions/pageFormActions'

class PageTitle extends Component {
  componentDidMount() {
    if(this.props.location.pathname.endsWith('dataset')) {
      this.props.setNewPageInfo({
        ...this.props.newPageInfo,
        name: this.props.pageInfo.name
      })
    } else {
      this.props.setNewPageInfo({
        ...this.props.newPageInfo,
        name: ''
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.newPageInfo.name && !this.props.newPageInfo.name && (this.props.pageInfo.name || nextProps.pageInfo.name)) {
      const name = this.props.pageInfo.name ? this.props.pageInfo.name : nextProps.pageInfo.name
      this.props.setNewPageInfo({
        ...this.props.newPageInfo,
        name
      })
    }
  }

  onChange = e => {
    const name = e.target.value
    this.props.setNewPageInfo({
      ...this.props.newPageInfo,
      name
    })
  }

  render() {
    return (
      <Form id="name-editor">
        <Form.Input
          value={this.props.newPageInfo.name}
          onChange={this.onChange}
          placeholder={this.props.pageInfo.name}
        />
      </Form>
    )
  }
}

function mapStateToProps(state) {
  return {
    newPageInfo: state.pageForm.newPageInfo,
    pageInfo: state.page.pageInfo
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setNewPageInfo: pageInfo => dispatch(setNewPageInfo(pageInfo))
  }
}

export default connectedWithRoutes(mapStateToProps, mapDispatchToProps)(PageTitle)

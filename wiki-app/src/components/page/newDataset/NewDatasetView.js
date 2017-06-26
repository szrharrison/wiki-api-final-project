import React, { Component } from 'react'
import { Segment, Dimmer, Loader, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'

import '../custom.css'

import { setNewPageInfo } from '../../../actions/pageFormActions'
import NewPageBreadcrumbs from './NewPageBreadcrumbs'
import NewDatasetJsonEditor from './NewDatasetJsonEditor'

class NewDatasetView extends Component {
  componentDidMount() {
    this.props.setNewPageInfo({
      ...this.props.newPageInfo,
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

    this.props.setNewPageInfo({
      ...this.props.newPageInfo,
      name,
      slug
    })
  }

  render() {
    return (
      <Segment inverted className='dataset-editor'>
        <Dimmer active={this.props.isFetching}>
          <Loader size='massive'>Loading</Loader>
        </Dimmer>
        <Form id="name-editor">
          <Form.Input
            value={this.props.newPageInfo.name}
            onChange={this.onChange}
            placeholder="Page Title"
          />
        </Form>
        { !this.props.isFetching
          ?
            <div>
              <NewPageBreadcrumbs />
              { this.props.jsonView
                ?
                  <NewDatasetJsonEditor/>
                :
                  null
              }
            </div>
          :
            null
        }
      </Segment>
    )
  }
}

function mapStateToProps(state) {
  return {
    jsonView: state.page.jsonView,
    newPageInfo: state.pageForm.newPageInfo
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setNewPageInfo: pageInfo => dispatch(setNewPageInfo(pageInfo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDatasetView)

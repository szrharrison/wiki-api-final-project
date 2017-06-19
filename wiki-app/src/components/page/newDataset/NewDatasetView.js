import React, { Component } from 'react'
import { Segment, Dimmer, Loader, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'

import '../custom.css'

import { setNewSlug, setNewName } from '../../../actions/pageFormActions'
import NewPageBreadcrumbs from './NewPageBreadcrumbs'
import NewDatasetJsonEditor from './NewDatasetJsonEditor'

class NewDatasetView extends Component {
  componentDidMount() {
    this.props.setNewName('')
  }

  onChange = (e) => {
    const name = e.target.value
    this.props.setNewName(name)
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
    this.props.setNewSlug(slug)
  }

  render() {
    return (
      <Segment inverted className='dataset-editor'>
        <Dimmer active={this.props.isFetching}>
          <Loader size='massive'>Loading</Loader>
        </Dimmer>
        <Form id="name-editor">
          <Form.Input
            value={this.props.newName}
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

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    jsonView: state.page.jsonView,
    newName: state.pageForm.newName
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    setNewSlug: slug => dispatch(setNewSlug(slug)),
    setNewName: name => dispatch(setNewName(name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDatasetView)

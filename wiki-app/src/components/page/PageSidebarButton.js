import React from 'react'
import { Button } from 'semantic-ui-react'

import connectedWithRoutes from '../../hocs/connectedWithRoutes'
import { fetchUpdateDataset } from '../../actions/datasetActions'
import { fetchCreatePage, fetchUpdatePage } from '../../actions/pageActions'

function PageSidebarButton(props)  {
  const errors = props.jsonStatus !== 'no errors'
  const locationArray = props.match.params.relativePath.split('/')
  const relativePath = locationArray.slice(0, -1).join('/')
  const locationEnding = locationArray.slice(-1)[0]
  const locationSlug = locationArray.slice(-2)[0]
  const errorLabelProps = { basic: true, color: 'red', pointing: 'left', content: 'syntax error' }
  return (
    <Button
      color={ errors ? 'red' : 'green' }
      disabled={errors}
      content={ locationEnding === 'new' ? 'Create New Page' : 'Save' }
      icon='save'
      attached='bottom'
      label={ errors ? errorLabelProps : null }
      onClick={() => {
        if(locationEnding === 'dataset') {
          props.updateDataset(props.dataset, relativePath)
          props.updatePage({name: props.newName, slug: props.newSlug}, relativePath)
          if(locationSlug !== props.newSlug) {
            props.history.push(`/${props.username}/${props.parentPath}/${props.newSlug}/${locationEnding}`)
          }
        } else if(locationEnding === 'new') {
          props.createPage({ name: props.newName}, relativePath)
        }
      }}
    />
  )
}

function mapStateToProps(state) {
  return {
    username: state.auth.username,
    slug: state.page.slug,
    newSlug: state.pageForm.newSlug,
    parentPath: state.page.parentPath,
    jsonStatus: state.dataset.jsonStatus,
    newName: state.pageForm.newName,
    dataset: state.dataset.dataset
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateDataset: (dataset, relativePath) => dispatch(fetchUpdateDataset(dataset, relativePath)),
    updatePage:  (page, relativePath) => dispatch(fetchUpdatePage(page, relativePath)),
    createPage: (page, relativePath) => dispatch(fetchCreatePage(page, relativePath))
  }
}

export default connectedWithRoutes(mapStateToProps, mapDispatchToProps)(PageSidebarButton)

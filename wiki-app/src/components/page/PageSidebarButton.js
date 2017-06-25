import React from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import connectedWithRoutes from '../../hocs/connectedWithRoutes'
import { fetchUpdateDataset } from '../../actions/datasetActions'
import { fetchCreatePage, fetchUpdatePage } from '../../actions/pageActions'

function PageSidebarButton(props)  {
  let error = props.jsonStatus.replace(/^Unexpected token (.)/, 'Unexpected token \u2AA1\u00A0$1\u00A0\u2AA2')
  if( props.newNameError !== 'no errors') {
    error = props.newNameError
  }
  if( props.newSlugError !== 'no errors') {
    error = props.newSlugError
  }
  const errors = error !== 'no errors'
  let locationEnding = ''
  const relativePathArray = props.location.pathname.replace(/^\/.*?\//, '').split('/')
  if( props.location.pathname.endsWith('new') || props.location.pathname.endsWith('dataset') ) {
    locationEnding = relativePathArray.pop()
  } else {
    return (
      <Button
        as={Link}
        to={props.location.pathname + '/dataset'}
        content='Edit Page'
        icon='edit'
        attached='bottom'
      />
    )
  }
  const relativePath = relativePathArray.join('/')
  const parentPath = relativePathArray.slice(0, -1).join('/')
  const locationSlug = relativePathArray.slice(-1)[0]
  const errorLabelProps = { basic: true, color: 'red', pointing: 'left', content: error }
  return (
    <Button
      color={ errors ? 'red' : 'green' }
      content={ locationEnding === 'new' ? 'Create New Page' : 'Save' }
      icon='save'
      attached='bottom'
      label={ errors ? errorLabelProps : null }
      onClick={() => {
        if(locationEnding === 'dataset' && !errors) {
          props.updateDataset(props.dataset, relativePath)
          props.updatePage({name: props.newName, slug: props.newSlug}, relativePath)
          if(locationSlug !== props.newSlug) {
            props.history.push(`/${props.username}/${parentPath}/${props.newSlug}/${locationEnding}`)
          }
        } else if(locationEnding === 'new' && !errors) {
          props.createPage({ name: props.newName}, relativePath)
          props.history.push(`/${props.username}/${relativePath}/${props.newSlug}`)
        }
      }}
    />
  )
}

function mapStateToProps(state) {
  return {
    username: state.account.userInfo.username,
    slug: state.page.slug,
    newSlug: state.pageForm.newSlug,
    newSlugError: state.pageForm.newSlugError,
    newName: state.pageForm.newName,
    newNameError: state.pageForm.newNameError,
    jsonStatus: state.pageForm.jsonStatus,
    dataset: state.dataset.data
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

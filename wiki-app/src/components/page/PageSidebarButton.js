import React from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import connectedWithRoutes from '../../hocs/connectedWithRoutes'
import { fetchUpdateDataset } from '../../actions/datasetActions'
import { fetchCreatePage, fetchUpdatePage } from '../../actions/pageActions'

function PageSidebarButton(props)  {
  let error = props.jsonStatus.replace(/^Unexpected token (.)/, 'Unexpected token \u2AA1\u00A0$1\u00A0\u2AA2')
  const isNameError = !!props.newPageInfo.errors.filter( error => error[0] === 'Name').length
  const isSlugError = !!props.newPageInfo.errors.filter( error => error[0] === 'Slug').length
  if( isNameError ) {
    error = props.newPageInfo.errors.filter( error => error[0] === 'Name' ).map(error => error[1])
  }
  if( isSlugError ) {
    error = props.newPageInfo.errors.filter( error => error[0] === 'Slug' ).map(error => error[1])
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
          props.updatePage(props.newPageInfo, relativePath)
          if(locationSlug !== props.newPageInfo.slug) {
            props.history.push(`/${props.username}/${parentPath}/${props.newPageInfo.slug}/${locationEnding}`)
          }
        } else if(locationEnding === 'new' && !errors) {
          props.createPage({ name: props.newPageInfo.name}, relativePath)
          props.history.push(`/${props.username}/${relativePath}/${props.newPageInfo.slug}`)
        }
      }}
    />
  )
}

function mapStateToProps(state) {
  return {
    username: state.account.userInfo.username,
    slug: state.page.slug,
    newPageInfo: state.pageForm.newPageInfo,
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

import React from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import connectedWithRoutes from '../../hocs/connectedWithRoutes'
import { fetchUpdateDataset } from '../../actions/datasetActions'
import { fetchCreatePage, fetchUpdatePage, fetchCreateWikiPage } from '../../actions/pageActions'

function PageSidebarButton(props)  {
  let error = props.jsonStatus.replace(/^Unexpected token (.)/, 'Unexpected token \u2AA1\u00A0$1\u00A0\u2AA2')
  const isNameError = !!props.newPageInfo.errors.filter( error => error[0] === 'Name').filter( error => error[1] ).length
  const isSlugError = !!props.newPageInfo.errors.filter( error => error[0] === 'Slug').filter( error => error[1] ).length
  if( isNameError ) {
    error = props.newPageInfo.errors.filter( error => error[0] === 'Name' ).map(error => error[1])
  }
  if( isSlugError ) {
    error = props.newPageInfo.errors.filter( error => error[0] === 'Slug' ).map(error => error[1])
  }
  const errors = error !== 'no errors'
  if( !props.isNewForm && !props.isEditForm ) {
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
  const errorLabelProps = { basic: true, color: 'red', pointing: 'left', content: error }
  return (
    <Button
      color={ errors ? 'red' : 'green' }
      content={ props.isNewForm ? 'Create New Page' : 'Save' }
      icon='save'
      attached='bottom'
      label={ errors ? errorLabelProps : null }
      onClick={() => {
        if(props.isEditForm && !errors) {
          props.updateDataset(props.dataset, props.relativePath)
          props.updatePage(props.newPageInfo, props.relativePath)
          if(props.slug !== props.newPageInfo.slug) {
            props.history.push(`/${props.username}/${props.parentPath}/${props.newPageInfo.slug}/${props.locationEnding}`)
          }
        } else if(props.isNewForm && !errors && !props.isWiki) {
          props.createPage({ name: props.newPageInfo.name}, props.relativePath)
          props.history.push(`/${props.username}/${props.relativePath}/${props.newPageInfo.slug}`)
        } else if(props.isNewForm && !errors) {
          props.createWikiPage({ name: props.newPageInfo.name }, props.slug)
          props.history.push(`/${props.username}/${props.slug}/${props.newPageInfo.slug}`)
        }
      }}
    />
  )
}

function mapStateToProps(state) {
  return {
    username: state.account.userInfo.username,
    pageSlug: state.page.pageInfo.slug,
    newPageInfo: state.pageForm.newPageInfo,
    jsonStatus: state.pageForm.jsonStatus,
    dataset: state.dataset.data
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateDataset: (dataset, relativePath) => dispatch(fetchUpdateDataset(dataset, relativePath)),
    updatePage:  (page, relativePath) => dispatch(fetchUpdatePage(page, relativePath)),
    createPage: (page, relativePath) => dispatch(fetchCreatePage(page, relativePath)),
    createWikiPage: (page, slug) => dispatch(fetchCreateWikiPage(page, slug))
  }
}

export default connectedWithRoutes(mapStateToProps, mapDispatchToProps)(PageSidebarButton)

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

import connectedWithRoutes from '../../hocs/connectedWithRoutes'
import { createWikiApi, fetchUpdateWikiApi } from '../../actions/wikiApiActions'

const WikiPageSidebarButton = props => {
  const { name} = props.newWikiInfo
  const errors = !!props.newWikiInfo.errors.filter( error => error[1] ).length
  if( !props.isNewForm && !props.isEditForm ) {
    return (
      <Button
        content='Edit Wiki API'
        icon='edit'
        attached='bottom'
        as={Link}
        to={`/${props.username}/${props.wikiSlug}/edit`}
      />
    )
  }
  return (
    <Button
      color={ errors ? 'red' : 'green' }
      disabled={errors}
      content={props.isNewForm ? 'Create New Wiki API' : 'Save Wiki API'}
      icon='save'
      attached='bottom'
      onClick={() => {
        if( props.isNewForm ) {
          props.createWikiApi(name)
        } else {
          props.updateWikiApi(props.newWikiInfo, props.wikiSlug)
        }
        // this.props.history.push(`/${this.props.username}/${slug}`)
      }}
    />
  )
}

function mapStateToProps(state) {
  return {
    username: state.account.userInfo.username,
    wikiSlug: state.wikiApi.wikiInfo.slug,
    newWikiInfo: state.wikiApi.newWikiInfo
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createWikiApi: name => dispatch(createWikiApi(name)),
    updateWikiApi: (newWikiInfo, slug) => dispatch(fetchUpdateWikiApi(newWikiInfo, slug))
  }
}

export default connectedWithRoutes(mapStateToProps, mapDispatchToProps)(WikiPageSidebarButton)

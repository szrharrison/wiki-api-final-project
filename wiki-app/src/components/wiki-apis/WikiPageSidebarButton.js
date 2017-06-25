import React from 'react'
import { Button } from 'semantic-ui-react'

import connectedWithRoutes from '../../hocs/connectedWithRoutes'
import { fetchCreateWikiPage } from '../../actions/pageActions'

function WikiPageSidebarButton(props)  {
  const errors = props.jsonStatus !== 'no errors' || !props.newName
  const errorLabelProps = { basic: true, color: 'red', pointing: 'left', content: 'error' }
  return (
    <Button
      color={ errors ? 'red' : 'green' }
      disabled={errors}
      content='Create New Page'
      icon='save'
      attached='bottom'
      label={ errors ? errorLabelProps : null }
      onClick={() => {
        props.createPage({ name: props.newName }, props.wikiSlug)
        props.history.push(`/${props.username}/${props.wikiSlug}/${props.newSlug}`)
      }}
    />
  )
}

function mapStateToProps(state) {
  return {
    username: state.account.userInfo.username,
    wikiSlug: state.wikiApi.slug,
    jsonStatus: state.dataset.jsonStatus,
    newName: state.pageForm.newName,
    newSlug: state.pageForm.newSlug,
    dataset: state.dataset.data
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createPage: (page, relativePath) => dispatch(fetchCreateWikiPage(page, relativePath))
  }
}

export default connectedWithRoutes(mapStateToProps, mapDispatchToProps)(WikiPageSidebarButton)

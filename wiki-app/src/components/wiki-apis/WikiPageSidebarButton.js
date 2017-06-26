import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

import connectedWithRoutes from '../../hocs/connectedWithRoutes'
import { createWikiApi, fetchUpdateWikiApi } from '../../actions/wikiApiActions'

class WikiPageSidebarButton extends Component {

  render() {
    const { name, slug } = this.props.newWikiInfo
    const isNewWikiForm = this.props.location.pathname.endsWith('new')
    const errors = !!this.props.newWikiInfo.errors[0][0]
    return (
      <Button
        color={ errors ? 'red' : 'green' }
        disabled={errors}
        content={isNewWikiForm ? 'Create New Wiki API' : 'Save Wiki API'}
        icon='save'
        attached='bottom'
        onClick={() => {
          if( isNewWikiForm ) {
            this.props.createWikiApi(name)
          } else {
            this.props.updateWikiApi(this.props.newWikiInfo, this.props.wikiInfo.slug)
          }
          // this.props.history.push(`/${this.props.username}/${slug}`)
        }}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    username: state.account.userInfo.username,
    wikiInfo: state.wikiApi.wikiInfo,
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

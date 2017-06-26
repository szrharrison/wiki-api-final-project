import React, { Component } from 'react'
import { Link, Switch, Route } from 'react-router-dom'

import { setNewWikiInfo } from '../actions/wikiApiActions'
import connectedWithRoutes from '../hocs/connectedWithRoutes'

import NewWikiView from '../components/wiki-apis/newWiki/NewWikiView'
import EditWikiView from '../components/wiki-apis/editWiki/EditWikiView'


class WikiFormContainer extends Component {
  state = {
    showErrors: false
  }

  render() {
    const hasSubmitErrors = this.props.isNewForm ? !!this.props.creationErrors : !!this.props.updateErrors
    const hasNewErrors = !!this.props.newWikiInfo.errors[0][0]
    let errors = [[null, null]]
    if(this.props.isNewForm && hasSubmitErrors) {
      errors = this.props.creationErrors
    } else if(hasSubmitErrors) {
      errors = this.props.updateErrors
    }


    // const wikiSlugForm = [{
    //     key: "slug-form",
    //     content: (
    //       <Input
    //         transparent
    //         error={isSlugError}
    //         placeholder={this.props.wikiInfo.slug}
    //         iconPosition='left'
    //       >
    //         { isSlugError
    //           ?
    //             <Icon
    //               name='exclamation'
    //               color='red'
    //             />
    //           :
    //           null
    //         }
    //         <input
    //           ref={input => this.input = input}
    //           value={slug}
    //           spellCheck={false}
    //         />
    //         <span ref={span => this.span = span}>
    //           {slug}
    //         </span>
    //       </Input>
    //     )
    //   }]
    return (
      <Switch>
        <Route exact path='/:username/new' component={NewWikiView} />
        <Route exact path='/:username/:slug/edit' component={EditWikiView} />
      </Switch>
    )
  }
}

function mapStateToProps( state ) {
  return {
    newWikiInfo: state.wikiApi.newWikiInfo,
    wikiInfo: state.wikiApi.wikiInfo,
    creationErrors: state.wikiApi.createWikiApi.error,
    updateErrors: state.wikiApi.updateWikiApi.error,
  }
}

function mapDispatchToProps( dispatch ) {
  return {
    setNewWikiInfo: (wikiInfo) => dispatch(setNewWikiInfo(wikiInfo))
  }
}

export default connectedWithRoutes(mapStateToProps, mapDispatchToProps)(WikiFormContainer)

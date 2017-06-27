import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'

import NewWikiView from '../components/wiki-apis/newWiki/NewWikiView'
import EditWikiView from '../components/wiki-apis/editWiki/EditWikiView'


const WikiFormContainer = props => {
  return (
    <Switch>
      <Route exact path='/:username/new' component={NewWikiView} />
      <Route exact path='/:username/:slug/edit' component={EditWikiView} />
    </Switch>
  )
}

export default withRouter(WikiFormContainer)

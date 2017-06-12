import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import isAuthenticated from '../hocs/isAuthenticated'
import WikiApiList from '../components/wiki-apis/WikiApiList'
import { fetchWikiApis } from '../actions'

class WikiApiContainer extends Component {

  componentDidMount() {
    this.props.fetchWikiApis()
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/wiki-apis" component={WikiApiList} />
          <Route path="/wiki-apis/:slug" />
        </Switch>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    fetchWikiApis: () => dispatch(fetchWikiApis())
  }
}

export default isAuthenticated(connect(mapStateToProps, mapDispatchToProps)(WikiApiContainer))

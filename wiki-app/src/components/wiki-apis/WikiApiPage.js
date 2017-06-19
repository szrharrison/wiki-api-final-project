import React from 'react'
import { Header, Dimmer, Loader } from 'semantic-ui-react'

import connectedWithRoutes from '../../hocs/connectedWithRoutes'
import { fetchWikiApi } from '../../actions/wikiApiActions'
import WikiApiList from './WikiApiList'

const WikiApiPage = (props) => {
  const { name, pages, slug } = props
  const wikiApi = { name, pages, slug }
  return (
    <div>
      <Header as="h2" content={name} />
      { props.pages.length && !props.isFetching
        ?
          <WikiApiList wikiApi={wikiApi} />
        :
        <Dimmer active>
          <Loader>Loading</Loader>
        </Dimmer>
      }
    </div>
  )
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    username: state.auth.username,
    name: state.wikiApi.name,
    slug: state.wikiApi.slug,
    pages: state.wikiApi.pages,
    isFetching: state.wikiApi.isFetching
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchWikiApi: slug => dispatch(fetchWikiApi(slug))
  }
}

export default connectedWithRoutes(mapStateToProps, mapDispatchToProps)(WikiApiPage)

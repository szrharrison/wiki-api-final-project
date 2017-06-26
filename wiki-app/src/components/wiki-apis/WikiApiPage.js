import React from 'react'
import { Header, Dimmer, Loader, Segment } from 'semantic-ui-react'

import connectedWithRoutes from '../../hocs/connectedWithRoutes'
import WikiApiList from './WikiApiList'

const WikiApiPage = (props) => {
  const { name, pages, slug } = props
  const wikiApi = { name, pages, slug }
  return (
    <Segment color="black" inverted>
      <Header as="h2" content={name} />
      { slug && !props.isFetching
        ?
          <WikiApiList wikiApi={wikiApi} />
        :
        <Dimmer active>
          <Loader>Loading</Loader>
        </Dimmer>
      }
    </Segment>
  )
}

function mapStateToProps(state) {
  return {
    username: state.account.userInfo.username,
    name: state.wikiApi.wikiInfo.name,
    slug: state.wikiApi.wikiInfo.slug,
    pages: state.wikiApi.pages,
    isFetching: state.wikiApi.fetchWikiApi.isFetching
  }
}

export default connectedWithRoutes(mapStateToProps)(WikiApiPage)

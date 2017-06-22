import React from 'react'
import { Header, Dimmer, Loader, Segment } from 'semantic-ui-react'

import connectedWithRoutes from '../../hocs/connectedWithRoutes'
import { fetchWikiApi } from '../../actions/wikiApiActions'
import WikiApiList from './WikiApiList'

const WikiApiPage = (props) => {
  const { name, pages, slug } = props
  const wikiApi = { name, pages, slug }
  console.log(wikiApi)
  return (
    <Segment color="black" inverted>
      <Header as="h2" content={name} />
      { props.pages.length && !props.isFetching
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
    username: state.auth.username,
    name: state.wikiApi.name,
    slug: state.wikiApi.slug,
    pages: state.wikiApi.pages,
    isFetching: state.wikiApi.isFetching
  }
}

export default connectedWithRoutes(mapStateToProps)(WikiApiPage)

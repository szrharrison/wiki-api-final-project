import React from 'react'
import { Accordion } from 'semantic-ui-react'

import connectedWithRoutes from '../../hocs/connectedWithRoutes'
import { fetchWikiApis, fetchWikiApi } from '../../actions/wikiApiActions'
import WikiApiListItem from './WikiApiListItem'

function constructNestedPages(pages, accumulator = {}) {
  pages.forEach( page => {
    page.subPages = {}
    const pageSlugsArray = page.relative_path.split('/')
    pageSlugsArray.shift()
    page.pageSlugs = pageSlugsArray.join('/')
    if(pageSlugsArray.length === 1) {
      accumulator[pageSlugsArray[0]] = page
    } else {
      recursivelyNestPage(page, accumulator)
    }
  })
  return accumulator
}

function recursivelyNestPage(page, accumulator) {
  const pageSlugsArray = page.pageSlugs.split('/')
  const topLevelSlug = pageSlugsArray[0]
  if(pageSlugsArray.length === 1) {
    accumulator[topLevelSlug] = page
  } else {
    pageSlugsArray.shift()
    page.pageSlugs = pageSlugsArray.join('/')
    recursivelyNestPage(page, accumulator[topLevelSlug]['subPages'])
  }
}
function WikiApiList(props) {
  const { wikiApi } = props
  const pages = constructNestedPages(wikiApi.pages)
  return (
    <div>
      { pages && Object.keys(pages).length
        ?
          <Accordion fluid>
            {Object.keys(pages).map( key => (
              <WikiApiListItem
                key={`base-list-${key}`}
                page={pages[key]}
              />
            ))}
          </Accordion>
        :
        null
      }
    </div>
  )
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    username: state.auth.username,
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    fetchWikiApis: () => dispatch(fetchWikiApis()),
    fetchWikiApi: (slug) => dispatch(fetchWikiApi(slug))
  }
}
export default connectedWithRoutes(mapStateToProps, mapDispatchToProps)(WikiApiList)

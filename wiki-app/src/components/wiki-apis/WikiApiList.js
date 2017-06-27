import React from 'react'
import { List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import connectedWithRoutes from '../../hocs/connectedWithRoutes'
import { fetchWikiApis, fetchWikiApi } from '../../actions/wikiApiActions'
import WikiApiListItem from './WikiApiListItem'
import './WikiApiList.css'

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
  let pagesList = Object.keys(pages)
  pagesList = pagesList.map( key => (
    <List.Item key={`base-list-${key}`}>
      <WikiApiListItem
        page={pages[key]}
      />
    </List.Item>
  ))
  pagesList.unshift(
    <List.Item key='add-a-page' as={Link} to={`/${props.username}/${wikiApi.slug}/new`}>
      <List.Icon name='add' />
      <List.Content>
        Add a page
      </List.Content>
    </List.Item>
  )
  return (
    <List inverted verticalAlign="top">
      {pagesList}
    </List>
  )
}

function mapStateToProps(state) {
  return {
    username: state.account.userInfo.username,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchWikiApis: () => dispatch(fetchWikiApis()),
    fetchWikiApi: (slug) => dispatch(fetchWikiApi(slug))
  }
}
export default connectedWithRoutes(mapStateToProps, mapDispatchToProps)(WikiApiList)

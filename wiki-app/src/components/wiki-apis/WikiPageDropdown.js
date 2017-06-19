import React from 'react'
import { Dropdown, Icon } from 'semantic-ui-react'

import connectedWithRoutes from '../../hocs/connectedWithRoutes'
import { fetchDataset } from '../../actions/datasetActions'
import { fetchPage } from '../../actions/pageActions'

const WikiPageDropdown = (props) => {
  let options = null
  if(props.pages) {
    options = props.pages.reduce( (acc, page) => {
      const slugPath = page.relative_path.split('/')
      const slug = slugPath[1]
      slugPath.shift()
      if(slugPath.length === 1) {
        return [
          ...acc,
          {
            key: slug,
            icon: "file",
            text: page.name,
            label: {
              content:`/${slug}`,
              color: 'grey',
              tag: true
            },
            value: slug
          }
        ]
      }
      return acc
    }, [])
  }
  const header = props.location.pathname.endsWith('new')
    ?
    null
    :
    <Dropdown.Header onClick={() => props.history.push(`/${props.username}/${props.slug}/new`)}>
      <Icon name="add"/>
      Add a Page
    </Dropdown.Header>

  if(!!options) {
    return (
      <Dropdown
        item
        icon="folder"
        text="Pages"
        header={header}
        scrolling
        labeled
        button
        className="icon"
        noResultsMessage="No pages with that name or slug"
        search={(options,search) => options.filter(
          option => {
            const lSearch = search.toLowerCase()
            const lOptionText = option.text.toLowerCase()
            const lOptionValue = option.value.toLowerCase()
            return lOptionValue.includes(lSearch) || lOptionText.includes(lSearch)
          }
        )}
        fluid
        selection
        selectOnBlur={false}
        onChange={(e, dropdown) => {
          props.fetchPageData(`${props.slug}/${dropdown.value}`)
          props.history.push(`/${props.username}/${props.slug}/${dropdown.value}/dataset`)
        }}
        options={options}
        minCharacters={0}
      />
    )
  } else {
    return null
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    username: state.auth.username,
    slug: state.wikiApi.slug,
    pages: state.wikiApi.pages,
    name: state.wikiApi.name
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    fetchPageData: relativePath => {
      dispatch(fetchDataset(relativePath))
      dispatch(fetchPage(relativePath))
    }
  }
}
export default connectedWithRoutes(mapStateToProps, mapDispatchToProps)(WikiPageDropdown)

import React from 'react'
import { Dropdown, Button } from 'semantic-ui-react'

import connectedWithRoutes from '../../hocs/connectedWithRoutes'
import { fetchDataset } from '../../actions/datasetActions'
import { fetchPage } from '../../actions/pageActions'

const SubPageDropdown = (props) => {
  let options = null
  const isNewPageForm = props.location.pathname.endsWith('new')
  if(props.subPages) {
    options = props.subPages.map( subPage => {
      const subPagePath = `${props.relativePath}/${subPage.slug}`

      return {
        key: subPagePath,
        icon: "file",
        text: subPage.name,
        label: {
          content:`/${subPage.slug}`,
          icon: 'linkify',
          color: 'grey'
        },
        value: subPage.slug
      }
    })
  }
  const header = (
    <Dropdown.Header
      as={Button}
      icon="add"
      content="Add a Sub Page"
      attached="top"
      inverted
      onClick={() => props.history.push(`/${props.username}/${props.relativePath}/new`)}
    />
  )

  if (isNewPageForm){
    return null
  } else {
    return (
      <Dropdown
        item
        id="page-sidebar-dropdown"
        icon="folder"
        text="Sub Pages"
        header={header}
        button
        labeled
        className="icon"
        scrolling
        noResultsMessage="No sub pages with that name or slug"
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
          props.fetchPageData(`${props.relativePath}/${dropdown.value}`)
          props.history.push(`/${props.username}/${props.relativePath}/${dropdown.value}/dataset`)
        }}
        options={options}
        minCharacters={0}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    username: state.auth.userInfo.username,
    relativePath: state.page.relativePath,
    subPages: state.page.subPages,
    name: state.page.name
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPageData: relativePath => {
      dispatch(fetchDataset(relativePath))
      dispatch(fetchPage(relativePath))
    }
  }
}
export default connectedWithRoutes(mapStateToProps, mapDispatchToProps)(SubPageDropdown)

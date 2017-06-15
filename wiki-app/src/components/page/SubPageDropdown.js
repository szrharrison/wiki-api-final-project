import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { fetchDataset } from '../../actions/datasetActions'
import { fetchPage } from '../../actions/pageActions'

const SubPageDropdown = (props) => {

  return (
    <Dropdown
      item
      text='Sub Pages'
      scrolling
    >
      {
        props.title
        ?
          <Dropdown.Menu>
            <Dropdown.Header
              content="Scroll for More"
            />
            <Dropdown.Item
              icon="add"
              text="Add a new page"
              as={NavLink}
              to={`/${props.relativePath}/new`}
            />
            {props.subPageSlugs.map( slug => {
              const subPagePath = `/${props.relativePath}/${slug}`
              return(
                <Dropdown.Item
                  key={subPagePath}
                  as={NavLink}
                  to={subPagePath + '/dataset'}
                  onClick={() => props.handleClick(subPagePath)}
                >
                  {slug}
                </Dropdown.Item>
              )})}
          </Dropdown.Menu>
        :
          null
      }
    </Dropdown>
  )
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    relativePath: state.pageForm.relativePath,
    subPageSlugs: state.pageForm.subPageSlugs,
    title: state.pageForm.title
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    handleClick: relativePath => {
      dispatch(fetchDataset(relativePath))
      dispatch(fetchPage(relativePath))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SubPageDropdown)

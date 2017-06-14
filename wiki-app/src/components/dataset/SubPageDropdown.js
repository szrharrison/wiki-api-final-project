import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

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
            <Dropdown.Item icon="add" text="Add a new page" />
            {props.subPageSlugs.map( slug => {
              const subPagePath = '/' + props.relativePath + '/' + slug
              return(
                <Dropdown.Item
                  key={subPagePath}
                  as={Link}
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
    relativePath: state.pageForm.relative_path,
    subPageSlugs: state.pageForm.subPageSlugs,
    title: state.pageForm.title
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    handleClick: (relativePath) => dispatch(fetchPage(relativePath))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SubPageDropdown)

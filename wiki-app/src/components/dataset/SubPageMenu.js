import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchPage } from '../../actions/pageActions'

const SubPageDropdown = (props) => {

  return (
    <Dropdown item text='Sub Pages'>
      <Dropdown.Menu>
        <Dropdown.Header>Scroll for More</Dropdown.Header>
        {props.subPageSlugs.map( slug => {
          const subPagePath = '/' + props.relativePath + '/' + slug
          return(
            <Dropdown.Item>
              <Link
                to={subPagePath}
                onClick={() => props.handleClick(subPagePath)}
              >
                {slug}
              </Link>
            </Dropdown.Item>
          )})}
      </Dropdown.Menu>
    </Dropdown>
  )
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    relativePath: state.pageForm.relative_path,
    subPageSlugs: state.pageForm.subPageSlugs
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    handleClick: (relativePath) => dispatch(fetchPage(relativePath))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SubPageDropdown)

import React from 'react'
import { Breadcrumb } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchPage } from '../../actions/pageActions'


const PageBreadcrumbs = (props) => {
  if( !!props.relative_path && !props.isFetching ) {
    let splitPath = props.relative_path.split('/')
    let breadcrumbs = splitPath.map( (path,i) => {
      let url = '/' + splitPath.slice(0, i + 1 ).join('/')
      const relativePath = url
      if( i !== 0 ) {
        url = url + '/dataset'
      }
      return {
        key: splitPath.slice(0, i + 1 ).join('/'),
        content: (
          <Link
            to={url}
            onClick={() => props.fetchPage(relativePath)}
          >
            {path}
          </Link>
        )
      }
    })
    return (
      <Breadcrumb icon='caret right' sections={breadcrumbs} />
    )
  } else {
    return null
  }
}

function mapStateToProps( state, ownProps ) {
  return {
    ...ownProps,
    ...state.pageForm
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    fetchPage: (relativePath) => dispatch(fetchPage(relativePath))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PageBreadcrumbs)

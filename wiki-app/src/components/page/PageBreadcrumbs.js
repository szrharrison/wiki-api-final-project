import React from 'react'
import { Breadcrumb } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchPage } from '../../actions/pageActions'
import { fetchDataset } from '../../actions/datasetActions'


const PageBreadcrumbs = (props) => {
  if( !!props.relativePath && !props.isFetching ) {
    let splitPath = props.relativePath.split('/')
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
            onClick={() => props.fetchPageData(relativePath)}
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
    relativePath: state.pageForm.relativePath,
    isFetching: state.pageForm.isFetching
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    fetchPageData: (relativePath) => {
      dispatch(fetchPage(relativePath))
      dispatch(fetchDataset(relativePath))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PageBreadcrumbs)

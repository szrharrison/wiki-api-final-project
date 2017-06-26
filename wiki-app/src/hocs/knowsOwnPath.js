import React from 'react'

function knowsOwnPath(WrappedComponent) {
  return props => {
    const locationArray = props.location.pathname.split('/')
    locationArray.shift()
    const locationEnding = locationArray.slice(-1)[0]
    const isNewForm = locationEnding === 'new'
    const isEditForm = locationEnding === 'dataset' || locationEnding === 'edit'
    let relativePath
    if(locationEnding === 'new' || locationEnding === 'dataset' || locationEnding === 'edit') {
      relativePath = locationArray.slice(0, -1)
    } else {
      relativePath = locationArray
    }
    if( !!props.match.params.username ) {
      relativePath.shift()
    }
    const slug = relativePath.slice(-1)[0]
    const isWiki = relativePath.length === 1
    const parentPath = relativePath.slice(0,-1).join('/')
    relativePath = relativePath.join('/')
    return (
      <WrappedComponent
        locationArray={locationArray}
        locationEnding={locationEnding}
        isNewForm={isNewForm}
        isEditForm={isEditForm}
        isWiki={isWiki}
        relativePath={relativePath}
        slug={slug}
        parentPath={parentPath}
        {...props}
      />
    )
  }
}

export default knowsOwnPath

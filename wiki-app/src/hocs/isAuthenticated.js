import React from 'react'
import { Redirect } from 'react-router-dom'

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function isAuthenticated(WrappedComponent) {
  function IsAuthed(props) {
    if(!localStorage.jwt) {
      return <Redirect to="/" />
    }
    return <WrappedComponent {...props} />
  }
  IsAuthed.displayName = `IsAuthed(${getDisplayName(WrappedComponent)})`
  return IsAuthed
}

export default isAuthenticated

import React from 'react'
import { Redirect } from 'react-router-dom'

function isAuthenticated(WrappedComponent) {
  return function(props) {
    if(!localStorage.jwt) {
      return <Redirect to="/" />
    }
    return <WrappedComponent {...props} />
  }
}

export default isAuthenticated

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import knowsOwnPath from './knowsOwnPath'

function connectedWithRoutes(mapStateToProps, mapDispatchToProps) {
  return WrappedComponent => {
    return withRouter(connect(mapStateToProps, mapDispatchToProps)(knowsOwnPath(WrappedComponent)))
  }
}

export default connectedWithRoutes

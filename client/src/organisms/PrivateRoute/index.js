/**
 * Import globals.
 */
import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'

/**
 * Connect component to Redux.
 */
const mapStateToProps = state => ({
  isSignIn: state.user.isSignIn,
})

const mapDispatchToProps = null

const PrivateRoute = ({
  component: Component,
  fallback,
  isSignIn,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        isSignIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: fallback,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PrivateRoute)

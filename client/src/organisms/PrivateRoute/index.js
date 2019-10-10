import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { withAuthentication } from '../../providers/Auth'

const PrivateRoute = ({ auth, component: Component, fallback, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        auth.authUser ? (
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

export default withAuthentication(PrivateRoute)

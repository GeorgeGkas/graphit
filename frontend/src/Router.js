/**
 * Import globals.
 */
import React, { useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom'

/**
 * Import ducks.
 */
import { operations as profileOperations } from './scenes/App/organisms/AppBar/duck'
import { compose } from 'redux'

/**
 * Import components.
 */
import App from './scenes/App'
import Dashboard from './scenes/Dashboard'
import Page404 from './scenes/Page404'
import PrivateRoute from './organisms/PrivateRoute'
import { withFirebase } from './organisms/Firebase'

/**
 * Connect component to Redux.
 */
const mapStateToProps = null

const mapDispatchToProps = dispatch =>
  bindActionCreators(profileOperations, dispatch)

const Router = ({ firebase, signIn, signOut }) => {
  useEffect(() => {
    const listenerUnsubscribe = firebase.auth.onAuthStateChanged(async user => {
      if (user) {
        signIn({
          email: user.email,
          id: user.uid,
          imageUrl: user.photoURL,
          name: user.displayName,
          token: await user.getIdToken(),
        })
      } else {
        signOut()
      }
    })

    return () => listenerUnsubscribe()
  })

  return (
    <BrowserRouter>
      <Switch>
        <Route component={App} path="/app" />
        <Redirect exact from="/" to="/app" />
        <PrivateRoute component={Dashboard} fallback="/app" path="/dashboard" />
        <Route component={Page404} />
      </Switch>
    </BrowserRouter>
  )
}

export default compose(
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Router)

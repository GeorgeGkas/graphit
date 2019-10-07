/**
 * Import globals.
 */
import loadable from '@loadable/component'
import React, { Suspense, useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom'

/**
 * Import ducks.
 */
import { operations as userOperations } from './ducks/user'
import { compose } from 'redux'

/**
 * Import components.
 */
import PrivateRoute from './organisms/PrivateRoute'
import { withFirebase } from './organisms/Firebase'

/**
 * Lazy load scenes.
 */
const App = loadable(
  () => import(/* webpackChunkName: "App" */ './scenes/App'),
  {
    fallback: <div>Loading...</div>,
  },
)
const Dashboard = loadable(
  () => import(/* webpackChunkName: "Dashboard" */ './scenes/Dashboard'),
  {
    fallback: <div>Loading...</div>,
  },
)
const Page404 = loadable(() =>
  import(/* webpackChunkName: "Page404" */ './scenes/Page404'),
)

/**
 * Connect component to Redux.
 */
const mapStateToProps = null

const mapDispatchToProps = dispatch =>
  bindActionCreators(userOperations, dispatch)

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
      <Suspense fallback={<div>Loading....</div>}>
        <Switch>
          <Route component={App} path="/app" />
          <Redirect exact from="/" to="/app" />
          <PrivateRoute
            component={Dashboard}
            fallback="/app"
            path="/dashboard"
          />
          <Route component={Page404} />
        </Switch>
      </Suspense>
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

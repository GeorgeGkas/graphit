/**
 * Import globals.
 */
import loadable from '@loadable/component'
import React from 'react'
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom'

/**
 * Import components.
 */
import Loading from './organisms/Loading'
import PrivateRoute from './organisms/PrivateRoute'

/**
 * Import scenes
 */
import CheckAuthLoadingScreen from './scenes/CheckAuthLoadingScreen'

/**
 * Lazy load scenes.
 */
const App = loadable(
  () => import(/* webpackChunkName: "App" */ './scenes/App'),
  {
    fallback: <Loading />,
  },
)

const Dashboard = loadable(
  () => import(/* webpackChunkName: "Dashboard" */ './scenes/Dashboard'),
  {
    fallback: <Loading />,
  },
)

const Page404 = loadable(() =>
  import(/* webpackChunkName: "Page404" */ './scenes/Page404'),
)

const Router = () => {
  return (
    <CheckAuthLoadingScreen>
      <BrowserRouter>
        <Switch>
          <Route exact component={App} path="/app/:id" />
          <Route component={App} path="/app" />
          <Redirect exact from="/" to="/app" />
          <PrivateRoute
            component={Dashboard}
            fallback="/app"
            path="/dashboard"
          />
          <Route component={Page404} />
        </Switch>
      </BrowserRouter>
    </CheckAuthLoadingScreen>
  )
}

export default Router

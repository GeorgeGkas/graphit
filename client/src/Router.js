import loadable from '@loadable/component'
import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

import Loading from './organisms/Loading'
import PrivateRoute from './organisms/PrivateRoute'
import CheckAuthLoadingScreen from './scenes/CheckAuthLoadingScreen'
import FetchProjectId from './scenes/FetchProjectId'

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
          <Route path="/app/:id">
            <FetchProjectId>
              <App />
            </FetchProjectId>
          </Route>

          <Route exact component={App} path="/app" />
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

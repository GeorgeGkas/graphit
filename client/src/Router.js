import loadable from '@loadable/component'
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

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

const Landing = loadable(() =>
  import(/* webpackChunkName: "Landing" */ './scenes/Landing'),
)

const Page404 = loadable(() =>
  import(/* webpackChunkName: "Page404" */ './scenes/Page404'),
)

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact component={Landing} path="/" />

        <CheckAuthLoadingScreen>
          <Route path="/app/:id">
            <FetchProjectId>
              <App />
            </FetchProjectId>
          </Route>

          <Route exact path="/app">
            <App />
          </Route>

          <PrivateRoute
            component={() => <Dashboard />}
            fallback="/app"
            path="/dashboard"
          />

          <Route exact path="/404" component={Page404} />
          <Route component={Page404} />
        </CheckAuthLoadingScreen>
      </Switch>
    </BrowserRouter>
  )
}

export default Router

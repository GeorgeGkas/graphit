/**
 * Import globals.
 */
import React from 'react'
import { Switch, Redirect, Route, useRouteMatch } from 'react-router-dom'

/**
 * Import components.
 */
import Dashboard from './scenes/Projects'

/**
 * Component.
 */
const Router = () => {
  let { path } = useRouteMatch()

  return (
    <Switch>
      <Route exact component={Dashboard} path={`${path}/projects`} />
      <Route>
        <Redirect to={`${path}/projects`} />
      </Route>
    </Switch>
  )
}

export default Router

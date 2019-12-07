import React from 'react'
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'

import Dashboard from './scenes/Projects'

const Router = () => {
  let { path } = useRouteMatch()

  return (
    <Switch>
      <Route exact component={Dashboard} path={`${path}/projects`} />
      <Redirect to="/404" />
    </Switch>
  )
}

export default Router

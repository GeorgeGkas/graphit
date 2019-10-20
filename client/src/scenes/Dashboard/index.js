/**
 * Import globals.
 */
import React from 'react'

/**
 * Import UI framework modules.
 */
import Grid from '@material-ui/core/Grid'

/**
 * Import components.
 */
import AppBar from './organisms/AppBar'
import Router from './Router'
import Sidebar from './organisms/Sidebar'

/**
 * Component.
 */
const Dashboard = () => {
  return (
    <React.Fragment>
      <AppBar />
      <Grid container>
        <Grid item lg={2} md={3} xs={4}>
          <Sidebar />
        </Grid>
        <Grid item lg={10} md={9} xs={8}>
          <Router />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default Dashboard

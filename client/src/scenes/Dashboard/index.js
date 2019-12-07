import Grid from '@material-ui/core/Grid'
import React from 'react'

import AppBar from './organisms/AppBar'
import Sidebar from './organisms/Sidebar'
import Router from './Router'

const Dashboard = () => {
  return (
    <>
      <AppBar />
      <Grid container>
        <Grid item lg={2} md={3} xs={4}>
          <Sidebar />
        </Grid>
        <Grid item lg={10} md={9} xs={8}>
          <Router />
        </Grid>
      </Grid>
    </>
  )
}

export default Dashboard

/**
 * Import globals.
 */
import React from 'react'
import Grid from '@material-ui/core/Grid'
import { ScaleLoader } from 'halogenium'

/**
 * Component.
 */
const Loading = () => (
  <Grid
    container
    alignItems="center"
    direction="column"
    justify="center"
    style={{ minHeight: '100vh' }}
  >
    <ScaleLoader color="#2196f3" />
  </Grid>
)

export default Loading

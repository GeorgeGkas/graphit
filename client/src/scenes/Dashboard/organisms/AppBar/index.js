/**
 * Import globals.
 */
import React from 'react'

/**
 * Import UI framework modules.
 */
import blue from '@material-ui/core/colors/blue'
import MUIAppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

/**
 * Import components.
 */
import MaterialGoogleAvatar from '../../../../organisms/MaterialGoogleAvatar'

/**
 * Import services.
 */
import { withAuthentication } from '../../../../providers/Auth'

/**
 * Construct component styles.
 */
const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  root: {
    background: blue['500'],
    display: 'flex',
  },
  title: {
    marginRight: theme.spacing(3),
  },
}))

/**
 * Component.
 */
const AppBar = ({ auth }) => {
  const classes = useStyles()

  return (
    <>
      <MUIAppBar className={classes.root} position="static">
        <Toolbar>
          <div className={classes.title}>
            <Typography variant="h6">Dashboard</Typography>
          </div>

          <div className={classes.grow} />

          <MaterialGoogleAvatar auth={auth} />
        </Toolbar>
      </MUIAppBar>
    </>
  )
}

export default withAuthentication(AppBar)

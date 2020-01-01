import MUIAppBar from '@material-ui/core/AppBar'
import blue from '@material-ui/core/colors/blue'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { useTranslation } from 'react-i18next'

import MaterialGoogleAvatar from '../../../../organisms/MaterialGoogleAvatar'
import { withAuthentication } from '../../../../providers/Auth'

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

const AppBar = ({ auth }) => {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <>
      <MUIAppBar className={classes.root} position="static">
        <Toolbar>
          <div className={classes.title}>
            <Typography variant="h6">{t('dashboard.title')}</Typography>
          </div>

          <div className={classes.grow} />

          <MaterialGoogleAvatar auth={auth} />
        </Toolbar>
      </MUIAppBar>
    </>
  )
}

export default withAuthentication(AppBar)

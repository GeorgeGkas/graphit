import MUIAppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import blue from '@material-ui/core/colors/blue'
import IconButton from '@material-ui/core/IconButton'
import Popper from '@material-ui/core/Popper'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import DashboardIcon from '@material-ui/icons/DashboardSharp'
import {
  bindPopover,
  bindToggle,
  usePopupState,
} from 'material-ui-popup-state/hooks'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators, compose } from 'redux'

import MaterialGoogleAvatar from '../../../../organisms/MaterialGoogleAvatar'
import { withAuthentication } from '../../../../providers/Auth'
import { operations as tutorialOperations } from '../../ducks/tutorial'
import FileDropdownMenu from './organisms/FileDropdownMenu'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  buttonApp: {
    borderRadius: 0,
    marginRight: theme.spacing(1),
  },
  fileInput: {
    display: 'none',
    position: 'absolute',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  menuItemKey: {
    paddingTop: '3px',
  },
  paper: {
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

const mapStateToProps = state => ({
  graphMetadata: state.graph.present.metadata,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(tutorialOperations, dispatch)

const AppBar = ({
  auth,
  graphMetadata,
  handleCreateModalOpen,
  setTutorialVisibility,
}) => {
  const classes = useStyles()
  const { t } = useTranslation()

  const fileDropdownMenu = usePopupState({
    popupId: 'fileDropdownMenu',
    variant: 'popover',
  })

  const openTutorial = () => setTutorialVisibility(true)

  return (
    <>
      <MUIAppBar className={classes.root} position="static">
        <Toolbar>
          {auth.authUser && (
            <Tooltip title={t('app.appbar.dashboard_link')}>
              <IconButton
                className={classes.menuButton}
                color="inherit"
                component={Link}
                edge="start"
                to="/dashboard/projects"
              >
                <DashboardIcon />
              </IconButton>
            </Tooltip>
          )}

          <div className={classes.title}>
            <Typography variant="h6">
              {graphMetadata.name
                ? graphMetadata.name
                : t('app.appbar.default_project_name')}
            </Typography>
            <Typography gutterBottom display="block" variant="caption">
              {graphMetadata.algorithm ? graphMetadata.algorithm : null}
            </Typography>
          </div>

          <Button
            className={classes.buttonApp}
            color="inherit"
            id="file_dropdown_menu"
            {...bindToggle(fileDropdownMenu)}
          >
            {t('app.appbar.menu.file')}
          </Button>
          <Popper
            {...bindPopover(fileDropdownMenu)}
            transition
            style={{ zIndex: 9999 }}
          >
            {({ TransitionProps }) => (
              <FileDropdownMenu
                TransitionProps={TransitionProps}
                fileDropdownMenu={fileDropdownMenu}
                handleCreateModalOpen={handleCreateModalOpen}
              />
            )}
          </Popper>

          <Button
            className={classes.buttonApp}
            color="inherit"
            id="help_button"
            onClick={openTutorial}
          >
            {t('app.appbar.menu.help')}
          </Button>

          <div className={classes.grow} />

          <MaterialGoogleAvatar auth={auth} />
        </Toolbar>
      </MUIAppBar>
    </>
  )
}

export default compose(
  withAuthentication,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(AppBar)

import MUIAppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import blue from '@material-ui/core/colors/blue'
import IconButton from '@material-ui/core/IconButton'
import Popper from '@material-ui/core/Popper'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import FolderIcon from '@material-ui/icons/FolderOutlined'
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
import { withFirebase } from '../../../../providers/Firebase'
import { operations as tutorialOperations } from '../../ducks/tutorial'
import Logo from './images/logo.svg'
import FileDropdownMenu from './organisms/FileDropdownMenu'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  buttonApp: {
    fontFamily: 'Amaranth, sans-serif',
    borderRadius: 0,
    marginRight: theme.spacing(1),
    textTransform: 'capitalize',
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
  titleWrapper: {
    marginRight: theme.spacing(3),
  },
  title: {
    fontFamily: 'Amaranth, sans-serif',
    fontWeight: 700,
  },
  appbar: {
    background: '#3386F2',
    display: 'flex',
  },
  operationName: {
    fontFamily: 'Heebo, sans-serif',
  },
  dashboardLinkWrapper: {
    fontFamily: 'Amaranth, sans-serif',
    padding: '0 50px',
  },
  dashboardLinkIcon: {
    position: 'absolute',
    marginTop: '-3px',
    paddingLeft: '8px',
  },
  dashboardLink: {
    color: '#fff',
    textDecoration: 'none',
  },
}))

const mapStateToProps = state => ({
  graphMetadata: state.graph.present.metadata,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(tutorialOperations, dispatch)

const AppBar = ({
  auth,
  firebase,
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
      <MUIAppBar className={classes.appbar} position="static">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            component={Link}
            edge="start"
            to="/"
          >
            <img alt="logo" src={Logo} width="24" height="24" />
          </IconButton>
          <div className={classes.titleWrapper}>
            <Typography variant="h6" className={classes.title}>
              {graphMetadata.name
                ? graphMetadata.name
                : t('app.appbar.default_project_name')}
            </Typography>
            <Typography
              gutterBottom
              display="block"
              variant="caption"
              className={classes.operationName}
            >
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
            onClick={() => {
              openTutorial()
              firebase.analytics.logEvent('show_tutorial')
            }}
          >
            {t('app.appbar.menu.help')}
          </Button>

          <div className={classes.grow} />

          {auth.authUser && (
            <div className={classes.dashboardLinkWrapper}>
              <Link
                to="/dashboard/projects"
                className={classes.dashboardLink}
                onClick={() =>
                  firebase.analytics.logEvent('navigate_to_dashboard_button')
                }
              >
                {t('app.appbar.dashboard_link')}{' '}
                <span className={classes.dashboardLinkIcon}>
                  <FolderIcon />
                </span>
              </Link>
            </div>
          )}
          <MaterialGoogleAvatar auth={auth} firebase={firebase} />
        </Toolbar>
      </MUIAppBar>
    </>
  )
}

export default compose(
  withAuthentication,
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(AppBar)

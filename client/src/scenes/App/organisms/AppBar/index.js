/**
 * Import globals.
 */
import React from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import {
  usePopupState,
  bindToggle,
  bindPopover,
} from 'material-ui-popup-state/hooks'

/**
 * Import UI framework modules.
 */
import blue from '@material-ui/core/colors/blue'
import Button from '@material-ui/core/Button'
import DashboardIcon from '@material-ui/icons/DashboardSharp'
import IconButton from '@material-ui/core/IconButton'
import MUIAppBar from '@material-ui/core/AppBar'
import Popper from '@material-ui/core/Popper'
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

/**
 * Import ducks.
 */
import { operations as graphOperations } from '../../ducks/graph'
import { operations as tutorialOperations } from '../../ducks/tutorial'

/**
 * Import components.
 */
import FileDropdownMenu from './organisms/FileDropdownMenu'
import MaterialGoogleAvatar from '../../../../organisms/MaterialGoogleAvatar'

/**
 * Import services.
 */
import { withAuthentication } from '../../../../providers/Auth'

/**
 * Construct component styles.
 */
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

/**
 * Connect component to Redux.
 */
const mapStateToProps = state => ({
  graphMetadata: state.graph.present.metadata,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...graphOperations, ...tutorialOperations }, dispatch)

/**
 * Component.
 */
const AppBar = ({
  auth,
  graphMetadata,
  handleCreateModalOpen,
  loadGraph,
  setTutorialVisibility,
}) => {
  const classes = useStyles()
  const fileDropdownMenu = usePopupState({
    popupId: 'fileDropdownMenu',
    variant: 'popover',
  })

  const openTutorial = () => setTutorialVisibility(true)

  return (
    <>
      <input
        accept=".json"
        id="open_graph"
        style={{ display: 'none', position: 'absolute' }}
        type="file"
        onChange={e => {
          const reader = new FileReader()
          reader.onloadend = () => {
            loadGraph(JSON.parse(reader.result))
          }
          reader.readAsText(e.target.files[0])
        }}
      />
      <MUIAppBar className={classes.root} position="static">
        <Toolbar>
          {auth.authUser && (
            <Tooltip title="Dashboard">
              <IconButton
                className={classes.menuButton}
                color="inherit"
                component={Link}
                edge="start"
                to="/dashboard"
              >
                <DashboardIcon />
              </IconButton>
            </Tooltip>
          )}

          <div className={classes.title}>
            <Typography variant="h6">
              {graphMetadata.name ? graphMetadata.name : 'Editor'}
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
            File
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
            Help
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

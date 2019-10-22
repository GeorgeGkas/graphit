/**
 * Import globals.
 */
import React, { useState } from 'react'
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

/**
 * Import components.
 */
import ConfirmDialog from '../../../../organisms/ConfirmDialog'
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
  currentEditorAction: state.editor.currentEditorAction,
  futureExist: state.graph.future.length,
  pastExist: state.graph.past.length,
  projectList: state.projects.projectList,
  selectedProjectId: state.projects.selectedProjectId,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(graphOperations, dispatch)

/**
 * Component.
 */
const AppBar = ({
  auth,
  futureExist,
  loadGraph,
  pastExist,
  projectList,
  selectedProjectId,
}) => {
  const classes = useStyles()
  const fileDropdownMenu = usePopupState({
    popupId: 'fileDropdownMenu',
    variant: 'popover',
  })

  const [loadDialogVisible, makeLoadDialogVisible] = useState(false)
  const toggleLoadDialog = () => makeLoadDialogVisible(!loadDialogVisible)

  const [selectedProjectToLoad, setSelectedProjectToLoad] = useState({})

  return (
    <React.Fragment>
      <input
        accept=".json"
        className={classes.fileInput}
        id="load_state"
        type="file"
        onChange={e => {
          const reader = new FileReader()
          reader.onloadend = () => {
            setSelectedProjectToLoad(reader.result)

            if (pastExist || futureExist) {
              toggleLoadDialog()
            } else {
              loadGraph(JSON.parse(reader.result))
              toggleLoadDialog()
            }
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
                target="_blank"
                to="/dashboard"
              >
                <DashboardIcon />
              </IconButton>
            </Tooltip>
          )}

          <div className={classes.title}>
            <Typography variant="h6">
              {selectedProjectId
                ? projectList
                    .filter(project => project.id === selectedProjectId)
                    .pop().name
                : 'Editor'}
            </Typography>
            <Typography gutterBottom display="block" variant="caption">
              {selectedProjectId
                ? projectList
                    .filter(project => project.id === selectedProjectId)
                    .pop().algorithm
                : null}
            </Typography>
          </div>

          <Button
            className={classes.buttonApp}
            color="inherit"
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
              />
            )}
          </Popper>

          <div className={classes.grow} />

          <MaterialGoogleAvatar auth={auth} />
        </Toolbar>
      </MUIAppBar>

      <ConfirmDialog
        confirmAction={() => {
          loadGraph(JSON.parse(selectedProjectToLoad))
          toggleLoadDialog()
        }}
        confirmDialogVisible={loadDialogVisible}
        confirmMessage={
          'All unsaved changes will be deleted if you confirm this action.'
        }
        confirmTitle="Load project?"
        handleClose={toggleLoadDialog}
      />
    </React.Fragment>
  )
}

export default compose(
  withAuthentication,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(AppBar)

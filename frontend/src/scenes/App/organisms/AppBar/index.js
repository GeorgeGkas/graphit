/**
 * Import globals.
 */
import React, { useState } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { GoogleLogin } from 'react-google-login'
import { GoogleLogout } from 'react-google-login'
import {
  usePopupState,
  bindToggle,
  bindPopover,
} from 'material-ui-popup-state/hooks'

/**
 * Import UI framework modules.
 */
import blue from '@material-ui/core/colors/blue'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import ConfirmDialog from '../ConfirmDialog'
import DashboardIcon from '@material-ui/icons/DashboardSharp'
import Fade from '@material-ui/core/Fade'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import MUIAppBar from '@material-ui/core/AppBar'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

/**
 * Import ducks.
 */
import { operations as algorithmOperations } from '../EditorBar/duck'
import { operations as editorOperations } from '../Editor/ducks/editor'
import { operations as graphOperations } from '../Editor/ducks/graph'
import { operations as profileOperations } from './duck'

/**
 * Import components.
 */
import FileDropdownMenu from './organisms/FileDropdownMenu'

/**
 * Construct component styles.
 */
const useStyles = makeStyles(theme => ({
  avatar: {
    height: 30,
    margin: 10,
    width: 30,
  },

  avatarMenu: {
    borderRadius: 0,
    marginTop: '-30px',
  },
  avatarMenuButton: {
    padding: 0,
  },
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
  signin: {
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(1),
    },
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
  isSignIn: state.user.isSignIn,
  pastExist: state.graph.past.length,
  profile: state.user.profile,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...algorithmOperations,
      ...editorOperations,
      ...graphOperations,
      ...profileOperations,
    },
    dispatch,
  )

/**
 * Component.
 */
const AppBar = ({
  futureExist,
  isSignIn,
  loadGraph,
  pastExist,
  profile,
  signIn,
  signOut,
  toggleDashboard,
}) => {
  const classes = useStyles()
  const fileDropdownMenu = usePopupState({
    popupId: 'fileDropdownMenu',
    variant: 'popover',
  })
  const profileDropdownMenu = usePopupState({
    popupId: 'profileDropdownMenu',
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
          {isSignIn && (
            <Tooltip title="Dashboard">
              <IconButton
                className={classes.menuButton}
                color="inherit"
                edge="start"
                onClick={toggleDashboard}
              >
                <DashboardIcon />
              </IconButton>
            </Tooltip>
          )}

          <Typography className={classes.title} variant="h6">
            Editor
          </Typography>

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

          {isSignIn ? (
            <React.Fragment>
              <IconButton
                className={classes.avatarMenuButton}
                color="inherit"
                {...bindToggle(profileDropdownMenu)}
              >
                <Avatar
                  alt=""
                  className={classes.avatar}
                  src={profile.imageUrl}
                />
              </IconButton>
              <Popper
                {...bindPopover(profileDropdownMenu)}
                transition
                style={{ zIndex: 9999 }}
              >
                {({ TransitionProps }) => (
                  <Fade
                    {...TransitionProps}
                    className={classes.avatarMenu}
                    timeout={360}
                  >
                    <Paper id="menu-list-grow">
                      <ClickAwayListener
                        onClickAway={profileDropdownMenu.close}
                      >
                        <MenuList>
                          <GoogleLogout
                            buttonText="Logout"
                            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                            render={renderProps => (
                              <MenuItem
                                onClick={() => {
                                  renderProps.onClick()
                                }}
                              >
                                Sign out
                              </MenuItem>
                            )}
                            onFailure={console.log}
                            onLogoutSuccess={() => {
                              profileDropdownMenu.close()
                              signOut()
                            }}
                          />
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Fade>
                )}
              </Popper>
            </React.Fragment>
          ) : (
            <GoogleLogin
              isSignedIn
              buttonText="Sign In"
              className={classes.signin}
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              cookiePolicy={'single_host_origin'}
              onFailure={console.log}
              onSuccess={googleResponse => {
                signIn(googleResponse.accessToken)
              }}
            />
          )}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppBar)

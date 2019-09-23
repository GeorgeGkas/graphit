/**
 * Import globals.
 */
import React from 'react'
import { GoogleLogout } from 'react-google-login'
import { bindActionCreators } from 'redux'
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
import MUIAppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { GoogleLogin } from 'react-google-login'
import IconButton from '@material-ui/core/IconButton'
import DashboardIcon from '@material-ui/icons/DashboardSharp'
import ShareIcon from '@material-ui/icons/ShareSharp'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import { makeStyles } from '@material-ui/core/styles'
import Fade from '@material-ui/core/Fade'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Avatar from '@material-ui/core/Avatar'
import Tooltip from '@material-ui/core/Tooltip'

/**
 * Import ducks.
 */
import { operations as algorithmOperations } from '../EditorBar/duck'
import { operations as editorOperations } from '../Editor/duck'
import { operations as profileOperations } from './duck'

/**
 * Import components.
 */
import FileDropdownMenu from './organisms/FileDropdownMenu'

/**
 * Construct component styles.
 */
const useStyles = makeStyles(theme => ({
  root: {
    background: blue['500'],
    display: 'flex',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    marginRight: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1),
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  buttonApp: {
    marginRight: theme.spacing(1),
    borderRadius: 0,
  },
  grow: {
    flexGrow: 1,
  },
  signin: {
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(1),
    },
  },
  menuItemKey: {
    paddingTop: '3px',
  },
  avatar: {
    margin: 10,
    width: 30,
    height: 30,
  },
  avatarMenuButton: {
    padding: 0,
  },
  avatarMenu: {
    borderRadius: 0,
    marginTop: '-30px',
  },
  fileInput: {
    position: 'absolute',
    display: 'none',
  },
}))

/**
 * Connect component to Redux.
 */
const mapStateToProps = state => ({
  pastExist: state.editor.past.length,
  futureExist: state.editor.future.length,
  editorActionType: state.editor.present.editorActionType,
  isSignIn: state.user.isSignIn,
  profile: state.user.profile,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { ...editorOperations, ...algorithmOperations, ...profileOperations },
    dispatch,
  )

/**
 * Component.
 */
const AppBar = ({
  pastExist,
  futureExist,
  initEditorHistory,
  loadState,
  isSignIn,
  signIn,
  profile,
  signOut,
  toggleDashboard,
}) => {
  const classes = useStyles()
  const fileDropdownMenu = usePopupState({
    variant: 'popover',
    popupId: 'fileDropdownMenu',
  })
  const profileDropdownMenu = usePopupState({
    variant: 'popover',
    popupId: 'profileDropdownMenu',
  })

  return (
    <React.Fragment>
      <input
        className={classes.fileInput}
        id="load_state"
        type="file"
        accept=".json"
        onChange={e => {
          const reader = new FileReader()
          reader.onloadend = () => {
            if (
              (!pastExist && !futureExist) ||
              // eslint-disable-next-line no-restricted-globals
              confirm(
                'Are you sure you want to quit as there are unsaved documents?',
              )
            ) {
              initEditorHistory()
              loadState(JSON.parse(reader.result))
            }
          }
          reader.readAsText(e.target.files[0])
        }}
      />

      <MUIAppBar position="static" className={classes.root}>
        <Toolbar>
          <Tooltip title="Dashboard">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={toggleDashboard}
            >
              <DashboardIcon />
            </IconButton>
          </Tooltip>

          <Typography variant="h6" className={classes.title}>
            Editor
          </Typography>

          <Button
            color="inherit"
            className={classes.buttonApp}
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
                fileDropdownMenu={fileDropdownMenu}
                TransitionProps={TransitionProps}
              />
            )}
          </Popper>

          <div className={classes.grow} />

          <Tooltip title="Share your project">
            <IconButton
              color="inherit"
              className={classes.button}
              aria-label="add an alarm"
              onClick={() => alert('Not implemented.')}
            >
              <ShareIcon />
            </IconButton>
          </Tooltip>

          {isSignIn ? (
            <React.Fragment>
              <IconButton
                color="inherit"
                className={classes.avatarMenuButton}
                {...bindToggle(profileDropdownMenu)}
              >
                <Avatar
                  alt=""
                  src={profile.imageUrl}
                  className={classes.avatar}
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
                    timeout={360}
                    className={classes.avatarMenu}
                  >
                    <Paper id="menu-list-grow">
                      <ClickAwayListener
                        onClickAway={profileDropdownMenu.close}
                      >
                        <MenuList>
                          <GoogleLogout
                            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                            buttonText="Logout"
                            onLogoutSuccess={() => {
                              profileDropdownMenu.close()
                              signOut()
                            }}
                            onFailure={console.log}
                            render={renderProps => (
                              <MenuItem
                                onClick={() => {
                                  renderProps.onClick()
                                }}
                              >
                                Sign out
                              </MenuItem>
                            )}
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
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="Sign In"
              cookiePolicy={'single_host_origin'}
              className={classes.signin}
              onSuccess={googleResponse => {
                signIn(googleResponse.accessToken)
              }}
              onFailure={console.log}
              isSignedIn
            />
          )}
        </Toolbar>
      </MUIAppBar>
    </React.Fragment>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppBar)

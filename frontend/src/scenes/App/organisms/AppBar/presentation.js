import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import blue from '@material-ui/core/colors/blue'
import { GoogleLogin } from 'react-google-login'
import IconButton from '@material-ui/core/IconButton'
import DashboardIcon from '@material-ui/icons/DashboardSharp'
import ShareIcon from '@material-ui/icons/ShareSharp'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import { GoogleLogout } from 'react-google-login'
import {
  usePopupState,
  bindToggle,
  bindPopper,
  bindPopover,
} from 'material-ui-popup-state/hooks'
import Fade from '@material-ui/core/Fade'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import Tooltip from '@material-ui/core/Tooltip'

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
  },
  grow: {
    flexGrow: 1,
  },
  signin: {
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(1),
    },
  },
  fileMenu: {
    borderRadius: 0,
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

const Presentation = ({
  pastExist,
  futureExist,
  editorActionType,
  initEditorHistory,
  save: saveHistory,
  loadState,
  open,
  isSignIn,
  saveInCloud,
  selectedProjectId,
  selectProject,
  updateInCloud,
  signIn,
  profile,
  signOut,
  toggleDashboard,
}) => {
  const classes = useStyles()
  const popupState1 = usePopupState({
    variant: 'popper',
    popupId: 'demoPopper1',
  })
  const popupState2 = usePopupState({
    variant: 'popover',
    popupId: 'demoMenu2',
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

      <AppBar position="static" className={classes.root}>
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
            {...bindToggle(popupState1)}
          >
            File
          </Button>
          <Popper
            {...bindPopper(popupState1)}
            transition
            style={{ zIndex: 9999 }}
          >
            {({ TransitionProps }) => (
              <Fade
                {...TransitionProps}
                timeout={360}
                className={classes.fileMenu}
              >
                <Paper id="menu-list-grow">
                  <ClickAwayListener onClickAway={popupState1.close}>
                    <MenuList>
                      <MenuItem
                        button
                        disabled={editorActionType === 'isPlaying'}
                        onClick={() => {
                          if (
                            (!pastExist && !futureExist) ||
                            // eslint-disable-next-line no-restricted-globals
                            confirm(
                              'Are you sure you want to quit as there are unsaved documents?',
                            )
                          ) {
                            initEditorHistory()
                            selectProject('')
                          }
                        }}
                      >
                        <ListItem component="div">
                          <ListItemText primary="New" />
                        </ListItem>
                      </MenuItem>

                      <MenuItem
                        button
                        disabled={editorActionType === 'isPlaying'}
                        onClick={open}
                      >
                        <ListItem component="div">
                          <ListItemText primary="Open" />
                        </ListItem>
                      </MenuItem>

                      {isSignIn ? (
                        <MenuItem
                          button
                          disabled={editorActionType === 'isPlaying'}
                          onClick={() =>
                            selectedProjectId ? updateInCloud() : saveInCloud()
                          }
                        >
                          <ListItem component="div">
                            <ListItemText primary="Save" />
                          </ListItem>
                        </MenuItem>
                      ) : null}

                      <MenuItem
                        button
                        disabled={editorActionType === 'isPlaying'}
                        onClick={saveHistory}
                      >
                        <ListItem component="div">
                          <ListItemText primary="Download" />
                        </ListItem>
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Fade>
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
                {...bindToggle(popupState2)}
              >
                <Avatar
                  alt=""
                  src={profile.imageUrl}
                  className={classes.avatar}
                />
              </IconButton>
              <Popper
                {...bindPopover(popupState2)}
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
                      <ClickAwayListener onClickAway={popupState2.close}>
                        <MenuList>
                          <GoogleLogout
                            clientId="500576713709-u5ok37bgahorqpofvsvm9fd4pbdldssj.apps.googleusercontent.com"
                            buttonText="Logout"
                            onLogoutSuccess={() => {
                              popupState2.close()
                              signOut()
                            }}
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
              clientId="500576713709-u5ok37bgahorqpofvsvm9fd4pbdldssj.apps.googleusercontent.com"
              buttonText="Sign In"
              cookiePolicy={'single_host_origin'}
              className={classes.signin}
              onSuccess={googleResponse => {
                signIn(googleResponse.accessToken)
              }}
              isSignedIn
            />
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}

export default Presentation

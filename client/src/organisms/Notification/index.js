import Fade from '@material-ui/core/Fade'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import { makeStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/CloseSharp'
import React from 'react'

const useStyles = makeStyles(theme => ({
  snackbar: {
    zIndex: 99999,
    '& > .MuiSnackbarContent-root': {
      borderRadius: 0,
    },
  },
}))

const Notification = ({ disableClickAwayListener = false, message }) => {
  const classes = useStyles()
  const [notificationVisible, makeNotificationVisible] = React.useState(false)
  const toggleNotification = () => makeNotificationVisible(!notificationVisible)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      makeNotificationVisible(!notificationVisible)
    }, 600)
    return () => clearTimeout(timer)
    // eslint-disable-next-line
  }, [])

  return (
    <Snackbar
      ClickAwayListenerProps={{
        mouseEvent: !disableClickAwayListener ? 'onClick' : false,
        touchEvent: !disableClickAwayListener ? 'onTouchEnd' : false,
      }}
      ContentProps={{
        elevation: 1,
      }}
      TransitionComponent={Fade}
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={toggleNotification}
        >
          <CloseIcon />
        </IconButton>,
      ]}
      anchorOrigin={{
        horizontal: 'right',
        vertical: 'bottom',
      }}
      autoHideDuration={10000}
      message={
        <span style={{ fontFamily: '"Heebo", sans-serif' }}>{message}</span>
      }
      open={notificationVisible}
      className={classes.snackbar}
      onClose={toggleNotification}
    />
  )
}

export default Notification

/**
 * Import globals.
 */
import React from 'react'

/**
 * Import UI framework modules.
 */
import CloseIcon from '@material-ui/icons/CloseSharp'
import Fade from '@material-ui/core/Fade'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'

/**
 * Component.
 */
const Notification = ({ disableClickAwayListener = false, message }) => {
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
        square: true,
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
      message={<span>{message}</span>}
      open={notificationVisible}
      style={{
        zIndex: 99999,
      }}
      onClose={toggleNotification}
    />
  )
}

export default Notification

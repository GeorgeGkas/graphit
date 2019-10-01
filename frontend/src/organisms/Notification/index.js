/**
 * Import globals.
 */
import React, { useState, useEffect } from 'react'

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
const Notification = ({ message }) => {
  const [notificationVisible, makeNotificationVisible] = useState(false)
  const toggleNotification = () => makeNotificationVisible(!notificationVisible)

  useEffect(() => {
    const timer = setTimeout(() => {
      makeNotificationVisible(!notificationVisible)
    }, 600)
    return () => clearTimeout(timer)
    // eslint-disable-next-line
  }, [])

  return (
    <Snackbar
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
      autoHideDuration={4000}
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

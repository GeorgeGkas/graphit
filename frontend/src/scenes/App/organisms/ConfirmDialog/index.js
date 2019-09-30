/**
 * Import globals.
 */
import React from 'react'
import { connect } from 'react-redux'

/**
 * Import UI framework modules.
 */
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Fade from '@material-ui/core/Fade'

/**
 * Connect component to Redux.
 */
const mapStateToProps = null

const mapDispatchToProps = null

/**
 * Transition component, used when toggle NodeEditor.
 */
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} direction="up" {...props} />
})

/**
 * Component.
 */
const ConfirmDialog = ({
  confirmAction,
  confirmDialogVisible,
  confirmMessage,
  confirmTitle,
  handleClose,
}) => {
  return (
    <Dialog
      fullWidth
      PaperProps={{
        style: {
          borderRadius: 0,
        },
      }}
      TransitionComponent={Transition}
      open={confirmDialogVisible}
      style={{
        zIndex: 9999,
      }}
      onClose={handleClose}
    >
      <DialogTitle id="form-dialog-title">{confirmTitle}</DialogTitle>
      <DialogContent>
        {confirmMessage && (
          <DialogContentText id="alert-dialog-description">
            {confirmMessage}
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleClose}>
          Cancel
        </Button>
        <Button color="primary" onClick={confirmAction}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConfirmDialog)

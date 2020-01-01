import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Fade from '@material-ui/core/Fade'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'

const mapStateToProps = null

const mapDispatchToProps = null

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} direction="up" {...props} />
})

const ConfirmDialog = ({
  confirmAction,
  confirmDialogVisible,
  confirmMessage,
  confirmTitle,
  handleClose,
}) => {
  const { t } = useTranslation()

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
          {t('confirm_dialog.cancel')}
        </Button>
        <Button color="primary" onClick={confirmAction}>
          {t('confirm_dialog.confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConfirmDialog)

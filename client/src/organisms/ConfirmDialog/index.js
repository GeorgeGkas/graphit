import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Fade from '@material-ui/core/Fade'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'

const useStyles = makeStyles(theme => ({
  title: {
    '& > h2': {
      fontFamily: 'Amaranth, sans-serif',
      textAlign: 'center',
      fontSize: '24px',
      fontWeight: 700,
      letterSpacing: '.5px',
    },
  },
  description: {
    fontFamily: 'Heebo, sans-serif',
    textAlign: 'center',
    color: '#000',
  },
  buttonsPlaceholder: {
    justifyContent: 'center',
  },
  buttonCancel: {
    fontFamily: 'Amaranth, sans-serif',
    padding: '10px 30px',
    border: '2px solid #000',
    '&:disabled': {
      border: 0,
      color: 'rgba(0, 0, 0, 0.26)',
      boxShadow: 'none',
      backgroundColor: 'rgba(0, 0, 0, 0.12)',
    },
    borderRadius: 0,
    marginRight: theme.spacing(1),
    '& .MuiButton-label': {
      textTransform: 'none',
    },
  },
  buttonConfirm: {
    fontFamily: 'Amaranth, sans-serif',
    marginRight: theme.spacing(1),
    background: '#3386F2',
    border: 0,
    borderRadius: 0,
    boxShadow: 'none',
    padding: '10px 30px',
    '& .MuiButton-label': {
      textTransform: 'none',
    },
    '&:hover': {
      boxShadow: 'none',
    },
    '&:disabled': {
      border: 0,
      color: 'rgba(0, 0, 0, 0.26)',
      boxShadow: 'none',
      backgroundColor: 'rgba(0, 0, 0, 0.12)',
    },
  },
}))

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
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Dialog
      fullWidth
      PaperProps={{
        style: {
          borderRadius: 0,
          padding: '20px',
        },
      }}
      TransitionComponent={Transition}
      open={confirmDialogVisible}
      style={{
        zIndex: 9999,
      }}
      onClose={handleClose}
    >
      <DialogTitle id="form-dialog-title" className={classes.title}>
        {confirmTitle}
      </DialogTitle>
      <DialogContent>
        {confirmMessage && (
          <DialogContentText
            id="alert-dialog-description"
            className={classes.description}
          >
            {confirmMessage}
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions className={classes.buttonsPlaceholder}>
        <Button onClick={handleClose} className={classes.buttonCancel}>
          {t('confirm_dialog.cancel')}
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={confirmAction}
          className={classes.buttonConfirm}
        >
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

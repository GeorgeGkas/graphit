import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Fade from '@material-ui/core/Fade'
import FormControl from '@material-ui/core/FormControl'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import React from 'react'
import { connect } from 'react-redux'

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
}))

const mapStateToProps = null

const mapDispatchToProps = null

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} direction="up" {...props} />
})

const InputDialog = ({
  cancelDialogAction,
  confirmDialogAction,
  confirmDialogVisible,
  error,
  errorText,
  inputLabel,
  title,
  validateInput,
}) => {
  const classes = useStyles()
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
      onClose={cancelDialogAction}
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <form
          noValidate
          className={classes.form}
          onSubmit={e => e.preventDefault()}
        >
          <FormControl className={classes.formControl}>
            <TextField
              autoFocus
              fullWidth
              error={error}
              helperText={error && errorText}
              id="inputdialog_input"
              label={inputLabel}
              margin="dense"
              type="text"
              onChange={() => {
                validateInput(
                  document.getElementById('inputdialog_input').value,
                )
              }}
              onFocus={() => {
                document.getElementById('inputdialog_input').select()
              }}
            />
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={cancelDialogAction}>
          Cancel
        </Button>
        <Button
          color="primary"
          disabled={error}
          onClick={() => {
            confirmDialogAction(
              document.getElementById('inputdialog_input').value,
            )
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InputDialog)

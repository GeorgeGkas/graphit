import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Fade from '@material-ui/core/Fade'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import FormControl from '@material-ui/core/FormControl'

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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade direction="up" ref={ref} {...props} />
})

const Presentation = ({
  open,
  submitForm,
  handleClose,
  selectedNode,
  validateNameInput,
  validName,
  isInitial,
  setAsInitialNode,
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
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      TransitionComponent={Transition}
    >
      <DialogTitle id="form-dialog-title">Edit Node</DialogTitle>
      <DialogContent>
        <form
          className={classes.form}
          noValidate
          onSubmit={e => e.preventDefault()}
        >
          <FormControl className={classes.formControl}>
            <TextField
              error={!validName}
              autoFocus
              margin="dense"
              id="node_name_input"
              label="Name"
              type="text"
              fullWidth
              defaultValue={selectedNode.name}
              onFocus={() => {
                document.getElementById('node_name_input').select()
              }}
              onChange={validateNameInput}
              helperText="Allowed names are all values from a through Z."
            />
          </FormControl>
          <FormControlLabel
            className={classes.formControlLabel}
            control={<Switch checked={isInitial} onChange={setAsInitialNode} />}
            labelPlacement="start"
            label="Set as initial node"
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={submitForm} color="primary">
          Apply Changes
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Presentation

/**
 * Import globals.
 */
import React, { useState } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

/**
 * Import UI framework modules.
 */
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Fade from '@material-ui/core/Fade'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

/**
 * Import ducks.
 */
import { operations } from '../../../Editor/duck'

/**
 * Construct component styles.
 */
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

/**
 * Connect component to Redux.
 */
const mapStateToProps = state => ({
  selectedEdge:
    state.editor.present.edges[state.editor.present.selectedEdge[0]],
})

const mapDispatchToProps = dispatch => bindActionCreators(operations, dispatch)

/**
 * Transition component, used when toggle NodeEditor.
 */
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} direction="up" {...props} />
})

/**
 * Component.
 */
const EdgeEditor = ({
  editorDialogVisible,
  handleClose,
  selectedEdge,
  updateEdgeWeight,
}) => {
  const classes = useStyles()

  const [edgeWeight, setEdgeWeight] = useState({
    valid: true,
    weight: selectedEdge.weight,
  })

  const validateEdgeWeight = e =>
    setEdgeWeight({
      valid: /^(-)?(\d)+$/.test(e.target.value),
      weight: e.target.value,
    })

  const submitForm = () => {
    updateEdgeWeight({
      id: selectedEdge.id,
      weight: edgeWeight.weight,
    })

    handleClose()
  }

  return (
    <Dialog
      fullWidth
      PaperProps={{
        style: {
          borderRadius: 0,
        },
      }}
      TransitionComponent={Transition}
      open={editorDialogVisible}
      onClose={handleClose}
    >
      <DialogTitle id="form-dialog-title">Edit Edge</DialogTitle>
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
              defaultValue={selectedEdge.weight}
              error={!edgeWeight.valid}
              helperText="Use any negative or positive integer."
              id="edge_weight_input"
              label="Weight"
              margin="dense"
              type="text"
              onChange={validateEdgeWeight}
              onFocus={() => {
                document.getElementById('edge_weight_input').select()
              }}
            />
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          color="primary"
          disabled={!edgeWeight.valid}
          onClick={submitForm}
        >
          Apply Changes
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EdgeEditor)

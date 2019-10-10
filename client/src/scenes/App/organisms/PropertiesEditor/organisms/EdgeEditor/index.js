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
import {
  operations as graphOperations,
  selectors as graphSelectors,
} from '../../../../ducks/graph'

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
  selectedEdge: graphSelectors.getSelected(state.graph.present.edges),
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(graphOperations, dispatch)

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
  updateEdgeProperties,
}) => {
  const classes = useStyles()
  const [validEdgeWeight, validateEdgeWeight] = useState(true)

  const submitForm = () => {
    const newEdgeWeight = document.getElementById('edge_weight_input').value
    const oldEdgeWeight = selectedEdge.properties.weight

    if (oldEdgeWeight !== newEdgeWeight) {
      updateEdgeProperties(selectedEdge.id, {
        weight: Number(newEdgeWeight),
      })
    }

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
              defaultValue={selectedEdge.properties.weight}
              error={!validEdgeWeight}
              helperText="Use any negative or positive integer."
              id="edge_weight_input"
              label="Weight"
              margin="dense"
              type="text"
              onChange={e =>
                validateEdgeWeight(/^(-)?(\d)+$/.test(e.target.value))
              }
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
          disabled={!validEdgeWeight}
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

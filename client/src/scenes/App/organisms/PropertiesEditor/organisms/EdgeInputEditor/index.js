/**
 * Import globals.
 */
import React from 'react'
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
const EdgeInputEditor = ({
  editorDialogVisible,
  handleClose,
  selectedEdge,
  updateEdgeProperties,
}) => {
  const classes = useStyles()
  const [validEdgeInput, validateEdgeInput] = React.useState(true)

  const submitForm = () => {
    const newEdgeInput = document.getElementById('edge_input_input').value
    const oldEdgeInput = selectedEdge.properties.input

    if (newEdgeInput !== oldEdgeInput) {
      updateEdgeProperties(selectedEdge.id, {
        input: String(newEdgeInput),
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
      <DialogTitle id="form-dialog-title">Edit Input</DialogTitle>
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
              defaultValue={selectedEdge.properties.input}
              error={!validEdgeInput}
              helperText="Single character values separated by comma (eg. a,b,c). Use @ for ε transitions."
              id="edge_input_input"
              label="Input"
              margin="dense"
              type="text"
              onChange={e =>
                validateEdgeInput(
                  e.target.value !== '' &&
                    /^(?!.*?([a-zA-z@]).*?\1)[a-zA-z@](?:,[a-zA-z@])*$/gm.test(
                      e.target.value,
                    ),
                )
              }
              onFocus={() => {
                document.getElementById('edge_input_input').select()
              }}
            />
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleClose}>
          Cancel
        </Button>
        <Button color="primary" disabled={!validEdgeInput} onClick={submitForm}>
          Apply Changes
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EdgeInputEditor)
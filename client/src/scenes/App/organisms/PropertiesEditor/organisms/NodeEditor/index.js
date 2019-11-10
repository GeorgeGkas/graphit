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
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
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
  selectedNode: graphSelectors.getSelected(state.graph.present.nodes),
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
const NodeEditor = ({
  editorDialogVisible,
  handleClose,
  selectedNode,
  updateNodeProperties,
}) => {
  const classes = useStyles()
  const [validNodeName, validateNodeName] = React.useState(true)
  const [nodeIsInitial, setInitialState] = React.useState(
    selectedNode.properties.initial,
  )
  const toggleInitialState = () => setInitialState(!nodeIsInitial)

  const [nodeIsFinal, setFinalState] = React.useState(
    selectedNode.properties.final,
  )
  const toggleFinalState = () => setFinalState(!nodeIsFinal)

  const submitForm = () => {
    const newNodeName = document.getElementById('node_name_input').value
    const oldNodeName = selectedNode.properties.name

    /**
     * Dispatch action only if node properties have changed.
     */
    if (
      newNodeName !== oldNodeName ||
      nodeIsInitial !== selectedNode.properties.initial ||
      nodeIsFinal !== selectedNode.properties.final
    ) {
      updateNodeProperties(selectedNode.id, {
        final: nodeIsFinal,
        initial: nodeIsInitial,
        name: newNodeName,
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
      <DialogTitle id="form-dialog-title">Edit Node</DialogTitle>
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
              defaultValue={selectedNode.properties.name}
              error={!validNodeName}
              helperText="Allowed names are all values from a through Z."
              id="node_name_input"
              label="Name"
              margin="dense"
              type="text"
              onChange={e =>
                validateNodeName(/^[A-Za-z]$/.test(e.target.value))
              }
              onFocus={() => {
                document.getElementById('node_name_input').select()
              }}
            />
          </FormControl>
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Switch checked={nodeIsInitial} onChange={toggleInitialState} />
            }
            label="Set as initial node"
            labelPlacement="start"
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Switch checked={nodeIsFinal} onChange={toggleFinalState} />
            }
            label="Set as final node"
            labelPlacement="start"
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleClose}>
          Cancel
        </Button>
        <Button color="primary" disabled={!validNodeName} onClick={submitForm}>
          Apply Changes
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NodeEditor)

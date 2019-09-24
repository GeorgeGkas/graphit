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
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
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
  initialNode: state.editor.present.initialNode,
  selectedNode:
    state.editor.present.nodes[state.editor.present.selectedNodes[0]],
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
const NodeEditor = ({
  editorDialogVisible,
  handleClose,
  initialNode,
  selectedNode,
  setInitialNode,
  updateNodeName,
}) => {
  const classes = useStyles()

  const [nodeName, setNodeName] = useState({
    name: selectedNode.name,
    valid: true,
  })

  const [nodeIsInitial, setInitialState] = useState({
    initial: initialNode === selectedNode.id,
    initialStateChanged: false,
  })

  const validateNodeName = e =>
    setNodeName({
      name: e.target.value,
      valid: /^[A-Za-z]$/.test(e.target.value),
    })

  const toggleInitialState = () =>
    setInitialState({
      initial: !nodeIsInitial.initial,
      initialStateChanged: true,
    })

  const submitForm = () => {
    if (nodeName.name !== selectedNode.name) {
      updateNodeName({
        id: selectedNode.id,
        name: nodeName.name,
      })
    }

    if (nodeIsInitial.initialStateChanged) {
      setInitialNode(nodeIsInitial.initial ? selectedNode.id : null)
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
              defaultValue={selectedNode.name}
              error={!nodeName.valid}
              helperText="Allowed names are all values from a through Z."
              id="node_name_input"
              label="Name"
              margin="dense"
              type="text"
              onChange={validateNodeName}
              onFocus={() => {
                document.getElementById('node_name_input').select()
              }}
            />
          </FormControl>
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Switch
                checked={nodeIsInitial.initial}
                onChange={toggleInitialState}
              />
            }
            label="Set as initial node"
            labelPlacement="start"
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleClose}>
          Cancel
        </Button>
        <Button color="primary" disabled={!nodeName.valid} onClick={submitForm}>
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

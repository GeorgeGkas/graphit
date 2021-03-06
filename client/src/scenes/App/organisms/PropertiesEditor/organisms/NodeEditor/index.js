import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Fade from '@material-ui/core/Fade'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { makeStyles } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  operations as graphOperations,
  selectors as graphSelectors,
} from '../../../../ducks/graph'

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
    '& > .MuiFormControlLabel-label': {
      fontFamily: 'Amaranth, sans-serif',
    },
  },
  buttonSubmit: {
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
  buttonClose: {
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
  formTitle: {
    '& > h2': {
      fontFamily: 'Amaranth, sans-serif',
      fontSize: '24px',
      fontWeight: 700,
      letterSpacing: '.5px',
    },
  },
}))

const mapStateToProps = state => ({
  algorithm: state.graph.present.metadata.algorithm,
  selectedNode: graphSelectors.getSelected(state.graph.present.nodes),
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(graphOperations, dispatch)

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} direction="up" {...props} />
})

const NodeEditor = ({
  algorithm,
  editorDialogVisible,
  handleClose,
  selectedNode,
  updateNodeProperties,
}) => {
  const classes = useStyles()
  const { t } = useTranslation()

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
          padding: '20px',
        },
      }}
      TransitionComponent={Transition}
      open={editorDialogVisible}
      onClose={handleClose}
    >
      <DialogTitle id="form-dialog-title" className={classes.formTitle}>
        {algorithm === 'Automata'
          ? t('app.node_editor.title_automata')
          : t('app.node_editor.title')}
      </DialogTitle>
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
              helperText={t('app.node_editor.name_input_help_text')}
              id="node_name_input"
              label={t('app.node_editor.name_input_label')}
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
            label={
              algorithm === 'Automata'
                ? t('app.node_editor.initial_switch_text_automata')
                : t('app.node_editor.initial_switch_text')
            }
            labelPlacement="start"
          />
          {algorithm === 'Automata' && (
            <FormControlLabel
              className={classes.formControlLabel}
              control={
                <Switch checked={nodeIsFinal} onChange={toggleFinalState} />
              }
              label={
                algorithm === 'Automata'
                  ? t('app.node_editor.final_switch_text_automata')
                  : t('app.node_editor.final_switch_text')
              }
              labelPlacement="start"
            />
          )}
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} className={classes.buttonClose}>
          {t('app.node_editor.cancel')}
        </Button>
        <Button
          color="primary"
          variant="contained"
          disabled={!validNodeName}
          onClick={submitForm}
          className={classes.buttonSubmit}
        >
          {t('app.node_editor.confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NodeEditor)

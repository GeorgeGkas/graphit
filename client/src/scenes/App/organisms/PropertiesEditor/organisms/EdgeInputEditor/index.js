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
  selectedEdge: graphSelectors.getSelected(state.graph.present.edges),
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(graphOperations, dispatch)

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} direction="up" {...props} />
})

const EdgeInputEditor = ({
  editorDialogVisible,
  handleClose,
  selectedEdge,
  updateEdgeProperties,
}) => {
  const classes = useStyles()
  const { t } = useTranslation()

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
          padding: '20px',
        },
      }}
      TransitionComponent={Transition}
      open={editorDialogVisible}
      onClose={handleClose}
    >
      <DialogTitle id="form-dialog-title" className={classes.formTitle}>
        {t('app.edge_input_editor.title')}
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
              defaultValue={selectedEdge.properties.input}
              error={!validEdgeInput}
              helperText={t('app.edge_input_editor.edge_input_input_help_test')}
              id="edge_input_input"
              label={t('app.edge_input_editor.edge_input_input_label')}
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
      <DialogActions style={{ padding: '20px 15px' }}>
        <Button onClick={handleClose} className={classes.buttonClose}>
          {t('app.edge_input_editor.cancel')}
        </Button>
        <Button
          color="primary"
          variant="contained"
          disabled={!validEdgeInput}
          onClick={submitForm}
          className={classes.buttonSubmit}
        >
          {t('app.edge_input_editor.confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EdgeInputEditor)

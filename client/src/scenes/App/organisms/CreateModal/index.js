/**
 * Import globals.
 */
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

/**
 * Import UI framework modules.
 */
import Backdrop from '@material-ui/core/Backdrop'
import Button from '@material-ui/core/Button'
import Fade from '@material-ui/core/Fade'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Modal from '@material-ui/core/Modal'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

/**
 * Import components.
 */
import Stepper from '../../../../organisms/Stepper'

/**
 * Import ducks.
 */
import { operations as graphOperations } from '../../ducks/graph'

/**
 * Construct component styles.
 */
const useStyles = makeStyles(theme => ({
  formControl: {
    width: '100%',
  },
  modal: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  paper: {
    '&,&:focus,&:active,&:hover': {
      outline: 0,
    },
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    minWidth: '768px',
    padding: theme.spacing(2, 4, 3),
  },
}))

/**
 * Connect component to Redux.
 */
const mapStateToProps = state => ({
  isNewEditor: state.graph.present.metadata.algorithm === '',
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(graphOperations, dispatch)

/**
 * Component.
 */
const CreateModal = ({ handleClose, isNewEditor, loadGraph, open }) => {
  const history = useHistory()
  const classes = useStyles()
  const [uploadedGraph, setUploadedGraph] = React.useState(
    '{"edges":{}, "metadata": {}, "nodes": {}}',
  )

  const [projectName, setProjectName] = React.useState(null)
  const [validProjectName, setProjectNameValidity] = React.useState(false)

  const [algorithm, chooseAlgorithm] = React.useState('')
  const [algorithmValid, setAlgorithmValid] = React.useState(false)

  return (
    <Modal
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      className={classes.modal}
      open={open}
      onClose={() => {
        if (isNewEditor) {
          return
        }

        setUploadedGraph('{"edges":{}, "metadata": {}, "nodes": {}}')
        handleClose()
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <Stepper
            steps={[
              {
                content: (
                  <Grid
                    container
                    alignItems="center"
                    direction="column"
                    justify="center"
                  >
                    <FormControl className={classes.formControl}>
                      <InputLabel id="algorithm_select_label">
                        Algorithm
                      </InputLabel>
                      <Select
                        id="algorithm_select"
                        value={algorithm}
                        onChange={e => {
                          if (
                            e.target.value === 'Dijkstra' ||
                            e.target.value === 'Automata'
                          ) {
                            setAlgorithmValid(true)
                            chooseAlgorithm(e.target.value)
                          }
                        }}
                      >
                        <MenuItem value={'Dijkstra'}>Dijkstra</MenuItem>
                        <MenuItem value={'Automata'}>Automata</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                ),
                nextStepDisabledIf: !algorithmValid,
                optional: false,
                title: 'Choose algorithm',
              },
              {
                content: (
                  <Grid
                    container
                    alignItems="center"
                    direction="column"
                    justify="center"
                  >
                    <FormControl className={classes.formControl}>
                      <TextField
                        autoFocus
                        fullWidth
                        defaultValue={projectName}
                        helperText="Type any non empty value."
                        id="project_name_input"
                        label="Project Name"
                        margin="dense"
                        type="text"
                        onChange={e => {
                          if (e.target.value.trim() !== '') {
                            setProjectNameValidity(true)
                          } else {
                            setProjectNameValidity(false)
                          }
                        }}
                        onFocus={() => {
                          document.getElementById('project_name_input').select()
                        }}
                      />
                    </FormControl>
                  </Grid>
                ),
                nextStepDisabledIf: !validProjectName,
                onNext: () =>
                  setProjectName(
                    document.getElementById('project_name_input').value,
                  ),
                optional: false,
                title: 'Choose project name',
              },
            ]}
            onComplete={async () => {
              const graph = {
                ...JSON.parse(uploadedGraph),
                metadata: {
                  algorithm,
                  createdAt: new Date().toISOString(),
                  id: '',
                  name: projectName,
                },
              }

              await new Promise(resolve => setTimeout(resolve, 500))
              loadGraph(graph)
              history.replace('/app')
            }}
            onCompleteEndSuccess={() => (
              <Grid
                container
                alignItems="center"
                direction="column"
                justify="center"
              >
                <Typography gutterBottom variant="body1">
                  Hooray!!!
                </Typography>
                <Typography gutterBottom variant="caption">
                  Close this window to start working on your project
                </Typography>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    setUploadedGraph(
                      '{"edges":{}, "metadata": {}, "nodes": {}}',
                    )
                    setProjectName(null)
                    setProjectNameValidity(false)
                    chooseAlgorithm('')
                    setAlgorithmValid(false)
                    handleClose()
                  }}
                >
                  Close
                </Button>
              </Grid>
            )}
            onCompleteStart={() => (
              <Grid
                container
                alignItems="center"
                direction="column"
                justify="center"
              >
                <Typography gutterBottom variant="body1">
                  Creating new project...
                </Typography>
              </Grid>
            )}
          />
        </div>
      </Fade>
    </Modal>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateModal)

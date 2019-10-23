/**
 * Import globals.
 */
import React from 'react'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'

/**
 * Import UI framework modules.
 */
import Backdrop from '@material-ui/core/Backdrop'
import Button from '@material-ui/core/Button'
import CloudUploadIcon from '@material-ui/icons/CloudUploadSharp'
import Fade from '@material-ui/core/Fade'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import Modal from '@material-ui/core/Modal'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

/**
 * Import components.
 */
import Stepper from '../Stepper'

/**
 * Import ducks.
 */
import { operations as projectsOperations } from '../../../../../../ducks/projects'
import { withAuthentication } from '../../../../../../providers/Auth'

/**
 * Construct component styles.
 */
const useStyles = makeStyles(theme => ({
  fileInput: {
    display: 'none',
    position: 'absolute',
  },
  filename: {
    textTransform: 'none',
  },
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
  uploadButton: {
    '&:hover': {
      backgroundColor: 'inherit',
    },
    border: '2px dashed #ddd',
    width: '100%',
  },
  uploadContainer: {
    padding: '30px',
    textAlign: 'center',
    width: '100%',
  },
}))

/**
 * Connect component to Redux.
 */
const mapStateToProps = null

const mapDispatchToProps = dispatch =>
  bindActionCreators(projectsOperations, dispatch)

/**
 * Component.
 */
const CreateModal = ({ auth, createProject, handleClose, open }) => {
  const classes = useStyles()
  const [uploadedGraph, setUploadedGraph] = React.useState(
    '{"edges":{}, "metadata": {}, "nodes": {}}',
  )
  const [uploadedGraphFilename, setUploadedGraphFilename] = React.useState(null)
  const [projectName, setProjectName] = React.useState(null)
  const [validProjectName, setProjectNameValidity] = React.useState(false)

  return (
    <Modal
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      className={classes.modal}
      open={open}
      onClose={handleClose}
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
                    <Button
                      className={classes.uploadButton}
                      variant="text"
                      onClick={() =>
                        document.getElementById('load_state').click()
                      }
                    >
                      <Grid item className={classes.uploadContainer}>
                        <CloudUploadIcon color="primary" fontSize="large" />
                        <Typography gutterBottom variant="body1">
                          Browse
                        </Typography>
                        <Typography
                          gutterBottom
                          className={classes.filename}
                          display="block"
                          variant="caption"
                        >
                          {uploadedGraphFilename}
                        </Typography>
                        <input
                          accept=".json"
                          className={classes.fileInput}
                          id="load_state"
                          type="file"
                          onChange={e => {
                            const reader = new FileReader()
                            reader.onloadend = (file => () => {
                              setUploadedGraph(reader.result)
                              setUploadedGraphFilename(file.name)
                            })(e.target.files[0])
                            reader.readAsText(e.target.files[0])
                          }}
                        />
                      </Grid>
                    </Button>
                  </Grid>
                ),
                nextStepDisabledIf: uploadedGraphFilename === null,
                optional: true,
                title: 'Upload from file',
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
              const graph = JSON.parse(uploadedGraph)
              const data = {
                author: auth.authUser.uid,
                graph: JSON.stringify({
                  ...graph,
                  metadata: {
                    algorithm: 'Dijkstra',
                    createdAt: new Date().toISOString(),
                    name: projectName,
                  },
                }),
              }

              await createProject(data)
            }}
            onCompleteEndFail={() => (
              <Grid
                container
                alignItems="center"
                direction="column"
                justify="center"
              >
                <Typography gutterBottom variant="body1">
                  Could not create project
                </Typography>
              </Grid>
            )}
            onCompleteEndSuccess={() => {
              return (
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
                    Close this window and select the newly create project from
                    project list
                  </Typography>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={handleClose}
                  >
                    Close
                  </Button>
                </Grid>
              )
            }}
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

export default compose(
  withAuthentication,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(CreateModal)

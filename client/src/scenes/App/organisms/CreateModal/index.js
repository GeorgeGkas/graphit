import Backdrop from '@material-ui/core/Backdrop'
import Button from '@material-ui/core/Button'
import Fade from '@material-ui/core/Fade'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Modal from '@material-ui/core/Modal'
import Select from '@material-ui/core/Select'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { bindActionCreators, compose } from 'redux'

import Stepper from '../../../../organisms/Stepper'
import { withFirebase } from '../../../../providers/Firebase'
import { operations as graphOperations } from '../../ducks/graph'
import CloudUploadIcon from './images/uploadCloud.svg'

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
    minWidth: '768px',
    padding: theme.spacing(2, 4, 3),
  },
  uploadButton: {
    '&:hover': {
      backgroundColor: 'inherit',
    },
    border: '1px solid rgba(0, 0, 0, .1)',
    borderRadius: 0,
    width: '100%',
  },
  uploadContainer: {
    padding: '30px',
    textAlign: 'center',
    width: '100%',
  },
  uploadButtonText: {
    fontFamily: 'Amaranth, sans-serif',
    fontWeight: 700,
  },
  closeButton: {
    marginTop: '15px',
    fontFamily: 'Amaranth, sans-serif',
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
  },
  hooray: {
    fontFamily: 'Amaranth, sans-serif',
    fontWeight: 700,
    fontSize: '21px',
  },
}))

const mapStateToProps = state => ({
  isNewEditor: state.graph.present.metadata.algorithm === '',
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(graphOperations, dispatch)

const CreateModal = ({
  firebase,
  handleClose,
  isNewEditor,
  loadGraph,
  open,
}) => {
  const history = useHistory()
  const classes = useStyles()
  const { t } = useTranslation()

  const [uploadedGraph, setUploadedGraph] = React.useState(
    '{"edges":{}, "metadata": {}, "nodes": {}}',
  )

  const [projectName, setProjectName] = React.useState(null)
  const [validProjectName, setProjectNameValidity] = React.useState(false)

  const [algorithm, chooseAlgorithm] = React.useState('')
  const [algorithmValid, setAlgorithmValid] = React.useState(false)

  const [uploadedGraphFilename, setUploadedGraphFilename] = React.useState(null)

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
        setUploadedGraphFilename(null)
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
                    <Button
                      className={classes.uploadButton}
                      variant="text"
                      onClick={() =>
                        document
                          .getElementById('load_state_create_modal_guest')
                          .click()
                      }
                    >
                      <Grid item className={classes.uploadContainer}>
                        <img
                          alt=""
                          src={CloudUploadIcon}
                          width="48"
                          height="48"
                        />
                        <Typography
                          gutterBottom
                          variant="body1"
                          className={classes.uploadButtonText}
                        >
                          {t('app.create_modal.browse_files')}
                        </Typography>
                        <Typography
                          gutterBottom
                          className={classes.filename}
                          display="block"
                          variant="caption"
                        >
                          {uploadedGraphFilename || 'This step is optional'}
                        </Typography>
                        <input
                          accept=".json"
                          className={classes.fileInput}
                          id="load_state_create_modal_guest"
                          type="file"
                          onChange={e => {
                            const reader = new FileReader()
                            reader.onloadend = (file => () => {
                              setUploadedGraph(reader.result)
                              setUploadedGraphFilename(file.name)

                              if (
                                JSON.parse(
                                  reader.result,
                                ).metadata.name.trim() !== ''
                              ) {
                                setProjectNameValidity(true)
                                setProjectName(
                                  JSON.parse(reader.result).metadata.name,
                                )

                                setAlgorithmValid(true)
                                chooseAlgorithm(
                                  JSON.parse(reader.result).metadata.algorithm,
                                )
                              }
                            })(e.target.files[0])
                            reader.readAsText(e.target.files[0])
                          }}
                        />
                      </Grid>
                    </Button>
                  </Grid>
                ),
                nextStepDisabledIf: uploadedGraphFilename === null,
                onNextFinish: () => uploadedGraphFilename,
                onSkip: () => {
                  setUploadedGraph('{"edges":{}, "metadata": {}, "nodes": {}}')
                  setUploadedGraphFilename(null)
                  setProjectName(null)
                  setProjectNameValidity(false)
                  chooseAlgorithm('')
                  setAlgorithmValid(false)
                },
                optional: true,
                title: t('app.create_modal.file_upload'),
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
                      <InputLabel id="algorithm_select_label">
                        {t('app.create_modal.choose_operation_title')}
                      </InputLabel>
                      <Select
                        id="algorithm_select"
                        color="#3386F2"
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
                        <MenuItem value={'Dijkstra'}>
                          {t('algorithm.dijkstra.title')}
                        </MenuItem>
                        <MenuItem value={'Automata'}>
                          {t('algorithm.automata.title')}
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                ),
                nextStepDisabledIf: !algorithmValid,
                optional: false,
                title: t('app.create_modal.choose_operation'),
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
                        color="#3386F2"
                        autoFocus
                        fullWidth
                        defaultValue={projectName}
                        helperText={t(
                          'app.create_modal.project_name_input_help_text',
                        )}
                        id="project_name_input"
                        label={t('app.create_modal.project_name_input_label')}
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
                title: t('app.create_modal.choose_project_name'),
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
            onCompleteEndSuccess={() => {
              firebase.analytics.logEvent('app_create_project', {
                algorithm,
                from_file: uploadedGraphFilename !== null,
              })

              return (
                <Grid
                  container
                  alignItems="center"
                  direction="column"
                  justify="center"
                >
                  <Typography
                    gutterBottom
                    variant="body1"
                    className={classes.hooray}
                  >
                    {t('app.create_modal.project_created_title')}
                  </Typography>
                  <Typography gutterBottom variant="caption">
                    {t('app.create_modal.project_created_body')}
                  </Typography>
                  <Button
                    className={classes.closeButton}
                    color="primary"
                    variant="contained"
                    onClick={() => {
                      setUploadedGraph(
                        '{"edges":{}, "metadata": {}, "nodes": {}}',
                      )
                      setUploadedGraphFilename(null)
                      setProjectName(null)
                      setProjectNameValidity(false)
                      chooseAlgorithm('')
                      setAlgorithmValid(false)
                      handleClose()
                    }}
                  >
                    {t('app.create_modal.close')}
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
                  {t('app.create_modal.creating_new_project')}
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
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(CreateModal)

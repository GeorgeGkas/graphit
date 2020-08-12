import AppBar from '@material-ui/core/AppBar'
import blue from '@material-ui/core/colors/blue'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip'
import filter from 'lodash/fp/filter'
import find from 'lodash/fp/find'
import intersection from 'lodash/fp/intersection'
import map from 'lodash/fp/map'
import reduce from 'lodash/fp/reduce'
import uniq from 'lodash/fp/uniq'
import uniqBy from 'lodash/fp/uniqBy'
import values from 'lodash/fp/values'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import { bindActionCreators, compose } from 'redux'

import InputDialog from '../../../../organisms/InputDialog'
import Notification from '../../../../organisms/Notification'
import { withFirebase } from '../../../../providers/Firebase'
import { operations as algorithmOperations } from '../../ducks/algorithm'
import { operations as editorOperations } from '../../ducks/editor'
import { operations as graphOperations } from '../../ducks/graph'
import { Divider } from './atoms/Divider'
import EdgeActiveIcon from './images/edgesActive.svg'
import EdgeInactiveIcon from './images/edgesInactive.svg'
import FirstStepIcon from './images/firstStep.svg'
import GridOnIcon from './images/gridActive.svg'
import GridOffIcon from './images/gridInactive.svg'
import LastStepIcon from './images/lastStep.svg'
import NextStepIcon from './images/nextStep.svg'
import NodeActiveIcon from './images/nodesActive.svg'
import NodeInactiveIcon from './images/nodesInactive.svg'
import PlayArrowIcon from './images/play.svg'
import PointerActiveIcon from './images/pointerActive.svg'
import PointerInactiveIcon from './images/pointerInactive.svg'
import PreviousStepIcon from './images/previousStep.svg'
import RedoIcon from './images/redo.svg'
import StopIcon from './images/stop.svg'
import UndoIcon from './images/undo.svg'
import ZoomInIcon from './images/zoomIn.svg'
import ZoomOutIcon from './images/zoomOut.svg'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  buttonActive: {
    color: blue['500'],
    margin: theme.spacing(1),
  },
  displayInherit: {
    display: 'inherit',
  },
  root: {
    background: '#fff',
    display: 'flex',
  },
  iconDisabled: {
    opacity: 0.5,
  },
}))

const mapStateToProps = state => ({
  currentEditorAction: state.editor.currentEditorAction,
  cursor: state.editor.cursor,
  futureExist: state.graph.future.length,
  graph: state.graph.present,
  nextAlgorithmEntryExist:
    state.algorithm.steps[state.algorithm.currentIndex + 1] !== undefined,
  pastExist: state.graph.past.length,
  previousAlgorithmEntryExist:
    state.algorithm.steps[state.algorithm.currentIndex - 1] !== undefined,
  stageScale: state.editor.stage.scale,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...algorithmOperations,
      ...editorOperations,
      ...graphOperations,
    },
    dispatch,
  )

const EditorBar = ({
  currentEditorAction,
  cursor,
  firebase,
  firstIteration,
  futureExist,
  graph,
  gridVisible,
  lastIteration,
  nextAlgorithmEntryExist,
  nextIteration,
  pastExist,
  previousAlgorithmEntryExist,
  previousIteration,
  redoGraphHistory,
  stageScale,
  startPlaying,
  stopPlaying,
  toggleGrid,
  undoGraphHistory,
  unselectAll,
  updateCurrentEditorAction,
  updateStage,
}) => {
  const classes = useStyles()
  const { t } = useTranslation()

  const [
    promptAutomataInputDialogVisible,
    makePromptAutomataInputDialogVisible,
  ] = React.useState(false)
  const [
    automataInputDialogError,
    makeAutomataInputDialogError,
  ] = React.useState(true)

  const togglePromptAutomataInputDialog = () => {
    makePromptAutomataInputDialogVisible(!promptAutomataInputDialogVisible)
    makeAutomataInputDialogError(true)
  }

  const validAutomata = () => {
    const nodes = values(graph.nodes)

    if (filter(['properties.initial', true])(nodes).length !== 1) {
      toast.dismiss()
      toast(
        <Notification
          message={t('algorithm.automata.errors.one_initial_state')}
        />,
      )
      return false
    }

    if (!find(['properties.final', true])(nodes)) {
      toast.dismiss()
      toast(
        <Notification
          message={t('algorithm.automata.errors.one_final_state')}
        />,
      )
      return false
    }

    if (uniqBy('properties.name', nodes).length !== nodes.length) {
      toast.dismiss()
      toast(
        <Notification
          message={t('algorithm.automata.errors.duplicate_states')}
        />,
      )
      return false
    }

    return true
  }

  const validateAutomata = () =>
    validAutomata() && togglePromptAutomataInputDialog()

  const inputIsInAlphabet = input => {
    const automataSymbols = uniq(
      reduce((arr, input) => [...arr, ...input.split(',')])([])(
        map('properties.input')(values(graph.edges)),
      ),
    )

    const inputSymbols = uniq(input.split(''))

    return makeAutomataInputDialogError(
      !input ||
        input.includes('@') ||
        inputSymbols.length !==
          intersection(inputSymbols, automataSymbols).length,
    )
  }

  const startPlayingAutomata = input => {
    togglePromptAutomataInputDialog()
    startPlaying(input)
    firebase.analytics.logEvent('editor_start_play')
  }

  const zoomOut = () => {
    const scaleBy = 1.1

    const mousePointTo = {
      x: cursor.x / stageScale / stageScale,
      y: cursor.y / stageScale / stageScale,
    }

    let newScale = stageScale / scaleBy

    const newPos = {
      x: -(mousePointTo.x / newScale) * newScale,
      y: -(mousePointTo.y / newScale) * newScale,
    }

    updateStage({
      pos: newPos,
      scale: newScale,
    })
  }

  const zoomIn = () => {
    const scaleBy = 1.1

    const mousePointTo = {
      x: cursor.x / stageScale / stageScale,
      y: cursor.y / stageScale / stageScale,
    }

    let newScale = stageScale * scaleBy

    const newPos = {
      x: -(mousePointTo.x / newScale) * newScale,
      y: -(mousePointTo.y / newScale) * newScale,
    }

    updateStage({
      pos: newPos,
      scale: newScale,
    })
  }

  return (
    <>
      <AppBar className={classes.root} id="editor_bar" position="static">
        <Toolbar>
          <Grid container justify="center" direction="row">
            <div
              className={classes.displayInherit}
              id="editor_bar_undo_redo_section"
            >
              <Tooltip title={t('app.editorbar.undo')}>
                <div>
                  <IconButton
                    className={classes.button}
                    disabled={!pastExist || currentEditorAction === 'isPlaying'}
                    onClick={() => {
                      undoGraphHistory()
                      firebase.analytics.logEvent('editor_undo_history')
                    }}
                  >
                    <img
                      alt="undo icon"
                      src={UndoIcon}
                      width="18"
                      height="18"
                      className={
                        !pastExist || currentEditorAction === 'isPlaying'
                          ? classes.iconDisabled
                          : undefined
                      }
                    />
                  </IconButton>
                </div>
              </Tooltip>

              <Tooltip title={t('app.editorbar.redo')}>
                <div>
                  <IconButton
                    className={classes.button}
                    disabled={
                      !futureExist || currentEditorAction === 'isPlaying'
                    }
                    onClick={() => {
                      redoGraphHistory()
                      firebase.analytics.logEvent('editor_redo_history')
                    }}
                  >
                    <img
                      alt="undo icon"
                      src={RedoIcon}
                      width="18"
                      height="18"
                      className={
                        !futureExist || currentEditorAction === 'isPlaying'
                          ? classes.iconDisabled
                          : undefined
                      }
                    />
                  </IconButton>
                </div>
              </Tooltip>
            </div>

            <div
              className={classes.displayInherit}
              id="editor_bar_zoom_section"
            >
              <Tooltip title={t('app.editorbar.zoom_in')}>
                <div>
                  <IconButton
                    className={classes.button}
                    onClick={() => {
                      zoomIn()
                      firebase.analytics.logEvent('editor_zoom_in')
                    }}
                  >
                    <img
                      alt="zoom in icon"
                      src={ZoomInIcon}
                      width="18"
                      height="18"
                    />
                  </IconButton>
                </div>
              </Tooltip>

              <Tooltip title={t('app.editorbar.zoom_out')}>
                <div>
                  <IconButton
                    className={classes.button}
                    onClick={() => {
                      zoomOut()
                      firebase.analytics.logEvent('editor_zoom_out')
                    }}
                  >
                    <img
                      alt="zoom out icon"
                      src={ZoomOutIcon}
                      width="18"
                      height="18"
                    />
                  </IconButton>
                </div>
              </Tooltip>
            </div>

            <div
              className={classes.displayInherit}
              id="editor_bar_grid_section"
            >
              <Tooltip title={t('app.editorbar.grid')}>
                <div>
                  <IconButton
                    className={classes.button}
                    onClick={() => {
                      toggleGrid()
                      firebase.analytics.logEvent('editor_toggle_grid')
                    }}
                  >
                    {gridVisible ? (
                      <img
                        alt="grid on icon"
                        src={GridOnIcon}
                        width="18"
                        height="18"
                      />
                    ) : (
                      <img
                        alt="grid off icon"
                        src={GridOffIcon}
                        width="18"
                        height="18"
                      />
                    )}
                  </IconButton>
                </div>
              </Tooltip>
            </div>

            <Divider />

            <div
              className={classes.displayInherit}
              id="editor_bar_editor_mode_section"
            >
              <Tooltip title={t('app.editorbar.select_mode')}>
                <div id="editor_bar_editor_select_mode_section">
                  <IconButton
                    className={
                      currentEditorAction === 'select'
                        ? classes.buttonActive
                        : classes.button
                    }
                    disabled={currentEditorAction === 'isPlaying'}
                    onClick={() => {
                      unselectAll()
                      updateCurrentEditorAction('select')
                      firebase.analytics.logEvent('editor_action_select_node')
                    }}
                  >
                    {currentEditorAction !== 'select' ? (
                      <img
                        alt="pointer inactive icon"
                        src={PointerInactiveIcon}
                        width="18"
                        height="18"
                        className={
                          currentEditorAction === 'isPlaying'
                            ? classes.iconDisabled
                            : undefined
                        }
                      />
                    ) : (
                      <img
                        alt="pointer active icon"
                        src={PointerActiveIcon}
                        width="18"
                        height="18"
                      />
                    )}
                  </IconButton>
                </div>
              </Tooltip>

              <Tooltip
                title={
                  graph.metadata.algorithm === 'Automata'
                    ? t('app.editorbar.create_states')
                    : t('app.editorbar.create_nodes')
                }
              >
                <div id="editor_bar_editor_nodes_mode_section">
                  <IconButton
                    className={
                      currentEditorAction === 'node'
                        ? classes.buttonActive
                        : classes.button
                    }
                    disabled={currentEditorAction === 'isPlaying'}
                    onClick={() => {
                      unselectAll()
                      updateCurrentEditorAction('node')
                      firebase.analytics.logEvent('editor_action_create_node')
                    }}
                  >
                    {currentEditorAction !== 'node' ? (
                      <img
                        alt="node inactive icon"
                        src={NodeInactiveIcon}
                        width="18"
                        height="18"
                        className={
                          currentEditorAction === 'isPlaying'
                            ? classes.iconDisabled
                            : undefined
                        }
                      />
                    ) : (
                      <img
                        alt="node active icon"
                        src={NodeActiveIcon}
                        width="18"
                        height="18"
                      />
                    )}
                  </IconButton>
                </div>
              </Tooltip>

              <Tooltip
                title={
                  graph.metadata.algorithm === 'Automata'
                    ? t('app.editorbar.create_transitions')
                    : t('app.editorbar.create_edges')
                }
              >
                <div id="editor_bar_editor_edges_mode_section">
                  <IconButton
                    className={
                      currentEditorAction === 'edge'
                        ? classes.buttonActive
                        : classes.button
                    }
                    disabled={currentEditorAction === 'isPlaying'}
                    onClick={() => {
                      unselectAll()
                      updateCurrentEditorAction('edge')
                      firebase.analytics.logEvent('editor_action_create_edge')
                    }}
                  >
                    {currentEditorAction !== 'edge' ? (
                      <img
                        alt="edge inactive icon"
                        src={EdgeInactiveIcon}
                        width="18"
                        height="18"
                        className={
                          currentEditorAction === 'isPlaying'
                            ? classes.iconDisabled
                            : undefined
                        }
                      />
                    ) : (
                      <img
                        alt="edge active icon"
                        src={EdgeActiveIcon}
                        width="18"
                        height="18"
                      />
                    )}
                  </IconButton>
                </div>
              </Tooltip>
            </div>

            <Divider />

            <div
              className={classes.displayInherit}
              id="editor_bar_algorithm_section"
            >
              <Tooltip title={t('app.editorbar.run_operation')}>
                <div id="editor_bar_algorithm_play_section">
                  <IconButton
                    className={classes.button}
                    onClick={() => {
                      unselectAll()

                      if (currentEditorAction === 'isPlaying') {
                        stopPlaying()
                        firebase.analytics.logEvent('editor_stop_play')
                      } else if (graph.metadata.algorithm === 'Automata') {
                        validateAutomata()
                      } else {
                        startPlaying()
                        firebase.analytics.logEvent('editor_start_play')
                      }
                    }}
                  >
                    {currentEditorAction === 'isPlaying' ? (
                      <img
                        alt="stop icon"
                        src={StopIcon}
                        width="17"
                        height="17"
                      />
                    ) : (
                      <img
                        alt="play icon"
                        src={PlayArrowIcon}
                        width="17"
                        height="17"
                      />
                    )}
                  </IconButton>
                </div>
              </Tooltip>

              <Tooltip title={t('app.editorbar.first_step')}>
                <div id="editor_bar_algorithm_first_step_section">
                  <IconButton
                    className={classes.button}
                    disabled={
                      currentEditorAction !== 'isPlaying' ||
                      !previousAlgorithmEntryExist
                    }
                    onClick={() => {
                      firstIteration()
                      firebase.analytics.logEvent('editor_play_first_step')
                    }}
                  >
                    <img
                      alt="go to first step icon"
                      src={FirstStepIcon}
                      width="17"
                      height="17"
                      className={
                        currentEditorAction !== 'isPlaying' ||
                        !previousAlgorithmEntryExist
                          ? classes.iconDisabled
                          : undefined
                      }
                    />
                  </IconButton>
                </div>
              </Tooltip>

              <Tooltip title={t('app.editorbar.previous_step')}>
                <div id="editor_bar_algorithm_back_step_section">
                  <IconButton
                    className={classes.button}
                    disabled={
                      currentEditorAction !== 'isPlaying' ||
                      !previousAlgorithmEntryExist
                    }
                    onClick={() => {
                      previousIteration()
                      firebase.analytics.logEvent('editor_play_previous_step')
                    }}
                  >
                    <img
                      alt="go to previous step icon"
                      src={PreviousStepIcon}
                      width="17"
                      height="17"
                      className={
                        currentEditorAction !== 'isPlaying' ||
                        !previousAlgorithmEntryExist
                          ? classes.iconDisabled
                          : undefined
                      }
                    />
                  </IconButton>
                </div>
              </Tooltip>

              <Tooltip title={t('app.editorbar.next_step')}>
                <div
                  id="editor_bar_algorithm_next_step_section"
                  style={{ marginTop: '8px' }}
                >
                  <IconButton
                    disabled={
                      currentEditorAction !== 'isPlaying' ||
                      !nextAlgorithmEntryExist
                    }
                    onClick={() => {
                      nextIteration()
                      firebase.analytics.logEvent('editor_play_next_step')
                    }}
                  >
                    <img
                      alt="go to next step icon"
                      src={NextStepIcon}
                      width="17"
                      height="17"
                      className={
                        currentEditorAction !== 'isPlaying' ||
                        !nextAlgorithmEntryExist
                          ? classes.iconDisabled
                          : undefined
                      }
                    />
                  </IconButton>
                </div>
              </Tooltip>

              <Tooltip title={t('app.editorbar.last_step')}>
                <div id="editor_bar_algorithm_last_step_section">
                  <IconButton
                    className={classes.button}
                    disabled={
                      currentEditorAction !== 'isPlaying' ||
                      !nextAlgorithmEntryExist
                    }
                    onClick={() => {
                      lastIteration()
                      firebase.analytics.logEvent('editor_play_last_step')
                    }}
                  >
                    <img
                      alt="go to last step icon"
                      src={LastStepIcon}
                      width="17"
                      height="17"
                      className={
                        currentEditorAction !== 'isPlaying' ||
                        !nextAlgorithmEntryExist
                          ? classes.iconDisabled
                          : undefined
                      }
                    />
                  </IconButton>
                </div>
              </Tooltip>
            </div>
          </Grid>
        </Toolbar>
      </AppBar>

      <InputDialog
        cancelDialogAction={togglePromptAutomataInputDialog}
        confirmDialogAction={startPlayingAutomata}
        confirmDialogVisible={promptAutomataInputDialogVisible}
        error={automataInputDialogError}
        errorText={t('algorithm.automata.errors.input_prohibit_symbols')}
        inputLabel={t('app.editorbar.input_string_label')}
        title={t('app.editorbar.input_string_title')}
        validateInput={inputIsInAlphabet}
      />
    </>
  )
}

export default compose(
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(EditorBar)

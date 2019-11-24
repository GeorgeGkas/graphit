/**
 * Import globals.
 */
import React from 'react'
import filter from 'lodash/fp/filter'
import find from 'lodash/fp/find'
import intersection from 'lodash/fp/intersection'
import map from 'lodash/fp/map'
import reduce from 'lodash/fp/reduce'
import uniq from 'lodash/fp/uniq'
import uniqBy from 'lodash/fp/uniqBy'
import values from 'lodash/fp/values'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

/**
 * Import UI framework modules.
 */
import blue from '@material-ui/core/colors/blue'
import AppBar from '@material-ui/core/AppBar'
import CategoryIcon from '@material-ui/icons/CategorySharp'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeftSharp'
import ChevronRightIcon from '@material-ui/icons/ChevronRightSharp'
import BrushIcon from '@material-ui/icons/BrushSharp'
import DeviceHubIcon from '@material-ui/icons/DeviceHubSharp'
import GridOffIcon from '@material-ui/icons/GridOffSharp'
import GridOnIcon from '@material-ui/icons/GridOnSharp'
import IconButton from '@material-ui/core/IconButton'
import PlayArrowIcon from '@material-ui/icons/PlayArrowSharp'
import RedoIcon from '@material-ui/icons/RedoSharp'
import SkipNextIcon from '@material-ui/icons/SkipNextSharp'
import SkipPreviousIcon from '@material-ui/icons/SkipPreviousSharp'
import StopIcon from '@material-ui/icons/StopSharp'
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip'
import UndoIcon from '@material-ui/icons/UndoSharp'
import ZoomInIcon from '@material-ui/icons/ZoomInSharp'
import ZoomOutIcon from '@material-ui/icons/ZoomOutSharp'
import { makeStyles } from '@material-ui/core/styles'

/**
 * Import Components.
 */
import InputDialog from '../../../../organisms/InputDialog'
import Notification from '../../../../organisms/Notification'

/**
 * Import ducks.
 */
import { operations as algorithmOperations } from '../../ducks/algorithm'
import { operations as editorOperations } from '../../ducks/editor'
import { operations as graphOperations } from '../../ducks/graph'
import { toast } from 'react-toastify'

/**
 * Construct component styles.
 */
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
}))

/**
 * Connect component to Redux.
 */
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

/**
 * Component.
 */
const EditorBar = ({
  currentEditorAction,
  cursor,
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

  const [
    promptAutomataInputDialogVisible,
    makePromptAutomataInputDialogVisible,
  ] = React.useState(false)
  const [
    automataInputDialogError,
    makeAutomataInputDialogError,
  ] = React.useState(false)

  const togglePromptAutomataInputDialog = () => {
    makePromptAutomataInputDialogVisible(!promptAutomataInputDialogVisible)
    makeAutomataInputDialogError(false)
  }

  const validAutomata = () => {
    const nodes = values(graph.nodes)

    if (filter(['properties.initial', true])(nodes).length !== 1) {
      toast.dismiss()
      toast(
        <Notification message="Automata should have exactly one starting state" />,
      )
      return false
    }

    if (!find(['properties.final', true])(nodes)) {
      toast.dismiss()
      toast(
        <Notification message="Automata should have at least one ending state" />,
      )
      return false
    }

    if (uniqBy('properties.name', nodes).length !== nodes.length) {
      toast.dismiss()
      toast(<Notification message="Duplicate state names are prohibited" />)
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
      input.includes('@') ||
        inputSymbols.length !==
          intersection(inputSymbols, automataSymbols).length,
    )
  }

  const startPlayingAutomata = input => {
    togglePromptAutomataInputDialog()
    startPlaying(input)
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
          <div
            className={classes.displayInherit}
            id="editor_bar_undo_redo_section"
          >
            <Tooltip title="Undo">
              <div>
                <IconButton
                  className={classes.button}
                  disabled={!pastExist || currentEditorAction === 'isPlaying'}
                  onClick={undoGraphHistory}
                >
                  <UndoIcon />
                </IconButton>
              </div>
            </Tooltip>

            <Tooltip title="Redo">
              <div>
                <IconButton
                  className={classes.button}
                  disabled={!futureExist || currentEditorAction === 'isPlaying'}
                  onClick={redoGraphHistory}
                >
                  <RedoIcon />
                </IconButton>
              </div>
            </Tooltip>
          </div>

          <div className={classes.displayInherit} id="editor_bar_zoom_section">
            <Tooltip title="Zoom in">
              <div>
                <IconButton className={classes.button} onClick={zoomIn}>
                  <ZoomInIcon />
                </IconButton>
              </div>
            </Tooltip>

            <Tooltip title="Zoom out">
              <div>
                <IconButton className={classes.button} onClick={zoomOut}>
                  <ZoomOutIcon />
                </IconButton>
              </div>
            </Tooltip>
          </div>

          <div className={classes.displayInherit} id="editor_bar_grid_section">
            <Tooltip title="Toggle grid">
              <div>
                <IconButton className={classes.button} onClick={toggleGrid}>
                  {gridVisible ? <GridOnIcon /> : <GridOffIcon />}
                </IconButton>
              </div>
            </Tooltip>
          </div>

          <div
            className={classes.displayInherit}
            id="editor_bar_editor_mode_section"
          >
            <Tooltip title="Select node">
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
                  }}
                >
                  <BrushIcon />
                </IconButton>
              </div>
            </Tooltip>

            <Tooltip title="Create nodes">
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
                  }}
                >
                  <CategoryIcon />
                </IconButton>
              </div>
            </Tooltip>

            <Tooltip title="Create edges">
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
                  }}
                >
                  <DeviceHubIcon />
                </IconButton>
              </div>
            </Tooltip>
          </div>

          <div
            className={classes.displayInherit}
            id="editor_bar_algorithm_section"
          >
            <Tooltip title="Play">
              <div id="editor_bar_algorithm_play_section">
                <IconButton
                  className={classes.button}
                  onClick={() => {
                    unselectAll()
                    currentEditorAction === 'isPlaying'
                      ? stopPlaying()
                      : graph.metadata.algorithm === 'Automata'
                      ? validateAutomata()
                      : startPlaying()
                  }}
                >
                  {currentEditorAction === 'isPlaying' ? (
                    <StopIcon />
                  ) : (
                    <PlayArrowIcon />
                  )}
                </IconButton>
              </div>
            </Tooltip>

            <Tooltip title="Go to first step">
              <div id="editor_bar_algorithm_first_step_section">
                <IconButton
                  className={classes.button}
                  disabled={
                    currentEditorAction !== 'isPlaying' ||
                    !previousAlgorithmEntryExist
                  }
                  onClick={() => firstIteration()}
                >
                  <SkipPreviousIcon />
                </IconButton>
              </div>
            </Tooltip>

            <Tooltip title="Previous step">
              <div id="editor_bar_algorithm_back_step_section">
                <IconButton
                  className={classes.button}
                  disabled={
                    currentEditorAction !== 'isPlaying' ||
                    !previousAlgorithmEntryExist
                  }
                  onClick={() => previousIteration()}
                >
                  <ChevronLeftIcon />
                </IconButton>
              </div>
            </Tooltip>

            <Tooltip title="Next step">
              <div
                id="editor_bar_algorithm_next_step_section"
                style={{ marginTop: '8px' }}
              >
                <IconButton
                  disabled={
                    currentEditorAction !== 'isPlaying' ||
                    !nextAlgorithmEntryExist
                  }
                  onClick={() => nextIteration()}
                >
                  <ChevronRightIcon />
                </IconButton>
              </div>
            </Tooltip>

            <Tooltip title="Go to last step">
              <div id="editor_bar_algorithm_last_step_section">
                <IconButton
                  className={classes.button}
                  disabled={
                    currentEditorAction !== 'isPlaying' ||
                    !nextAlgorithmEntryExist
                  }
                  onClick={() => lastIteration()}
                >
                  <SkipNextIcon />
                </IconButton>
              </div>
            </Tooltip>
          </div>
        </Toolbar>
      </AppBar>

      <InputDialog
        cancelDialogAction={togglePromptAutomataInputDialog}
        confirmDialogAction={startPlayingAutomata}
        confirmDialogVisible={promptAutomataInputDialogVisible}
        error={automataInputDialogError}
        errorText="Input string must contain only symbols from the alphabet"
        inputLabel="Input string"
        title="Automata input string"
        validateInput={inputIsInAlphabet}
      />
    </>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditorBar)

/**
 * Import globals.
 */
import React from 'react'
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
 * Import ducks.
 */
import { operations as algorithmOperations } from '../../ducks/algorithm'
import { operations as editorOperations } from '../../ducks/editor'
import { operations as graphOperations } from '../../ducks/graph'

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
    <React.Fragment>
      <AppBar className={classes.root} position="static">
        <Toolbar>
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

          <Tooltip title="Toggle grid">
            <div>
              <IconButton className={classes.button} onClick={toggleGrid}>
                {gridVisible ? <GridOnIcon /> : <GridOffIcon />}
              </IconButton>
            </div>
          </Tooltip>

          <Tooltip title="Select node">
            <div>
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
            <div>
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
            <div>
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

          <Tooltip title="Play">
            <div>
              <IconButton
                className={classes.button}
                onClick={() => {
                  unselectAll()
                  currentEditorAction === 'isPlaying'
                    ? stopPlaying()
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
            <div>
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
            <div>
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
            <div>
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
            <div>
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
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditorBar)

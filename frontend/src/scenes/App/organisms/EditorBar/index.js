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
import Divider from '@material-ui/core/Divider'
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
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

/**
 * Import ducks.
 */
import { operations as algorithmOperations } from './duck'
import { operations as editorOperations } from '../Editor/duck'
import { operations as profileOperations } from '../AppBar/duck'

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
  notificationContainer: {
    marginRight: 0,
    top: '135px',
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
  currentStageScale: state.editor.present.scaleStage,
  cursorPosition: state.editor.present.cursor,
  editorActionType: state.editor.present.editorActionType,
  futureExist: state.editor.future.length,
  isSignIn: state.user.isSignIn,
  nextAlgorithmEntryExist:
    state.algorithm.steps[state.algorithm.currentIndex + 1] !== undefined,
  pastExist: state.editor.past.length,
  previousAlgorithmEntryExist:
    state.algorithm.steps[state.algorithm.currentIndex - 1] !== undefined,
  selectedProjectId: state.user.selectedProjectId,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { ...algorithmOperations, ...editorOperations, ...profileOperations },
    dispatch,
  )

/**
 * Component.
 */
const EditorBar = ({
  changeEditorActionType,
  cursorPosition,
  currentStageScale,
  editorActionType,
  firstIteration,
  futureExist,
  grid,
  nextAlgorithmEntryExist,
  lastIteration,
  nextIteration,
  pastExist,
  previousAlgorithmEntryExist,
  previousIteration,
  redoEditorHistory,
  scaleStageBy,
  startPlaying,
  stopPlaying,
  toggleGrid,
  undoEditorHistory,
  updateStagePosition,
}) => {
  const classes = useStyles()

  const zoomOut = () => {
    const scaleBy = 1.1

    const mousePointTo = {
      x: cursorPosition.x / currentStageScale / currentStageScale,
      y: cursorPosition.y / currentStageScale / currentStageScale,
    }

    let newScale = currentStageScale / scaleBy

    scaleStageBy(newScale)

    const newPos = {
      x: -(mousePointTo.x / newScale) * newScale,
      y: -(mousePointTo.y / newScale) * newScale,
    }

    updateStagePosition(newPos)
  }

  const zoomIn = () => {
    const scaleBy = 1.1

    const mousePointTo = {
      x: cursorPosition.x / currentStageScale / currentStageScale,
      y: cursorPosition.y / currentStageScale / currentStageScale,
    }

    let newScale = currentStageScale * scaleBy

    scaleStageBy(newScale)

    const newPos = {
      x: -(mousePointTo.x / newScale) * newScale,
      y: -(mousePointTo.y / newScale) * newScale,
    }

    updateStagePosition(newPos)
  }

  return (
    <React.Fragment>
      <ToastContainer
        autoClose={4000}
        className={classes.notificationContainer}
        closeButton={false}
        closeOnClick
        draggable
        hideProgressBar
        pauseOnHover={false}
        position={toast.POSITION.TOP_RIGHT}
      />

      <AppBar className={classes.root} position="static">
        <Toolbar>
          <Tooltip title="Undo">
            <div>
              <IconButton
                className={classes.button}
                disabled={!pastExist || editorActionType === 'isPlaying'}
                onClick={undoEditorHistory}
              >
                <UndoIcon />
              </IconButton>
            </div>
          </Tooltip>

          <Tooltip title="Redo">
            <div>
              <IconButton
                className={classes.button}
                disabled={!futureExist || editorActionType === 'isPlaying'}
                onClick={redoEditorHistory}
              >
                <RedoIcon />
              </IconButton>
            </div>
          </Tooltip>

          <Divider orientation="vertical" />

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
                {grid ? <GridOnIcon /> : <GridOffIcon />}
              </IconButton>
            </div>
          </Tooltip>

          <Divider orientation="vertical" />

          <Tooltip title="Select mode">
            <div>
              <IconButton
                className={
                  editorActionType === 'select'
                    ? classes.buttonActive
                    : classes.button
                }
                disabled={editorActionType === 'isPlaying'}
                onClick={() => changeEditorActionType('select')}
              >
                <BrushIcon />
              </IconButton>
            </div>
          </Tooltip>

          <Tooltip title="Create nodes">
            <div>
              <IconButton
                className={
                  editorActionType === 'node'
                    ? classes.buttonActive
                    : classes.button
                }
                disabled={editorActionType === 'isPlaying'}
                onClick={() => changeEditorActionType('node')}
              >
                <DeviceHubIcon />
              </IconButton>
            </div>
          </Tooltip>

          <Tooltip title="Create edges">
            <div>
              <IconButton
                className={
                  editorActionType === 'edge'
                    ? classes.buttonActive
                    : classes.button
                }
                disabled={editorActionType === 'isPlaying'}
                onClick={() => changeEditorActionType('edge')}
              >
                <CategoryIcon />
              </IconButton>
            </div>
          </Tooltip>

          <Divider orientation="vertical" />

          <Tooltip title="Play">
            <div>
              <IconButton
                className={classes.button}
                onClick={() => {
                  editorActionType === 'isPlaying'
                    ? stopPlaying()
                    : startPlaying()
                }}
              >
                {editorActionType === 'isPlaying' ? (
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
                onClick={() => firstIteration()}
                disabled={
                  editorActionType !== 'isPlaying' ||
                  !previousAlgorithmEntryExist
                }
              >
                <SkipPreviousIcon />
              </IconButton>
            </div>
          </Tooltip>

          <Tooltip title="Previous step">
            <div>
              <IconButton
                className={classes.button}
                onClick={() => previousIteration()}
                disabled={
                  editorActionType !== 'isPlaying' ||
                  !previousAlgorithmEntryExist
                }
              >
                <ChevronLeftIcon />
              </IconButton>
            </div>
          </Tooltip>

          <Tooltip title="Next step">
            <div>
              <IconButton
                onClick={() => nextIteration()}
                disabled={
                  editorActionType !== 'isPlaying' || !nextAlgorithmEntryExist
                }
              >
                <ChevronRightIcon />
              </IconButton>
            </div>
          </Tooltip>

          <Tooltip title="Go to last step">
            <div>
              <IconButton
                className={classes.button}
                onClick={() => lastIteration()}
                disabled={
                  editorActionType !== 'isPlaying' || !nextAlgorithmEntryExist
                }
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

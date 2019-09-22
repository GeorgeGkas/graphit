import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { Wrapper } from './styles'
import IconButton from '@material-ui/core/IconButton'
import UndoIcon from '@material-ui/icons/UndoSharp'
import RedoIcon from '@material-ui/icons/RedoSharp'
import ZoomInIcon from '@material-ui/icons/ZoomInSharp'
import ZoomOutIcon from '@material-ui/icons/ZoomOutSharp'
import GridOnIcon from '@material-ui/icons/GridOnSharp'
import GridOffIcon from '@material-ui/icons/GridOffSharp'
import Divider from '@material-ui/core/Divider'
import BrushIcon from '@material-ui/icons/BrushSharp'
import DeviceHubIcon from '@material-ui/icons/DeviceHubSharp'
import CategoryIcon from '@material-ui/icons/CategorySharp'
import PlayArrowIcon from '@material-ui/icons/PlayArrowSharp'
import StopIcon from '@material-ui/icons/StopSharp'
import SkipPreviousIcon from '@material-ui/icons/SkipPreviousSharp'
import SkipNextIcon from '@material-ui/icons/SkipNextSharp'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeftSharp'
import ChevronRightIcon from '@material-ui/icons/ChevronRightSharp'
import blue from '@material-ui/core/colors/blue'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Tooltip from '@material-ui/core/Tooltip'
import zoomIn from './services/zoomIn'
import zoomOut from './services/zoomOut'

const useStyles = makeStyles(theme => ({
  root: {
    background: '#fff',
    display: 'flex',
  },
  button: {
    margin: theme.spacing(1),
  },
  buttonActive: {
    color: blue['500'],
    margin: theme.spacing(1),
  },
  notificationContainer: {
    top: '135px',
    marginRight: 0,
  },
}))

const Presentation = ({
  pastExist,
  futureExist,
  undoEditorHistory,
  redoEditorHistory,
  toggleGrid,
  grid,
  changeEditorActionType,
  editorActionType,
  currentStageScale,
  startPlaying,
  stopPlaying,
  nextIteration,
  lastIteration,
  firstIteration,
  previousIteration,
  nextAlgorithmEntryExist,
  previousAlgorithmEntryExist,
  cursorPosition,
  scaleStageBy,
  updateStagePosition,
}) => {
  const classes = useStyles()

  return (
    <Wrapper>
      <ToastContainer
        position={toast.POSITION.TOP_RIGHT}
        autoClose={4000}
        hideProgressBar={true}
        closeOnClick={true}
        pauseOnHover={false}
        draggable={true}
        closeButton={false}
        className={classes.notificationContainer}
      />

      <AppBar position="static" className={classes.root}>
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
              <IconButton
                className={classes.button}
                onClick={() =>
                  zoomIn({
                    currentStageScale,
                    cursorPosition,
                    scaleStageBy,
                    updateStagePosition,
                  })
                }
              >
                <ZoomInIcon />
              </IconButton>
            </div>
          </Tooltip>

          <Tooltip title="Zoom out">
            <div>
              <IconButton
                className={classes.button}
                onClick={() =>
                  zoomOut({
                    currentStageScale,
                    cursorPosition,
                    scaleStageBy,
                    updateStagePosition,
                  })
                }
              >
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
    </Wrapper>
  )
}

export default Presentation

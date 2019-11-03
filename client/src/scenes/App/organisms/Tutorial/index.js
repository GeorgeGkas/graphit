/**
 * Import globals.
 */
import React from 'react'
import ReactTour from 'reactour'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

/**
 * Import UI framework modules.
 */
import BrushIcon from '@material-ui/icons/BrushSharp'
import CategoryIcon from '@material-ui/icons/CategorySharp'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeftSharp'
import ChevronRightIcon from '@material-ui/icons/ChevronRightSharp'
import DeviceHubIcon from '@material-ui/icons/DeviceHubSharp'
import GridOnIcon from '@material-ui/icons/GridOnSharp'
import PlayArrowIcon from '@material-ui/icons/PlayArrowSharp'
import RedoIcon from '@material-ui/icons/RedoSharp'
import SkipNextIcon from '@material-ui/icons/SkipNextSharp'
import SkipPreviousIcon from '@material-ui/icons/SkipPreviousSharp'
import StopIcon from '@material-ui/icons/StopSharp'
import Typography from '@material-ui/core/Typography'
import UndoIcon from '@material-ui/icons/UndoSharp'
import ZoomInIcon from '@material-ui/icons/ZoomInSharp'
import ZoomOutIcon from '@material-ui/icons/ZoomOutSharp'

/**
 * Import ducks.
 */
import { operations as tutorialOperations } from '../../ducks/tutorial'

/**
 * React tour steps.
 */
const steps = [
  {
    content: (
      <>
        <Typography gutterBottom variant="body1">
          Welcome to
        </Typography>
        <Typography gutterBottom variant="h6">
          Dijkstra Visualizer
        </Typography>
        <Typography gutterBottom variant="body1">
          This tutorial will guide you through the various elements of the
          application.
        </Typography>
      </>
    ),
    selector: '#root',
  },
  {
    content: (
      <>
        <Typography gutterBottom variant="body1">
          <Typography gutterBottom variant="h6">
            Dijkstra Visualizer
          </Typography>
          is an interactive editor that allow students and educators create
          custom graphs and run Dijkstra's Shortest Path First algorithm on
          them.
        </Typography>
      </>
    ),
    selector: '#root',
  },
  {
    content: (
      <>
        <Typography gutterBottom variant="body1">
          This highlighted surface is your editor. You can combine nodes and
          edges to create graphs.
        </Typography>
      </>
    ),
    selector: '#interactive_editor',
  },
  {
    content: (
      <>
        <Typography gutterBottom variant="body1">
          The menu bar will be responsible for most of the interactions with the
          editor.
        </Typography>
      </>
    ),
    selector: '#editor_bar',
  },
  {
    content: (
      <>
        <Typography gutterBottom variant="body1">
          The <strong>undo</strong> <RedoIcon /> and <strong>redo</strong>{' '}
          <UndoIcon /> functionalities will manage any misconfigurations of your
          graphs.
        </Typography>
      </>
    ),
    selector: '#editor_bar_undo_redo_section',
  },
  {
    content: (
      <>
        <Typography gutterBottom variant="body1">
          In case the graph is too big or too small for your screen, you can
          change the editor size using the <strong>zoom in</strong>{' '}
          <ZoomInIcon /> and <strong>zoom out</strong> <ZoomOutIcon />{' '}
          functionalities.
        </Typography>
      </>
    ),
    selector: '#editor_bar_zoom_section',
  },
  {
    content: (
      <>
        <Typography gutterBottom variant="body1">
          Activating the <strong>grid</strong> <GridOnIcon /> allows you to snap
          graph nodes on top of it for increasing visual appearance.
        </Typography>
      </>
    ),
    selector: '#editor_bar_grid_section',
  },
  {
    content: (
      <>
        <Typography gutterBottom variant="body1">
          The various editor modes provide ways to manage node and edges.
        </Typography>
      </>
    ),
    selector: '#editor_bar_editor_mode_section',
  },
  {
    content: (
      <>
        <Typography gutterBottom variant="body1">
          Using the <strong>selector</strong> <BrushIcon /> mode you can
          reposition any node. When a node or edge is selected you can{' '}
          <strong>edit</strong> its properties or <strong>delete</strong> it
          from the editor.
        </Typography>
      </>
    ),
    position: 'bottom',
    selector: '#editor_bar_editor_select_mode_section',
  },
  {
    content: (
      <>
        <Typography gutterBottom variant="body1">
          Using the <strong>nodes</strong> <CategoryIcon /> mode you can create
          new nodes.
        </Typography>
      </>
    ),
    position: 'bottom',
    selector: '#editor_bar_editor_nodes_mode_section',
  },
  {
    content: (
      <>
        <Typography gutterBottom variant="body1">
          Using the <strong>edges</strong> <DeviceHubIcon /> mode you can create
          new edges.
        </Typography>
      </>
    ),
    position: 'bottom',
    selector: '#editor_bar_editor_edges_mode_section',
  },
  {
    content: (
      <>
        <Typography gutterBottom variant="body1">
          When you are done creating the graph, those actions will run the
          Dijkstra's algorithm step by step.
        </Typography>
      </>
    ),
    selector: '#editor_bar_algorithm_section',
  },
  {
    content: (
      <>
        <Typography gutterBottom variant="body1">
          Clicking the <strong>play</strong> <PlayArrowIcon /> action button,
          starts the editor into play mode. You cannot edit your graph while
          being on this mode. To exit this mode, click the <strong>stop</strong>{' '}
          <StopIcon /> button.
        </Typography>
      </>
    ),
    position: 'bottom',
    selector: '#editor_bar_algorithm_play_section',
  },
  {
    content: (
      <>
        <Typography gutterBottom variant="body1">
          The <strong>first step</strong> <SkipPreviousIcon /> action button,
          sets the algorithm to its initial state.
        </Typography>
      </>
    ),
    position: 'bottom',
    selector: '#editor_bar_algorithm_first_step_section',
  },
  {
    content: (
      <>
        <Typography gutterBottom variant="body1">
          The <strong>back step</strong> <ChevronLeftIcon /> action button, sets
          the algorithm to its previous step.
        </Typography>
      </>
    ),
    position: 'bottom',
    selector: '#editor_bar_algorithm_back_step_section',
  },
  {
    content: (
      <>
        <Typography gutterBottom variant="body1">
          The <strong>next step</strong> <ChevronRightIcon /> action button,
          sets the algorithm to its next step.
        </Typography>
      </>
    ),
    position: 'bottom',
    selector: '#editor_bar_algorithm_next_step_section',
  },
  {
    content: (
      <>
        <Typography gutterBottom variant="body1">
          The <strong>last step</strong> <SkipNextIcon /> action button, sets
          the algorithm to its final state.
        </Typography>
      </>
    ),
    position: 'bottom',
    selector: '#editor_bar_algorithm_last_step_section',
  },
  {
    content: (
      <>
        <Typography gutterBottom variant="body1">
          Under <strong>File</strong> menu you can find options to save and load
          your graphs locally.
        </Typography>
      </>
    ),
    selector: '#file_dropdown_menu',
  },
  {
    content: (
      <>
        <Typography gutterBottom variant="body1">
          By signing in you can save your projects to online storage for{' '}
          <strong>free</strong>!
        </Typography>
      </>
    ),
    selector: '#google_signin_button',
  },
  {
    content: (
      <>
        <Typography gutterBottom variant="body1">
          You can restart this tutorial any time by clicking the{' '}
          <Typography gutterBottom variant="button">
            {' '}
            <strong>HELP</strong>
          </Typography>{' '}
          button from the app bar.
        </Typography>
      </>
    ),
    selector: '#help_button',
  },
  {
    content: (
      <>
        <Typography gutterBottom variant="body1">
          <strong>Congratulations, you have completed the tutorial!</strong>
        </Typography>
        <Typography gutterBottom variant="body1">
          <em>
            Press the upper right{' '}
            <Typography gutterBottom variant="button">
              ✗
            </Typography>{' '}
            button to exit.
          </em>
        </Typography>
      </>
    ),
    selector: '#root',
  },
]

/**
 * Connect component to Redux.
 */
const mapStateToProps = state => ({
  isTourOpen: state.tutorial.visible,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(tutorialOperations, dispatch)

/**
 * Component.
 */
const Tutorial = ({ isTourOpen, setTutorialVisibility }) => {
  const closeTutorial = () => setTutorialVisibility(false)

  return (
    <ReactTour
      disableDotsNavigation
      disableInteraction
      isOpen={isTourOpen}
      showNavigation={false}
      startAt={0}
      steps={steps}
      onRequestClose={closeTutorial}
    />
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tutorial)

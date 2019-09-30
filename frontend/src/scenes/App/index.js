/**
 * Import globals.
 */
import React, { useState } from 'react'
import { connect } from 'react-redux'

/**
 * Import UI framework modules.
 */
import Slide from '@material-ui/core/Slide'

/**
 * Import components.
 */
import AppBar from './organisms/AppBar'
import Dashboard from './organisms/Dashboard'
import Dijkstra from './organisms/Dijkstra'
import Editor from './organisms/Editor'
import EditorBar from './organisms/EditorBar'
import Overlay from '../../atoms/Overlay'
import PropertiesEditor from './organisms/PropertiesEditor'
import { Fade } from '@material-ui/core'

/**
 * Import ducks.
 */
import { selectors as graphSelectors } from './organisms/Editor/ducks/graph'

/**
 * Connect component to Redux.
 */
const mapStateToProps = state => ({
  currentEditorAction: state.editor.currentEditorAction,
  selectedEdge: graphSelectors.getSelected(state.graph.present.edges),
  selectedNode: graphSelectors.getSelected(state.graph.present.nodes),
})

const mapDispatchToProps = null

/**
 * Component.
 */
const App = ({ currentEditorAction, selectedEdge, selectedNode }) => {
  const [gridVisible, makeGridVisible] = useState(false)
  const [dashboardVisible, makeDashboardVisible] = useState(false)

  const toggleGrid = () => makeGridVisible(!gridVisible)
  const toggleDashboard = () => makeDashboardVisible(!dashboardVisible)

  const shouldRenderPropertiesEditor =
    currentEditorAction === 'select' &&
    (Boolean(selectedEdge) ^ Boolean(selectedNode)) === 1
  const showAlgorithmPanel = currentEditorAction === 'isPlaying'

  return (
    <React.Fragment>
      <Fade mountOnEnter unmountOnExit in={dashboardVisible}>
        <div
          style={{
            height: '100%',
            position: 'absolute',
            width: '100%',
            zIndex: 9999,
          }}
        >
          <Dashboard toggleDashboard={toggleDashboard} />
          <Overlay />
        </div>
      </Fade>

      <Slide direction="left" in={showAlgorithmPanel}>
        <Dijkstra />
      </Slide>

      <div style={{ position: 'relative' }}>
        <AppBar toggleDashboard={toggleDashboard} />
        <EditorBar gridVisible={gridVisible} toggleGrid={toggleGrid} />
      </div>

      <Editor gridVisible={gridVisible} />

      {shouldRenderPropertiesEditor ? <PropertiesEditor /> : null}
    </React.Fragment>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)

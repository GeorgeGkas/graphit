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
import Dijkstra from './organisms/Dijkstra'
import Editor from './organisms/Editor'
import EditorBar from './organisms/EditorBar'
import PropertiesEditor from './organisms/PropertiesEditor'

/**
 * Import ducks.
 */
import { selectors as graphSelectors } from './ducks/graph'

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

  const toggleGrid = () => makeGridVisible(!gridVisible)

  const shouldRenderPropertiesEditor =
    currentEditorAction === 'select' &&
    (Boolean(selectedEdge) ^ Boolean(selectedNode)) === 1
  const showAlgorithmPanel = currentEditorAction === 'isPlaying'

  return (
    <React.Fragment>
      <div style={{ position: 'relative' }}>
        <AppBar />
        <EditorBar gridVisible={gridVisible} toggleGrid={toggleGrid} />
      </div>

      <Editor gridVisible={gridVisible} />

      <Slide direction="left" in={showAlgorithmPanel}>
        <Dijkstra />
      </Slide>

      {shouldRenderPropertiesEditor ? <PropertiesEditor /> : null}
    </React.Fragment>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)

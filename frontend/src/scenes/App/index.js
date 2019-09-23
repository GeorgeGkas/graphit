/**
 * Import globals.
 */
import React, { useState } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

/**
 * Import UI framework modules.
 */
import Slide from '@material-ui/core/Slide'

/**
 * Import ducks.
 */
import { operations as editorOperations } from './organisms/Editor/duck'

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

/**
 * Connect component to Redux.
 */
const mapStateToProps = state => ({
  editorActionType: state.editor.present.editorActionType,
  isMultiSelect: state.editor.isMultiSelect,
  selectedEdges: state.editor.present.selectedArrow,
  selectedNodes: state.editor.present.selectedNode,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(editorOperations, dispatch)

/**
 * Component.
 */
const App = ({
  editorActionType,
  isMultiSelect,
  selectedEdges,
  selectedNodes,
}) => {
  const [grid, makeGridVisible] = useState(false)
  const [dashboard, makeDashboardVisible] = useState(false)

  const toggleGrid = () => makeGridVisible(!grid)
  const toggleDashboard = () => makeDashboardVisible(!dashboard)

  const shouldRenderPropertiesEditor =
    editorActionType === 'select' &&
    !isMultiSelect &&
    (selectedEdges.length ^ selectedNodes.length) === 1

  const showAlgorithmPanel = editorActionType === 'isPlaying'

  return (
    <React.Fragment>
      {dashboard ? (
        <React.Fragment>
          <Dashboard toggleDashboard={toggleDashboard} />
          <Overlay />
        </React.Fragment>
      ) : null}

      <Slide direction="left" in={showAlgorithmPanel}>
        <Dijkstra />
      </Slide>

      <div style={{ position: 'relative' }}>
        <AppBar toggleDashboard={toggleDashboard} />
        <EditorBar grid={grid} toggleGrid={toggleGrid} />
      </div>

      <Editor grid={grid} />

      {shouldRenderPropertiesEditor ? <PropertiesEditor /> : null}
    </React.Fragment>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)

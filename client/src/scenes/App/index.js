/**
 * Import globals.
 */
import React, { useState, useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

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
import Notification from '../../organisms/Notification'
import PropertiesEditor from './organisms/PropertiesEditor'

/**
 * Import ducks.
 */
import { selectors as graphSelectors } from './ducks/graph'
import { operations as projectsOperations } from '../../ducks/projects'
import { toast } from 'react-toastify'

/**
 * Connect component to Redux.
 */
const mapStateToProps = state => ({
  currentEditorAction: state.editor.currentEditorAction,
  selectedEdge: graphSelectors.getSelected(state.graph.present.edges),
  selectedNode: graphSelectors.getSelected(state.graph.present.nodes),
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(projectsOperations, dispatch)

/**
 * Component.
 */
const App = ({
  currentEditorAction,
  getProjectById,
  selectedEdge,
  selectedNode,
}) => {
  const [gridVisible, makeGridVisible] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    ;(async () => {
      if (id) {
        toast.dismiss()
        toast(<Notification message="Fetching project..." />)
        await getProjectById(id)
      }
    })()
  }, [])

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

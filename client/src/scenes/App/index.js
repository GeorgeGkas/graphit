/**
 * Import globals.
 */
import Cookies from 'js-cookie'
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { useParams, useRouteMatch } from 'react-router-dom'

/**
 * Import UI framework modules.
 */
import Slide from '@material-ui/core/Slide'

/**
 * Import components.
 */
import AppBar from './organisms/AppBar'
import CreateModal from './organisms/CreateModal'
import Dijkstra from './organisms/Dijkstra'
import Editor from './organisms/Editor'
import EditorBar from './organisms/EditorBar'
import Notification from '../../organisms/Notification'
import PropertiesEditor from './organisms/PropertiesEditor'
import Tutorial from './organisms/Tutorial'

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
  isNewEditor: state.graph.present.metadata.algorithm === '',
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
  isNewEditor,
  selectedEdge,
  selectedNode,
}) => {
  const [gridVisible, makeGridVisible] = React.useState(false)
  const { path } = useRouteMatch()
  const { id } = useParams()

  React.useEffect(() => {
    ;(async () => {
      Cookies.set('new_user', '1')
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

  const [openCreateModal, setCreateModalOpen] = React.useState(
    path === '/app' && isNewEditor,
  )

  const handleCreateModalOpen = () => setCreateModalOpen(true)
  const handleCreateModalClose = () => {
    setCreateModalOpen(false)
  }

  return (
    <>
      <div style={{ position: 'relative' }}>
        <AppBar handleCreateModalOpen={handleCreateModalOpen} />
        <EditorBar gridVisible={gridVisible} toggleGrid={toggleGrid} />
      </div>

      <Editor gridVisible={gridVisible} />

      <Slide direction="left" in={showAlgorithmPanel}>
        <Dijkstra />
      </Slide>

      {shouldRenderPropertiesEditor ? <PropertiesEditor /> : null}

      <Tutorial />

      <CreateModal
        handleClose={handleCreateModalClose}
        open={openCreateModal}
      />
    </>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)

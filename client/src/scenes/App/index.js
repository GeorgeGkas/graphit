import React from 'react'
import { connect } from 'react-redux'
import { useHistory, useRouteMatch } from 'react-router-dom'

import { selectors as graphSelectors } from './ducks/graph'
import AppBar from './organisms/AppBar'
import CreateModal from './organisms/CreateModal'
import Editor from './organisms/Editor'
import EditorBar from './organisms/EditorBar'
import PropertiesEditor from './organisms/PropertiesEditor'
import Tutorial from './organisms/Tutorial'

const mapStateToProps = state => ({
  currentEditorAction: state.editor.currentEditorAction,
  isNewEditor: state.graph.present.metadata.algorithm === '',
  selectedEdge: graphSelectors.getSelected(state.graph.present.edges),
  selectedNode: graphSelectors.getSelected(state.graph.present.nodes),
})

const mapDispatchToProps = null

const App = ({
  currentEditorAction,
  isNewEditor,
  selectedEdge,
  selectedNode,
}) => {
  const { path } = useRouteMatch()
  const history = useHistory()

  /**
   * If user wants to load a project by using its URL and
   * project does not exist, redirect him to 404 Page.
   */
  if (path === '/app/:id' && isNewEditor) {
    history.push('/404')
  }

  const [gridVisible, makeGridVisible] = React.useState(false)

  const toggleGrid = () => makeGridVisible(!gridVisible)

  const shouldRenderPropertiesEditor =
    currentEditorAction === 'select' &&
    (Boolean(selectedEdge) ^ Boolean(selectedNode)) === 1

  const [openCreateModal, setCreateModalOpen] = React.useState(
    (path === '/app' || path === '/app/:id') && isNewEditor,
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

/**
 * Globals
 */
import React, { useState } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

/**
 * UI Framework
 */
import Slide from '@material-ui/core/Slide'

/**
 * Ducks
 */
import { operations as editorOperations } from './organisms/Editor/duck'

/**
 * Components
 */
import Editor from './organisms/Editor'
import Dijkstra from './organisms/Dijkstra'
import Overlay from '../../atoms/Overlay'
import Dashboard from './organisms/Dashboard'
import AppBar from './organisms/AppBar'
import EditorBar from './organisms/EditorBar'
import PropertiesEditor from './organisms/PropertiesEditor'

const mapStateToProps = state => ({
  selectedNode: state.editor.present.selectedNode,
  selectedArrow: state.editor.present.selectedArrow,
  editorActionType: state.editor.present.editorActionType,
  isMultiSelect: state.editor.isMultiSelect,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(editorOperations, dispatch)

const Mechanism = ({
  isMultiSelect,
  selectedNode,
  editorActionType,
  selectedArrow,
}) => {
  const [grid, makeGridVisible] = useState(false)
  const [dashboard, makeDashboardVisible] = useState(false)

  const toggleGrid = () => makeGridVisible(!grid)
  const toggleDashboard = () => makeDashboardVisible(!dashboard)
  const shouldRenderPropertiesEditor =
    editorActionType === 'select' &&
    !isMultiSelect &&
    (selectedArrow.length ^ selectedNode.length) === 1
  const showAlgorithmPanel = editorActionType === 'isPlaying'

  return (
    <React.Fragment>
      {dashboard ? (
        <React.Fragment>
          <Dashboard toggleDashboard={toggleDashboard} />
          <Overlay />
        </React.Fragment>
      ) : null}

      <div style={{ position: 'relative' }}>
        <AppBar toggleDashboard={toggleDashboard} />
        <EditorBar toggleGrid={toggleGrid} grid={grid} />
      </div>

      <Editor grid={grid} />

      {shouldRenderPropertiesEditor ? <PropertiesEditor /> : null}

      <Slide
        direction="left"
        in={showAlgorithmPanel}
        mountOnEnter
        unmountOnExit
      >
        <Dijkstra />
      </Slide>
    </React.Fragment>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Mechanism)

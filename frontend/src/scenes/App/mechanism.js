import React, { useState } from 'react'
import Presentation from './presentation'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { operations as editorOperations } from './organisms/Editor/duck'

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

  return (
    <Presentation
      grid={grid}
      toggleGrid={toggleGrid}
      isMultiSelect={isMultiSelect}
      selectedNode={selectedNode}
      editorActionType={editorActionType}
      selectedArrow={selectedArrow}
      dashboard={dashboard}
      toggleDashboard={toggleDashboard}
    />
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Mechanism)

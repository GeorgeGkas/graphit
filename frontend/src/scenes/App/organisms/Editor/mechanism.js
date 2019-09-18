import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { operations } from '../Editor/duck'
import Presentation from './presentation'

const mapStateToProps = state => ({
  nodes: state.editor.present.nodes,
  selectedNodeId: state.editor.present.selectedNode,
  cursor: state.editor.present.cursor,
  isDrawingTempArrow: state.editor.present.drawTempArrow,
  stage: state.editor.present.stage,
  connectedNodes: state.editor.present.connected,
  selectedArrowId: state.editor.present.selectedArrow,
  isMultiSelect: state.editor.present.isMultiSelect,
  scaleStage: state.editor.present.scaleStage,
  editorActionType: state.editor.present.editorActionType,
  algorithm_current_step: state.algorithm.steps[state.algorithm.currentIndex],
  algorithm_is_final_step: state.algorithm.isFinal,
  initialNode: state.editor.present.initialNode,
})

const mapDispatchToProps = dispatch => bindActionCreators(operations, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Presentation)

import { connect } from 'react-redux'
import Presentation from './presentation'

const mapStateToProps = state => ({
  selectedNode:
    state.editor.present.nodes[state.editor.present.selectedNode[0]],
  selectedArrow:
    state.editor.present.connected[state.editor.present.selectedArrow[0]],
  arrows: state.editor.present.connected,
  scale: state.editor.present.scaleStage,
})

const mapDispatchToProps = null

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Presentation)

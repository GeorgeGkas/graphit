import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Presentation from './presentation'
import { operations as editorOperations } from '../../organisms/Editor/duck'

const mapStateToProps = state => ({
  selectedNode:
    state.editor.present.nodes[state.editor.present.selectedNode[0]],
  selectedArrow:
    state.editor.present.connected[state.editor.present.selectedArrow[0]],
  allSelectedNodes: state.editor.present.selectedNode,
  allSelectedArrows: state.editor.present.selectedArrow,
  arrows: state.editor.present.connected,
  scale: state.editor.present.scaleStage,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...editorOperations }, dispatch)

@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class Mechanism extends React.Component {
  constructor(props) {
    super(props)

    this.deleteShapes = this.deleteShapes.bind(this)
  }

  deleteShapes() {
    this.props.deleteShape()

    for (const node of this.props.allSelectedNodes) {
      this.props.deleteNode(node)
    }
    for (const arrow of this.props.allSelectedArrows) {
      this.props.deleteArrow(arrow)
    }
  }

  render() {
    return <Presentation {...this.props} deleteShapes={this.deleteShapes} />
  }
}

export default Mechanism

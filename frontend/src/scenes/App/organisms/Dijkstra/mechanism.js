import React from 'react'
import { connect } from 'react-redux'
import Presentation from './presentation'

const mapStateToProps = state => ({
  distances: state.algorithm.steps[state.algorithm.currentIndex].distances,
  selected: state.algorithm.steps[state.algorithm.currentIndex].selected_nodes,
  highlighted:
    state.algorithm.steps[state.algorithm.currentIndex].highlighted_nodes,
  nodes: state.editor.present.nodes,
  isFinal: state.algorithm.isFinal,
  unvisited: state.algorithm.steps[state.algorithm.currentIndex].unvisited,
})

const mapDispatchToProps = null

@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class Mechanism extends React.Component {
  render() {
    const { forwardedRef, ...props } = this.props
    return <Presentation {...props} ref={forwardedRef} />
  }
}

export default React.forwardRef((props, ref) => (
  <Mechanism {...props} forwardedRef={ref} />
))

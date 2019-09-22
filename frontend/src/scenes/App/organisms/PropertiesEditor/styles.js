import styled from 'styled-components'
import buildEdge from '../Editor/organisms/EdgeNotLoop/services/buildEdge'

const getEdgeCenter = props => {
  let secondExist = props.edges.some(
    arr =>
      arr.from.id === props.selectedEdge.to.id &&
      arr.to.id === props.selectedEdge.from.id,
  )

  let points = buildEdge({
    edge: props.selectedEdge,
    secondExist,
    nodeRadius: 25,
    curvePower: 20,
  })

  return {
    x: points[2],
    y: points[3],
  }
}

export const Wrapper = styled.div`
  position: absolute;
  top: ${props => {
    if (props.selectedNode) {
      return Number(props.selectedNode.y * props.currentStageScale + 85)
    } else {
      return Number(getEdgeCenter(props).y * props.currentStageScale + 85)
    }
  }}px;
  left: ${props => {
    if (props.selectedNode) {
      return Number(props.selectedNode.x * props.currentStageScale + 40)
    } else {
      return Number(getEdgeCenter(props).x * props.currentStageScale + 30)
    }
  }}px;
`

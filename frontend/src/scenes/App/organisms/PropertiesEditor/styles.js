import styled from 'styled-components'

const getEdgeCenter = props => {
  let secondExist = props.edges.some(
    arr =>
      arr.from.id === props.selectedEdge.to.id &&
      arr.to.id === props.selectedEdge.from.id,
  )

  const dx = props.selectedEdge.to.x - props.selectedEdge.from.x
  const dy = props.selectedEdge.to.y - props.selectedEdge.from.y
  let angle = Math.atan2(-dy, dx)

  const radius = 25
  const curvePower = 20

  const arrowStart = {
    x:
      props.selectedEdge.from.x +
      -radius * Math.cos(angle + Math.PI) +
      (secondExist ? 5 * Math.cos(angle + Math.PI / 2) : 0),
    y:
      props.selectedEdge.from.y +
      radius * Math.sin(angle + Math.PI) +
      (secondExist ? 5 * Math.sin(angle - Math.PI / 2) : 0),
  }

  const arrowEnd = {
    x:
      props.selectedEdge.to.x +
      -radius * Math.cos(angle) +
      (secondExist ? 5 * Math.cos(angle + Math.PI / 2) : 0),
    y:
      props.selectedEdge.to.y +
      radius * Math.sin(angle) +
      (secondExist ? 5 * Math.sin(angle - Math.PI / 2) : 0),
  }

  const arrowCenter = {
    x:
      (arrowStart.x + arrowEnd.x) / 2 +
      (secondExist ? curvePower * Math.cos(angle + Math.PI / 2) : 0),
    y:
      (arrowStart.y + arrowEnd.y) / 2 +
      (secondExist ? curvePower * Math.sin(angle - Math.PI / 2) : 0),
  }

  return arrowCenter
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

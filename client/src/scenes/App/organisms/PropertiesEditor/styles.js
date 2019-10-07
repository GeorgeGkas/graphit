import styled from 'styled-components'
import buildEdge from '../Editor/organisms/EdgeNotLoop/services/buildEdge'
import { selectors as graphSelectors } from '../../organisms/Editor/ducks/graph'

const getEdgeCenter = ({ edges, selectedResolvedEdge }) => {
  let points = buildEdge({
    curvePower: 20,
    isDoubleEdge: graphSelectors.isDoubleEdge(selectedResolvedEdge, edges),
    nodeRadius: 25,
    resolvedEdge: selectedResolvedEdge,
  })

  return {
    x: points[2],
    y: points[3],
  }
}

export const Wrapper = styled.div`
  position: absolute;
  top: ${({ currentStageScale, edges, selectedNode, selectedResolvedEdge }) => {
    if (selectedNode) {
      return Number(selectedNode.ui.pos.y * currentStageScale + 85)
    } else if (selectedResolvedEdge) {
      return Number(
        getEdgeCenter({
          edges,
          selectedResolvedEdge,
        }).y *
          currentStageScale +
          85,
      )
    } else {
      /**
       * Should not be reached!
       */
      throw new Error('Properties editor wrapper cannot read selected shape.')
    }
  }}px;
  left: ${({
    currentStageScale,
    edges,
    selectedNode,
    selectedResolvedEdge,
  }) => {
    if (selectedNode) {
      return Number(selectedNode.ui.pos.x * currentStageScale + 40)
    } else if (selectedResolvedEdge) {
      return Number(
        getEdgeCenter({
          edges,
          selectedResolvedEdge,
        }).x *
          currentStageScale +
          30,
      )
    } else {
      /**
       * Should not be reached!
       */
      throw new Error('Properties editor wrapper cannot read selected shape.')
    }
  }}px;
`

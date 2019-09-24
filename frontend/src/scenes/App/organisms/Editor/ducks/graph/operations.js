import uuid from 'uuid'
import * as actions from './actions'

const {
  createEdge: createEdgeAction,
  createNode: createNodeAction,
  deleteEdge,
  deleteNode,
  selectEdge,
  selectNode,
  unselectEdge,
  unselectNode,
  updateEdgeProperties,
  updateNodePosition,
  updateNodeProperties,
} = actions

const createNode = (
  pos = { x: 35, y: 35 },
  { grid } = { grid: false },
) => dispatch => {
  /**
   * If grid is visible, snap the new node to grid,
   * else create the node where the cursor is.
   */
  const actualPos = grid
    ? {
        x: Math.round(pos.x / 35) * 35,
        y: Math.round(pos.y / 35) * 35,
      }
    : pos

  dispatch(
    createNodeAction({
      id: uuid.v4(),
      properties: {
        initial: false,
        name: 's',
      },
      ui: {
        pos: actualPos,
        selected: false,
      },
    }),
  )
}

const createEdge = (fromNodeId, toNodeId) => (dispatch, getState) => {
  const edgeExist = Object.values(getState().graph.present.edges).some(
    edge =>
      edge.ui.connects.from === fromNodeId && edge.ui.connects.to === toNodeId,
  )

  if (edgeExist) {
    return
  }

  dispatch(
    createEdgeAction({
      id: uuid.v4(),
      properties: {
        weight: 0,
      },
      ui: {
        connects: {
          from: fromNodeId,
          to: toNodeId,
        },
        selected: false,
      },
    }),
  )
}

export {
  createEdge,
  createNode,
  deleteEdge,
  deleteNode,
  selectEdge,
  selectNode,
  unselectEdge,
  unselectNode,
  updateEdgeProperties,
  updateNodePosition,
  updateNodeProperties,
}

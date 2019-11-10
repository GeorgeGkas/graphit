import forEach from 'lodash/fp/forEach'
import uuid from 'uuid'
import filter from 'lodash/fp/filter'
import values from 'lodash/fp/values'
import * as actions from './actions'
import * as selectors from './selectors'

const {
  createEdge: createEdgeAction,
  createNode: createNodeAction,
  deleteEdge,
  deleteNode: deleteNodeAction,
  initGraphHistory,
  loadGraph: loadGraphAction,
  redoGraphHistory,
  selectEdge,
  selectNode,
  undoGraphHistory,
  unselectEdge,
  unselectNode,
  updateEdgeProperties,
  updateMetadata,
  updateNodePositionEnd,
  updateNodePositionStart,
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

  const node = {
    id: uuid.v4(),
    properties: {
      final: false,
      initial: false,
      name: 's',
    },
    ui: {
      pos: actualPos,
      selected: false,
    },
  }

  dispatch(createNodeAction(node))
}

const deleteNode = nodeId => (dispatch, getState) => {
  const edges = values(getState().graph.present.edges)
  const filterConnectedEdges = filter(
    edge => edge.ui.connects.from === nodeId || edge.ui.connects.to === nodeId,
  )
  forEach(edge => dispatch(deleteEdge(edge.id)))(filterConnectedEdges(edges))
  dispatch(deleteNodeAction(nodeId))
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

const loadGraph = graph => dispatch => {
  dispatch(initGraphHistory())
  dispatch(loadGraphAction(graph))
}

const unselectAll = () => (dispatch, getState) => {
  const selectedNode = selectors.getSelected(getState().graph.present.nodes)
  const selectedEdge = selectors.getSelected(getState().graph.present.edges)

  if (selectedNode) {
    dispatch(unselectNode(selectedNode.id))
  }

  if (selectedEdge) {
    dispatch(unselectEdge(selectedEdge.id))
  }
}

export {
  createEdge,
  createNode,
  deleteEdge,
  deleteNode,
  initGraphHistory,
  loadGraph,
  redoGraphHistory,
  selectEdge,
  selectNode,
  undoGraphHistory,
  unselectEdge,
  unselectNode,
  updateEdgeProperties,
  updateMetadata,
  updateNodePositionEnd,
  updateNodePositionStart,
  updateNodeProperties,
  unselectAll,
}

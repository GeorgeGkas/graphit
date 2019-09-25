import * as types from './types'

const createNode = payload => ({
  payload,
  type: types.CREATE_NODE,
})

const deleteNode = id => ({
  payload: id,
  type: types.DELETE_NODE,
})

const selectNode = id => ({
  payload: id,
  type: types.SELECT_NODE,
})

const unselectNode = id => ({
  payload: id,
  type: types.UNSELECT_NODE,
})

const updateNodePosition = (id, pos) => ({
  payload: {
    id,
    pos,
  },
  type: types.UPDATE_NODE_POSITION,
})

const updateNodeProperties = (id, properties) => ({
  payload: {
    id,
    properties,
  },
  type: types.UPDATE_NODE_PROPERTIES,
})

const createEdge = payload => ({
  payload,
  type: types.CREATE_EDGE,
})

const deleteEdge = id => ({
  payload: id,
  type: types.DELETE_EDGE,
})

const selectEdge = id => ({
  payload: id,
  type: types.SELECT_EDGE,
})

const unselectEdge = id => ({
  payload: id,
  type: types.UNSELECT_EDGE,
})

const updateEdgeProperties = (id, properties) => ({
  payload: {
    id,
    properties,
  },
  type: types.UPDATE_EDGE_PROPERTIES,
})

const loadGraph = graph => ({
  payload: graph,
  type: types.LOAD_GRAPH,
})

const undoGraphHistory = () => ({
  type: types.UNDO_GRAPH_HISTORY,
})

const redoGraphHistory = () => ({
  type: types.REDO_GRAPH_HISTORY,
})

const initGraphHistory = () => ({
  type: types.INIT_GRAPH_HISTORY,
})

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
  updateNodePosition,
  updateNodeProperties,
}

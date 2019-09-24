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

export {
  createEdge,
  createNode,
  deleteEdge,
  deleteNode,
  loadGraph,
  selectEdge,
  selectNode,
  unselectEdge,
  unselectNode,
  updateEdgeProperties,
  updateNodePosition,
  updateNodeProperties,
}

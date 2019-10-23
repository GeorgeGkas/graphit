/**
 * Test Redux action creators.
 * In tests where we have to specify a payload,  use an empty payload structure,
 * cause we only have to test if the action was invoked with the correct type.
 */

import * as actions from '../actions'
import * as types from '../types'

test('load graph', () => {
  const payload = {}
  const expectedAction = {
    payload,
    type: types.LOAD_GRAPH,
  }

  expect(actions.loadGraph(payload)).toEqual(expectedAction)
})

test('create a node', () => {
  const payload = {}
  const expectedAction = {
    payload,
    type: types.CREATE_NODE,
  }

  expect(actions.createNode(payload)).toEqual(expectedAction)
})

test('delete a node', () => {
  const payload = {}
  const expectedAction = {
    payload,
    type: types.DELETE_NODE,
  }

  expect(actions.deleteNode(payload)).toEqual(expectedAction)
})

test('select a node', () => {
  const payload = {}
  const expectedAction = {
    payload,
    type: types.SELECT_NODE,
  }

  expect(actions.selectNode(payload)).toEqual(expectedAction)
})

test('unselect a node', () => {
  const payload = {}
  const expectedAction = {
    payload,
    type: types.UNSELECT_NODE,
  }

  expect(actions.unselectNode(payload)).toEqual(expectedAction)
})

test('update node position - start tracking', () => {
  const id = 'test'
  const pos = {}
  const expectedAction = {
    payload: {
      id,
      pos,
    },
    type: types.UPDATE_NODE_POSITION_START,
  }

  expect(actions.updateNodePositionStart(id, pos)).toEqual(expectedAction)
})

test('update node position - end tracking', () => {
  const id = 'test'
  const pos = {}
  const expectedAction = {
    payload: {
      id,
      pos,
    },
    type: types.UPDATE_NODE_POSITION_END,
  }

  expect(actions.updateNodePositionEnd(id, pos)).toEqual(expectedAction)
})

test('update node properties', () => {
  const id = 'test'
  const properties = {}
  const expectedAction = {
    payload: {
      id,
      properties,
    },
    type: types.UPDATE_NODE_PROPERTIES,
  }

  expect(actions.updateNodeProperties(id, properties)).toEqual(expectedAction)
})

test('create an edge', () => {
  const payload = {}
  const expectedAction = {
    payload,
    type: types.CREATE_EDGE,
  }

  expect(actions.createEdge(payload)).toEqual(expectedAction)
})

test('delete an edge', () => {
  const payload = {}
  const expectedAction = {
    payload,
    type: types.DELETE_EDGE,
  }

  expect(actions.deleteEdge(payload)).toEqual(expectedAction)
})

test('select an edge', () => {
  const payload = {}
  const expectedAction = {
    payload,
    type: types.SELECT_EDGE,
  }

  expect(actions.selectEdge(payload)).toEqual(expectedAction)
})

test('unselect an edge', () => {
  const payload = {}
  const expectedAction = {
    payload,
    type: types.UNSELECT_EDGE,
  }

  expect(actions.unselectEdge(payload)).toEqual(expectedAction)
})

test('update edge properties', () => {
  const id = 'test'
  const properties = {}
  const expectedAction = {
    payload: {
      id,
      properties,
    },
    type: types.UPDATE_EDGE_PROPERTIES,
  }

  expect(actions.updateEdgeProperties(id, properties)).toEqual(expectedAction)
})

test('init graph history', () => {
  const payload = {}
  const expectedAction = {
    type: types.INIT_GRAPH_HISTORY,
  }

  expect(actions.initGraphHistory(payload)).toEqual(expectedAction)
})

test('undo graph history', () => {
  const payload = {}
  const expectedAction = {
    type: types.UNDO_GRAPH_HISTORY,
  }

  expect(actions.undoGraphHistory(payload)).toEqual(expectedAction)
})

test('redo graph history', () => {
  const payload = {}
  const expectedAction = {
    type: types.REDO_GRAPH_HISTORY,
  }

  expect(actions.redoGraphHistory(payload)).toEqual(expectedAction)
})

test('update graph metadata', () => {
  const meta = {
    name: 'hello project',
  }
  const expectedAction = {
    payload: meta,
    type: types.UPDATE_METADATA,
  }

  expect(actions.updateMetadata(meta)).toEqual(expectedAction)
})

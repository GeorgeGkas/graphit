/**
 * Test only operations that use thunk middleware.
 */

import uuid from 'uuid'
import * as types from '../types'
import * as operations from '../operations'

jest.mock('uuid')
uuid.v4.mockImplementation(() => 'UUID')

beforeEach(() => {
  uuid.v4.mockClear()
})

test('create node with default props', () => {
  const dispatch = jest.fn()
  const getState = jest.fn()
  operations.createNode()(dispatch, getState)

  expect(dispatch.mock.calls.length).toBe(1)
  expect(uuid.v4.mock.calls.length).toBe(1)
  expect(dispatch.mock.calls[0]).toEqual([
    {
      payload: {
        id: 'UUID',
        properties: {
          initial: false,
          name: 's',
        },
        ui: {
          pos: {
            x: 35,
            y: 35,
          },
          selected: false,
        },
      },
      type: types.CREATE_NODE,
    },
  ])
})

test('create node in request position when grid is disabled', () => {
  const dispatch = jest.fn()
  const getState = jest.fn()
  const expectedPos = {
    x: 23,
    y: 23,
  }

  operations.createNode(expectedPos)(dispatch, getState)

  expect(dispatch.mock.calls.length).toBe(1)
  expect(uuid.v4.mock.calls.length).toBe(1)
  expect(dispatch.mock.calls[0]).toEqual([
    {
      payload: {
        id: 'UUID',
        properties: {
          initial: false,
          name: 's',
        },
        ui: {
          pos: expectedPos,
          selected: false,
        },
      },
      type: types.CREATE_NODE,
    },
  ])
})

test('create node in on top of grid when using default position', () => {
  const dispatch = jest.fn()
  const getState = jest.fn()

  operations.createNode(undefined, { grid: true })(dispatch, getState)

  expect(dispatch.mock.calls.length).toBe(1)
  expect(uuid.v4.mock.calls.length).toBe(1)
  expect(dispatch.mock.calls[0]).toEqual([
    {
      payload: {
        id: 'UUID',
        properties: {
          initial: false,
          name: 's',
        },
        ui: {
          pos: {
            x: 35,
            y: 35,
          },
          selected: false,
        },
      },
      type: types.CREATE_NODE,
    },
  ])
})

test('create node on top of grid when using custom position', () => {
  const dispatch = jest.fn()
  const getState = jest.fn()
  const expectedPos = {
    x: 34,
    y: 34,
  }
  const actualPos = {
    x: 35,
    y: 35,
  }

  operations.createNode(expectedPos, { grid: true })(dispatch, getState)

  expect(dispatch.mock.calls.length).toBe(1)
  expect(uuid.v4.mock.calls.length).toBe(1)
  expect(dispatch.mock.calls[0]).toEqual([
    {
      payload: {
        id: 'UUID',
        properties: {
          initial: false,
          name: 's',
        },
        ui: {
          pos: actualPos,
          selected: false,
        },
      },
      type: types.CREATE_NODE,
    },
  ])
})

test('create edge if not exist', () => {
  const dispatch = jest.fn()
  const getState = jest.fn().mockImplementation(() => ({
    graph: {
      present: {
        edges: {
          edge1: {
            id: 'edge1',
            properties: {
              weight: 0,
            },
            ui: {
              connects: {
                from: 'a',
                to: 'a',
              },
              selected: false,
            },
          },
          edge2: {
            id: 'edge2',
            properties: {
              weight: 0,
            },
            ui: {
              connects: {
                from: 'b',
                to: 'b',
              },
              selected: false,
            },
          },
        },
      },
    },
  }))
  const fromNodeId = 'edge1'
  const toNodeId = 'edge2'

  operations.createEdge(fromNodeId, toNodeId)(dispatch, getState)

  expect(dispatch.mock.calls.length).toBe(1)
  expect(uuid.v4.mock.calls.length).toBe(1)
  expect(dispatch.mock.calls[0]).toEqual([
    {
      payload: {
        id: 'UUID',
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
      },
      type: types.CREATE_EDGE,
    },
  ])
})

test('do not create edge if exist', () => {
  const dispatch = jest.fn()
  const getState = jest.fn().mockImplementation(() => ({
    graph: {
      present: {
        edges: {
          edge1: {
            id: 'edge1',
            properties: {
              weight: 0,
            },
            ui: {
              connects: {
                from: 'a',
                to: 'a',
              },
              selected: false,
            },
          },
          edge2: {
            id: 'edge2',
            properties: {
              weight: 0,
            },
            ui: {
              connects: {
                from: 'b',
                to: 'b',
              },
              selected: false,
            },
          },
        },
      },
    },
  }))
  const fromNodeId = 'a'
  const toNodeId = 'a'

  operations.createEdge(fromNodeId, toNodeId)(dispatch, getState)

  expect(dispatch.mock.calls.length).toBe(0)
  expect(uuid.v4.mock.calls.length).toBe(0)
})

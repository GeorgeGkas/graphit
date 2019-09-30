import reducer, { initialState } from '../reducer'
import * as types from '../types'

const node = {
  id: 'node',
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
}

const edge = {
  id: 'edge',
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
}

test('return initial state', () => {
  expect(initialState).toEqual({
    edges: {},
    nodes: {},
  })
  expect(reducer(undefined, {})).toEqual(initialState)
})

test('return initial state on history actions', () => {
  expect(
    reducer(initialState, {
      type: types.INIT_GRAPH_HISTORY,
    }),
  ).toEqual(initialState)

  expect(
    reducer(initialState, {
      type: types.REDO_GRAPH_HISTORY,
    }),
  ).toEqual(initialState)

  expect(
    reducer(initialState, {
      type: types.UNDO_GRAPH_HISTORY,
    }),
  ).toEqual(initialState)
})

test('load graph', () => {
  const initialReducerState = { ...initialState }
  const afterLoadingGraph = reducer(initialReducerState, {
    payload: {
      edges: {
        edge,
      },
      nodes: {
        node,
      },
    },
    type: types.LOAD_GRAPH,
  })

  expect(initialReducerState).toEqual(initialState)
  expect(afterLoadingGraph).toEqual({
    edges: {
      edge,
    },
    nodes: {
      node,
    },
  })
})

test('handle create node', () => {
  const initialReducerState = { ...initialState }
  const afterInsertingNode = reducer(initialReducerState, {
    payload: node,
    type: types.CREATE_NODE,
  })

  expect(initialReducerState).toEqual(initialState)
  expect(afterInsertingNode).toEqual({
    edges: {},
    nodes: {
      node,
    },
  })
})

test('handle delete node', () => {
  const initialReducerState = {
    edges: {},
    nodes: {
      node,
    },
  }
  const afterDeletingNode = reducer(initialReducerState, {
    payload: 'node',
    type: types.DELETE_NODE,
  })

  expect(initialReducerState).toEqual({
    edges: {},
    nodes: {
      node,
    },
  })
  expect(afterDeletingNode).toEqual(initialState)
})

test('handle select node', () => {
  const initialReducerState = {
    edges: {},
    nodes: {
      node,
    },
  }
  const afterSelectingNode = reducer(initialReducerState, {
    payload: 'node',
    type: types.SELECT_NODE,
  })

  expect(initialReducerState).toEqual({
    edges: {},
    nodes: {
      node,
    },
  })
  expect(afterSelectingNode).toEqual({
    edges: {},
    nodes: {
      node: {
        ...node,
        ui: {
          ...node.ui,
          selected: true,
        },
      },
    },
  })
})

test('handle unselect node', () => {
  const initialReducerState = {
    edges: {},
    nodes: {
      node: {
        ...node,
        ui: {
          ...node.ui,
          selected: true,
        },
      },
    },
  }
  const afterUnselectingNode = reducer(initialReducerState, {
    payload: 'node',
    type: types.UNSELECT_NODE,
  })

  expect(initialReducerState).toEqual({
    edges: {},
    nodes: {
      node: {
        ...node,
        ui: {
          ...node.ui,
          selected: true,
        },
      },
    },
  })
  expect(afterUnselectingNode).toEqual({
    edges: {},
    nodes: {
      node,
    },
  })
})

test('handle update node position - start tracking', () => {
  const initialReducerState = {
    edges: {},
    nodes: {
      node,
    },
  }
  const afterUpdatingNodePositionStart = reducer(initialReducerState, {
    payload: {
      id: 'node',
      pos: {
        x: 100,
        y: 100,
      },
    },
    type: types.UPDATE_NODE_POSITION_START,
  })

  expect(initialReducerState).toEqual({
    edges: {},
    nodes: {
      node,
    },
  })
  expect(afterUpdatingNodePositionStart).toEqual({
    edges: {},
    nodes: {
      node: {
        ...node,
        ui: {
          ...node.ui,
          pos: {
            x: 100,
            y: 100,
          },
        },
      },
    },
  })
})

test('handle update node position - end tracking', () => {
  const initialReducerState = {
    edges: {},
    nodes: {
      node,
    },
  }
  const afterUpdatingNodePositionEnd = reducer(initialReducerState, {
    payload: {
      id: 'node',
      pos: {
        x: 100,
        y: 100,
      },
    },
    type: types.UPDATE_NODE_POSITION_END,
  })

  expect(initialReducerState).toEqual({
    edges: {},
    nodes: {
      node,
    },
  })
  expect(afterUpdatingNodePositionEnd).toEqual({
    edges: {},
    nodes: {
      node: {
        ...node,
        ui: {
          ...node.ui,
          pos: {
            x: 100,
            y: 100,
          },
        },
      },
    },
  })
})

test('handle update node initial', () => {
  const initialReducerState = {
    edges: {},
    nodes: {
      node,
    },
  }
  const afterUpdatingNodeInitial = reducer(initialReducerState, {
    payload: {
      id: 'node',
      properties: {
        initial: true,
      },
    },
    type: types.UPDATE_NODE_PROPERTIES,
  })

  expect(initialReducerState).toEqual({
    edges: {},
    nodes: {
      node,
    },
  })
  expect(afterUpdatingNodeInitial).toEqual({
    edges: {},
    nodes: {
      node: {
        ...node,
        properties: {
          ...node.properties,
          initial: true,
        },
      },
    },
  })
})

test('handle update node name', () => {
  const initialReducerState = {
    edges: {},
    nodes: {
      node,
    },
  }
  const afterUpdatingNodeInitial = reducer(initialReducerState, {
    payload: {
      id: 'node',
      properties: {
        name: 'a',
      },
    },
    type: types.UPDATE_NODE_PROPERTIES,
  })

  expect(initialReducerState).toEqual({
    edges: {},
    nodes: {
      node,
    },
  })
  expect(afterUpdatingNodeInitial).toEqual({
    edges: {},
    nodes: {
      node: {
        ...node,
        properties: {
          ...node.properties,
          name: 'a',
        },
      },
    },
  })
})

test('handle update node initial and name', () => {
  const initialReducerState = {
    edges: {},
    nodes: {
      node,
    },
  }
  const afterUpdatingNodeInitial = reducer(initialReducerState, {
    payload: {
      id: 'node',
      properties: {
        initial: true,
        name: 'a',
      },
    },
    type: types.UPDATE_NODE_PROPERTIES,
  })

  expect(initialReducerState).toEqual({
    edges: {},
    nodes: {
      node,
    },
  })
  expect(afterUpdatingNodeInitial).toEqual({
    edges: {},
    nodes: {
      node: {
        ...node,
        properties: {
          initial: true,
          name: 'a',
        },
      },
    },
  })
})

test('handle update node  with empty properties param', () => {
  const initialReducerState = {
    edges: {},
    nodes: {
      node,
    },
  }
  const afterUpdatingNodeInitial = reducer(initialReducerState, {
    payload: {
      id: 'node',
      properties: {},
    },
    type: types.UPDATE_NODE_PROPERTIES,
  })

  expect(initialReducerState).toEqual({
    edges: {},
    nodes: {
      node,
    },
  })
  expect(afterUpdatingNodeInitial).toEqual({
    edges: {},
    nodes: {
      node,
    },
  })
})

test('handle create edge', () => {
  const initialReducerState = { ...initialState }
  const afterInsertingEdge = reducer(initialReducerState, {
    payload: edge,
    type: types.CREATE_EDGE,
  })

  expect(initialReducerState).toEqual(initialState)
  expect(afterInsertingEdge).toEqual({
    edges: {
      edge,
    },
    nodes: {},
  })
})

test('handle delete edge', () => {
  const initialReducerState = {
    edges: {
      edge,
    },
    nodes: {},
  }
  const afterDeletingEdge = reducer(initialReducerState, {
    payload: 'edge',
    type: types.DELETE_EDGE,
  })

  expect(initialReducerState).toEqual({
    edges: {
      edge,
    },
    nodes: {},
  })
  expect(afterDeletingEdge).toEqual(initialState)
})

test('handle select edge', () => {
  const initialReducerState = {
    edges: {
      edge,
    },
    nodes: {},
  }
  const afterSelectingEdge = reducer(initialReducerState, {
    payload: 'edge',
    type: types.SELECT_EDGE,
  })

  expect(initialReducerState).toEqual({
    edges: {
      edge,
    },
    nodes: {},
  })
  expect(afterSelectingEdge).toEqual({
    edges: {
      edge: {
        ...edge,
        ui: {
          ...edge.ui,
          selected: true,
        },
      },
    },
    nodes: {},
  })
})

test('handle unselect edge', () => {
  const initialReducerState = {
    edges: {
      edge: {
        ...edge,
        ui: {
          ...edge.ui,
          selected: true,
        },
      },
    },
    nodes: {},
  }
  const afterUnselectingEdge = reducer(initialReducerState, {
    payload: 'edge',
    type: types.UNSELECT_EDGE,
  })

  expect(initialReducerState).toEqual({
    edges: {
      edge: {
        ...edge,
        ui: {
          ...edge.ui,
          selected: true,
        },
      },
    },
    nodes: {},
  })
  expect(afterUnselectingEdge).toEqual({
    edges: {
      edge,
    },
    nodes: {},
  })
})

test('handle update edge weight', () => {
  const initialReducerState = {
    edges: {
      edge,
    },
    nodes: {},
  }
  const afterUpdatingEdgeWeight = reducer(initialReducerState, {
    payload: {
      id: 'edge',
      properties: {
        weight: 7,
      },
    },
    type: types.UPDATE_EDGE_PROPERTIES,
  })

  expect(initialReducerState).toEqual({
    edges: {
      edge,
    },
    nodes: {},
  })
  expect(afterUpdatingEdgeWeight).toEqual({
    edges: {
      edge: {
        ...edge,
        properties: {
          ...edge.properties,
          weight: 7,
        },
      },
    },
    nodes: {},
  })
})

test('handle update edge  with empty properties param', () => {
  const initialReducerState = {
    edges: {
      edge,
    },
    nodes: {},
  }
  const afterUpdatingEdgeEmpty = reducer(initialReducerState, {
    payload: {
      id: 'edge',
      properties: {},
    },
    type: types.UPDATE_EDGE_PROPERTIES,
  })

  expect(initialReducerState).toEqual({
    edges: {
      edge,
    },
    nodes: {},
  })
  expect(afterUpdatingEdgeEmpty).toEqual({
    edges: {
      edge,
    },
    nodes: {},
  })
})

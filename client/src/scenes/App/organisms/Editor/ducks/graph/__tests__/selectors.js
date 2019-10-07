import * as selectors from '../selectors'

const node1 = {
  id: 'node1',
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

const node2 = {
  id: 'node2',
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

const node3 = {
  id: 'node3',
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

const node4 = {
  id: 'node4',
  properties: {
    initial: false,
    name: 's',
  },
  ui: {
    pos: {
      x: 35,
      y: 35,
    },
    selected: true,
  },
}

const edge1 = {
  id: 'edge1',
  properties: {
    weight: 0,
  },
  ui: {
    connects: {
      from: 'node1',
      to: 'node2',
    },
    selected: true,
  },
}

const edge2 = {
  id: 'edge2',
  properties: {
    weight: 0,
  },
  ui: {
    connects: {
      from: 'node2',
      to: 'node1',
    },
    selected: true,
  },
}

const edge3 = {
  id: 'edge3',
  properties: {
    weight: 0,
  },
  ui: {
    connects: {
      from: 'node3',
      to: 'node1',
    },
    selected: true,
  },
}

test('get selected shape from graph - no selected shape exist', () => {
  const nodes = {
    node1,
    node2,
    node3,
  }

  expect(selectors.getSelected(nodes)).toEqual(undefined)
})

test('get selected shape from graph - selected shape exist', () => {
  const nodes = {
    node1,
    node2,
    node3,
    node4,
  }

  expect(selectors.getSelected(nodes)).toEqual(node4)
})

test('resolved edge path - requested edge does not exist', () => {
  const nodes = {
    node1,
    node2,
    node3,
    node4,
  }

  expect(selectors.resolveEdgePath(null, nodes)).toBe(null)
  expect(selectors.resolveEdgePath(undefined, nodes)).toBe(undefined)
})

test('resolved edge path - requested edge does exist', () => {
  const nodes = {
    node1,
    node2,
    node3,
    node4,
  }

  expect(selectors.resolveEdgePath(edge3, nodes)).toEqual({
    id: 'edge3',
    properties: {
      weight: 0,
    },
    ui: {
      connects: {
        from: node3,
        to: node1,
      },
      selected: true,
    },
  })
})

test('is not double edge', () => {
  const edges = {
    edge1,
    edge2,
    edge3,
  }

  const nodes = {
    node1,
    node2,
    node3,
    node4,
  }

  const resolvedEdge = selectors.resolveEdgePath(edge3, nodes)

  expect(selectors.isDoubleEdge(resolvedEdge, edges)).toBe(false)
})

test('is double edge', () => {
  const edges = {
    edge1,
    edge2,
    edge3,
  }

  const nodes = {
    node1,
    node2,
    node3,
    node4,
  }

  const resolvedEdge1 = selectors.resolveEdgePath(edge1, nodes)
  expect(selectors.isDoubleEdge(resolvedEdge1, edges)).toBe(true)

  const resolvedEdge2 = selectors.resolveEdgePath(edge2, nodes)
  expect(selectors.isDoubleEdge(resolvedEdge2, edges)).toBe(true)
})

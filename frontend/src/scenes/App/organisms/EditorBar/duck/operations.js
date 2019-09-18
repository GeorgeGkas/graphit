import { toast } from 'react-toastify'
import * as actions from './actions'
import { operations as editorOperations } from '../../Editor/duck'

const {
  startPlaying: startPlayingAction,
  stopPlaying: stopPlayingAction,
  nextIteration: nextIterationAction,
  lastIteration: lastIterationAction,
  firstIteration: firstIterationAction,
  previousIteration: previousIterationAction,
} = actions

function dijkstra(nodes, edges, start) {
  const Q = new Set()
  const dist = new Map()
  const prev = new Map()
  const steps = []

  for (const node of Object.values(nodes)) {
    dist.set(node.name, Infinity)
    prev.set(node.name, null)
    Q.add(node.name)
  }

  dist.set(nodes[start].name, 0)

  steps.push({
    selected_nodes: [],
    selected_edges: [],
    highlighted_nodes: [],
    highlighted_edges: [],
    distances: [...dist.entries()].reduce(
      (obj, [node, distance]) => ({ ...obj, [node]: distance }),
      {},
    ),
    unvisited: Object.values(nodes)
      .map(node => node.name)
      .reduce((obj, name) => ({ ...obj, [name]: Q.has(name) }), {}),
  })

  while (Q.size) {
    let highlighted_nodes = []
    let highlighted_edges = []
    const u = [...dist.entries()]
      .filter(([node]) => Q.has(node))
      .sort(([, n1], [, n2]) => n2 - n1)
      .pop()[0]
    Q.delete(u)

    const u_neighbors = Object.values(edges)
      .filter(
        edge =>
          edge.from.id ===
          Object.values(nodes)
            .filter(node => node.name === u)
            .pop().id,
      )
      .map(edge => nodes[edge.to.id])

    highlighted_nodes.push(
      ...u_neighbors.filter(node => node.name !== u).map(node => node.id),
    )

    for (const neighbor of u_neighbors.map(node => node.name)) {
      const edge = Object.values(edges)
        .filter(
          edge =>
            edge.from.id ===
              Object.values(nodes)
                .filter(node => node.name === u)
                .pop().id &&
            edge.to.id ===
              Object.values(nodes)
                .filter(node => node.name === neighbor)
                .pop().id,
        )
        .pop()
      highlighted_edges.push(edge.id)
      const alt = dist.get(u) + Number(edge.weight)

      if (alt < dist.get(neighbor)) {
        dist.set(neighbor, alt)
        prev.set(neighbor, u)
      }
    }

    steps.push({
      selected_nodes: [
        Object.values(nodes)
          .filter(node => node.name === u)
          .pop().id,
      ],
      selected_edges: [],
      highlighted_nodes: [],
      highlighted_edges: [],
      distances: steps[steps.length - 1].distances,
      unvisited: Object.values(nodes)
        .map(node => node.name)
        .reduce((obj, name) => ({ ...obj, [name]: Q.has(name) }), {}),
    })

    steps.push({
      selected_nodes: [
        Object.values(nodes)
          .filter(node => node.name === u)
          .pop().id,
      ],
      selected_edges: [],
      highlighted_nodes,
      highlighted_edges,
      distances: [...dist.entries()].reduce(
        (obj, [node, distance]) => ({ ...obj, [node]: distance }),
        {},
      ),
      unvisited: Object.values(nodes)
        .map(node => node.name)
        .reduce((obj, name) => ({ ...obj, [name]: Q.has(name) }), {}),
    })
  }

  steps.push({
    selected_nodes: Object.values(nodes).map(node => node.id),
    selected_edges: [...prev.entries()]
      .filter(([, from_name]) => from_name !== null)
      .map(
        ([to_name, from_name]) =>
          Object.values(edges)
            .filter(
              edge =>
                edge.from.id ===
                  Object.values(nodes)
                    .filter(node => node.name === from_name)
                    .pop().id &&
                edge.to.id ===
                  Object.values(nodes)
                    .filter(node => node.name === to_name)
                    .pop().id,
            )
            .pop().id,
      ),
    highlighted_nodes: [],
    highlighted_edges: [],
    distances: [...dist.entries()].reduce(
      (obj, [node, distance]) => ({ ...obj, [node]: distance }),
      {},
    ),
    unvisited: Object.values(nodes)
      .map(node => node.name)
      .reduce((obj, name) => ({ ...obj, [name]: Q.has(name) }), {}),
  })

  return {
    dist,
    steps,
  }
}

const startPlaying = () => (dispatch, getState) => {
  if (
    Object.values(getState().editor.present.nodes)
      .map(node => node.name)
      .filter((name, index, names) => names.indexOf(name) !== index).length !==
    0
  ) {
    toast.error('Duplicate node names are prohibited')
    return
  }

  if (!getState().editor.present.initialNode) {
    toast.error('Please specify initial node')
    return
  }

  dispatch(editorOperations.changeEditorActionType('isPlaying'))

  const { steps } = dijkstra(
    getState().editor.present.nodes,
    getState().editor.present.connected,
    getState().editor.present.initialNode,
  )
  dispatch(
    startPlayingAction({
      steps,
    }),
  )
}

const stopPlaying = () => dispatch => {
  dispatch(stopPlayingAction())
  dispatch(editorOperations.changeEditorActionType('select'))
}

const nextIteration = () => dispatch => {
  dispatch(nextIterationAction())
}

const lastIteration = () => dispatch => {
  dispatch(lastIterationAction())
}

const firstIteration = () => dispatch => {
  dispatch(firstIterationAction())
}

const previousIteration = () => dispatch => {
  dispatch(previousIterationAction())
}

export {
  startPlaying,
  stopPlaying,
  nextIteration,
  lastIteration,
  firstIteration,
  previousIteration,
}

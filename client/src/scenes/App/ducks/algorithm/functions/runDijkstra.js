import concat from 'lodash/fp/concat'
import find from 'lodash/fp/find'
import filter from 'lodash/fp/filter'
import map from 'lodash/fp/map'
import matchesProperty from 'lodash/fp/matchesProperty'
import minBy from 'lodash/fp/minBy'
import reduce from 'lodash/fp/reduce'
import uniq from 'lodash/fp/uniq'
import uniqBy from 'lodash/fp/uniqBy'
import values from 'lodash/fp/values'
import resolveGraph from './resolveGraph'

export default function dijkstra(graph) {
  /**
   * Get the initial node.
   */
  const initials = filter(matchesProperty('properties.initial', true))(
    graph.nodes,
  )
  if (!initials.length) {
    throw new Error('Please set an initial node')
  } else if (initials.length > 1) {
    throw new Error('Please select only one initial node')
  }

  const initial = initials.pop()

  /**
   * Get the sub-graph (in case of a graph forest),
   * that has root the initial node.
   */
  const resolvedGraph = resolveGraph(graph, initial)
  const nodes = values(resolvedGraph.nodes)
  if (uniqBy('properties.name', nodes).length !== nodes.length) {
    throw new Error('Duplicate node names are prohibited')
  }

  /**
   * Run Dijkstra's algorithm in resolved graph.
   */
  const dijkstraResults = run(resolvedGraph, initial)

  return dijkstraResults
}

function run(graph, initial) {
  const steps = []
  const Q = new Set()
  const dist = new Map()
  const prev = new Map()

  for (const node of values(graph.nodes)) {
    dist.set(node.id, Infinity)
    prev.set(node.id, null)
    Q.add(node.id)
  }

  dist.set(initial.id, 0)

  steps.push({
    highlighted_edges: [],
    highlighted_nodes: [],
    selected_edges: [],
    selected_nodes: [],
    unvisited: reduce((obj, id) => ({ ...obj, [id]: Q.has(id) }))({})(
      map('id')(values(graph.nodes)),
    ),
  })

  while (Q.size) {
    const u = minBy(id => dist.get(id), Array.from(Q))

    Q.delete(u)

    const outerEdges = filter(matchesProperty('ui.connects.from', u))(
      values(graph.edges),
    )
    const neighbors = map(edge => graph.nodes[edge.ui.connects.to])(outerEdges)

    steps.push({
      highlighted_edges: [],
      highlighted_nodes: [],
      selected_edges: [],
      selected_nodes: [u],
      unvisited: reduce((obj, id) => ({ ...obj, [id]: Q.has(id) }))({})(
        map('id')(values(graph.nodes)),
      ),
    })

    if (outerEdges.length) {
      steps.push({
        highlighted_edges: map('id')(outerEdges),
        highlighted_nodes: map('id')(neighbors),
        selected_edges: [],
        selected_nodes: [u],
        unvisited: reduce((obj, id) => ({ ...obj, [id]: Q.has(id) }))({})(
          map('id')(values(graph.nodes)),
        ),
      })
    }

    for (const v of neighbors) {
      const edge = find(
        edge => edge.ui.connects.from === u && edge.ui.connects.to === v.id,
      )(outerEdges)

      const alt = dist.get(u) + edge.properties.weight

      if (alt < dist.get(v.id)) {
        dist.set(v.id, alt)
        prev.set(v.id, u)
      }
    }
  }

  steps.push({
    highlighted_edges: [],
    highlighted_nodes: [],
    selected_edges: reduce((arr, [current, previous]) => {
      const edgeId = find(
        edge =>
          edge.ui.connects.from === previous && edge.ui.connects.to === current,
      )(graph.edges)

      if (!edgeId) {
        return arr
      }

      return [...arr, edgeId.id]
    })([])([...prev.entries()]),
    selected_nodes: uniq(
      concat(
        map('ui.connects.from')(graph.edges),
        map('ui.connects.to')(graph.edges),
      ),
    ),
    unvisited: reduce((obj, id) => ({ ...obj, [id]: Q.has(id) }))({})(
      map('id')(values(graph.nodes)),
    ),
  })

  return steps
}

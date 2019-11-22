import includes from 'lodash/fp/includes'
import keys from 'lodash/fp/keys'
import filter from 'lodash/fp/filter'
import map from 'lodash/fp/map'
import matchesProperty from 'lodash/fp/matchesProperty'
import reduce from 'lodash/fp/reduce'
import values from 'lodash/fp/values'

/**
 * Run DFS algorithm on a graph forest and retrieve the sub graph
 * that has initial as root.
 */
export default function resolveGraph(graph, initial) {
  const S = []
  const resolvedGraph = {
    edges: {},
    nodes: {},
  }

  S.push(initial)

  while (S.length) {
    const v = S.pop()

    if (!includes(v.id, keys(resolvedGraph.nodes))) {
      resolvedGraph.nodes[v.id] = v

      const outerEdges = reduce((edges, edge) => ({
        ...edges,
        [edge.id]: edge,
      }))({})(
        filter(matchesProperty('ui.connects.from', v.id))(values(graph.edges)),
      )

      const neighbors = map(edge => graph.nodes[edge.ui.connects.to])(
        outerEdges,
      )

      resolvedGraph.edges = { ...resolvedGraph.edges, ...outerEdges }

      for (const w of neighbors) {
        S.push(w)
      }
    }
  }

  return resolvedGraph
}

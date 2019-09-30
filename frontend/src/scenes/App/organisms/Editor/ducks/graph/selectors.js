import find from 'lodash/fp/find'
import get from 'lodash/fp/get'
import matchesProperty from 'lodash/fp/matchesProperty'
import set from 'lodash/fp/set'
import values from 'lodash/fp/values'

const getSelected = shapes =>
  find(matchesProperty('ui.selected', true))(values(shapes))

const resolveEdgePath = (edge, nodes) => {
  if (!edge) {
    return edge
  }

  const edgeFrom = get(edge.ui.connects.from, nodes)
  const edgeTo = get(edge.ui.connects.to, nodes)

  const withResolvedFrom = set('ui.connects.from', edgeFrom, edge)
  const withResolvedTo = set('ui.connects.to', edgeTo, withResolvedFrom)

  return withResolvedTo
}

const isDoubleEdge = (resolvedEdge, edges) =>
  values(edges).some(
    arrow =>
      arrow.ui.connects.from === resolvedEdge.ui.connects.to.id &&
      arrow.ui.connects.to === resolvedEdge.ui.connects.from.id,
  )

export { getSelected, isDoubleEdge, resolveEdgePath }

export default function buildEdge({
  curvePower,
  isDoubleEdge,
  nodeRadius,
  resolvedEdge,
}) {
  const dx =
    resolvedEdge.ui.connects.to.ui.pos.x -
    resolvedEdge.ui.connects.from.ui.pos.x
  const dy =
    resolvedEdge.ui.connects.to.ui.pos.y -
    resolvedEdge.ui.connects.from.ui.pos.y
  let angle = Math.atan2(-dy, dx)

  const edgeStart = {
    x:
      resolvedEdge.ui.connects.from.ui.pos.x +
      -nodeRadius * Math.cos(angle + Math.PI) +
      (isDoubleEdge ? 5 * Math.cos(angle + Math.PI / 2) : 0),
    y:
      resolvedEdge.ui.connects.from.ui.pos.y +
      nodeRadius * Math.sin(angle + Math.PI) +
      (isDoubleEdge ? 5 * Math.sin(angle - Math.PI / 2) : 0),
  }

  const edgeEnd = {
    x:
      resolvedEdge.ui.connects.to.ui.pos.x +
      -nodeRadius * Math.cos(angle) +
      (isDoubleEdge ? 5 * Math.cos(angle + Math.PI / 2) : 0),
    y:
      resolvedEdge.ui.connects.to.ui.pos.y +
      nodeRadius * Math.sin(angle) +
      (isDoubleEdge ? 5 * Math.sin(angle - Math.PI / 2) : 0),
  }

  const edgeCenter = {
    x:
      (edgeStart.x + edgeEnd.x) / 2 +
      (isDoubleEdge ? curvePower * Math.cos(angle + Math.PI / 2) : 0),
    y:
      (edgeStart.y + edgeEnd.y) / 2 +
      (isDoubleEdge ? curvePower * Math.sin(angle - Math.PI / 2) : 0),
  }

  let points = [
    edgeStart.x,
    edgeStart.y,
    edgeCenter.x,
    edgeCenter.y,
    edgeEnd.x,
    edgeEnd.y,
  ]

  return points
}

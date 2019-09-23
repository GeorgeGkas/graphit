export default function buildEdge({
  curvePower,
  edge,
  nodeRadius,
  secondExist,
}) {
  const dx = edge.to.x - edge.from.x
  const dy = edge.to.y - edge.from.y
  let angle = Math.atan2(-dy, dx)

  const edgeStart = {
    x:
      edge.from.x +
      -nodeRadius * Math.cos(angle + Math.PI) +
      (secondExist ? 5 * Math.cos(angle + Math.PI / 2) : 0),
    y:
      edge.from.y +
      nodeRadius * Math.sin(angle + Math.PI) +
      (secondExist ? 5 * Math.sin(angle - Math.PI / 2) : 0),
  }

  const edgeEnd = {
    x:
      edge.to.x +
      -nodeRadius * Math.cos(angle) +
      (secondExist ? 5 * Math.cos(angle + Math.PI / 2) : 0),
    y:
      edge.to.y +
      nodeRadius * Math.sin(angle) +
      (secondExist ? 5 * Math.sin(angle - Math.PI / 2) : 0),
  }

  const edgeCenter = {
    x:
      (edgeStart.x + edgeEnd.x) / 2 +
      (secondExist ? curvePower * Math.cos(angle + Math.PI / 2) : 0),
    y:
      (edgeStart.y + edgeEnd.y) / 2 +
      (secondExist ? curvePower * Math.sin(angle - Math.PI / 2) : 0),
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

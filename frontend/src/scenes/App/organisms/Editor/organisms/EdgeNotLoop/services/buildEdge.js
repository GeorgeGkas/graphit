export default function buildEdge({
  arrow,
  nodeRadius,
  secondExist,
  curvePower,
}) {
  const dx = arrow.to.x - arrow.from.x
  const dy = arrow.to.y - arrow.from.y
  let angle = Math.atan2(-dy, dx)

  const arrowStart = {
    x:
      arrow.from.x +
      -nodeRadius * Math.cos(angle + Math.PI) +
      (secondExist ? 5 * Math.cos(angle + Math.PI / 2) : 0),
    y:
      arrow.from.y +
      nodeRadius * Math.sin(angle + Math.PI) +
      (secondExist ? 5 * Math.sin(angle - Math.PI / 2) : 0),
  }

  const arrowEnd = {
    x:
      arrow.to.x +
      -nodeRadius * Math.cos(angle) +
      (secondExist ? 5 * Math.cos(angle + Math.PI / 2) : 0),
    y:
      arrow.to.y +
      nodeRadius * Math.sin(angle) +
      (secondExist ? 5 * Math.sin(angle - Math.PI / 2) : 0),
  }

  const arrowCenter = {
    x:
      (arrowStart.x + arrowEnd.x) / 2 +
      (secondExist ? curvePower * Math.cos(angle + Math.PI / 2) : 0),
    y:
      (arrowStart.y + arrowEnd.y) / 2 +
      (secondExist ? curvePower * Math.sin(angle - Math.PI / 2) : 0),
  }

  let points = [
    arrowStart.x,
    arrowStart.y,
    arrowCenter.x,
    arrowCenter.y,
    arrowEnd.x,
    arrowEnd.y,
  ]

  return points
}

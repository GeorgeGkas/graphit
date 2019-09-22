export default function zoomOut({
  currentStageScale,
  cursorPosition,
  scaleStageBy,
  updateStagePosition,
}) {
  const scaleBy = 1.1

  const mousePointTo = {
    x: cursorPosition.x / currentStageScale / currentStageScale,
    y: cursorPosition.y / currentStageScale / currentStageScale,
  }

  let newScale = currentStageScale * scaleBy

  scaleStageBy(newScale)

  const newPos = {
    x: -(mousePointTo.x / newScale) * newScale,
    y: -(mousePointTo.y / newScale) * newScale,
  }

  updateStagePosition(newPos)
}

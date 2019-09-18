import React from 'react'
import { Layer, Line } from 'react-konva'
import editorComponentsTheme from '../../../../../../themes/editorComponents.theme'

const buildX = ({ scaleStage, padding, stage }) => {
  const gridX = []

  for (let i = 0; i < (window.innerWidth * (1 / scaleStage)) / padding; ++i) {
    const points = [
      Math.round(i * padding) + 0.5,
      0 -
        window.innerHeight * scaleStage -
        window.innerHeight * Math.abs(stage.y),
      Math.round(i * padding) + 0.5,
      window.innerHeight +
        window.innerHeight * scaleStage +
        window.innerHeight * Math.abs(stage.y),
    ]

    gridX.push(
      <Line
        key={Math.random()}
        points={points}
        stroke={editorComponentsTheme.grid.color}
        strokeWidth={0.5}
      />,
    )
  }

  return gridX
}

const buildY = ({ scaleStage, padding, stage }) => {
  const gridY = []

  for (let i = 0; i < (window.innerHeight * (1 / scaleStage)) / padding; ++i) {
    const points = [
      0 -
        window.innerWidth * scaleStage -
        window.innerWidth * Math.abs(stage.x),
      Math.round(i * padding) + 0.5,
      window.innerWidth +
        window.innerWidth * scaleStage +
        window.innerWidth * Math.abs(stage.x),
      Math.round(i * padding),
    ]

    gridY.push(
      <Line
        key={Math.random()}
        points={points}
        stroke={editorComponentsTheme.grid.color}
        strokeWidth={0.5}
      />,
    )
  }

  return gridY
}

const Presentation = ({ stage, scaleStage }) => {
  const padding = 35

  const gridX = buildX({
    stage,
    padding,
    scaleStage,
  })

  const gridY = buildY({
    stage,
    padding,
    scaleStage,
  })

  const grid = [...gridX, ...gridY]

  return <Layer>{grid}</Layer>
}

export default Presentation

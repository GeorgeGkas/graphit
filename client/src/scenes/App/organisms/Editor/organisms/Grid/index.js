/**
 * Import globals.
 */
import React from 'react'
import { Layer, Line } from 'react-konva'

/**
 * Import themes.
 */
import editorComponentsTheme from '../../../../../../themes/editorComponents.theme'

/**
 * Build X axis.
 */
const buildX = ({ padding, stage }) => {
  const gridX = []

  for (let i = 0; i < (window.innerWidth * (1 / stage.scale)) / padding; ++i) {
    const points = [
      Math.round(i * padding) + 0.5,
      0 -
        window.innerHeight * stage.scale -
        window.innerHeight * Math.abs(stage.pos.y),
      Math.round(i * padding) + 0.5,
      window.innerHeight +
        window.innerHeight * stage.scale +
        window.innerHeight * Math.abs(stage.pos.y),
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

/**
 * Build Y axis.
 */
const buildY = ({ padding, stage }) => {
  const gridY = []

  for (let i = 0; i < (window.innerHeight * (1 / stage.scale)) / padding; ++i) {
    const points = [
      0 -
        window.innerWidth * stage.scale -
        window.innerWidth * Math.abs(stage.pos.x),
      Math.round(i * padding) + 0.5,
      window.innerWidth +
        window.innerWidth * stage.scale +
        window.innerWidth * Math.abs(stage.pos.x),
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

/**
 * Component.
 */
const Grid = ({ stage }) => {
  const padding = 35

  const gridX = buildX({
    padding,
    stage,
  })

  const gridY = buildY({
    padding,
    stage,
  })

  console.log(gridY)

  const grid = [...gridX, ...gridY]

  return <Layer>{grid}</Layer>
}

export default Grid

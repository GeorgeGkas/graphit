/**
 * Import globals.
 */
import React from 'react'
import { Arrow, Text, Group } from 'react-konva'

/**
 * Import themes.
 */
import editorComponentsTheme from '../../../../../../themes/editorComponents.theme'
import algorithmComponentsTheme from '../../../../../../themes/algorithmComponents.theme'

/**
 * Import utilities.
 */
import buildEdge from './services/buildEdge'

/**
 * Component.
 */
const EdgeNotLoop = ({
  algorithm_current_step,
  algorithmType,
  currentEditorAction,
  curvePower,
  isDoubleEdge,
  nodeRadius,
  selectEdge,
  thisResolvedEdge,
  unselectAll,
}) => {
  let points = buildEdge({
    curvePower,
    isDoubleEdge,
    nodeRadius,
    resolvedEdge: thisResolvedEdge,
  })

  return (
    <Group
      onClick={e => {
        if (currentEditorAction === 'select') {
          unselectAll()
          selectEdge(thisResolvedEdge.id)
        }
        e.cancelBubble = true
      }}
    >
      {thisResolvedEdge.ui.selected ? (
        <Arrow
          fill={editorComponentsTheme.edge.selected.color}
          opacity={0.7}
          pointerLength={15}
          pointerWidth={10}
          points={points}
          stroke={editorComponentsTheme.edge.selected.color}
          strokeWidth={5}
          tension={0.8}
        />
      ) : null}

      <Arrow
        fill={
          algorithm_current_step.highlighted_edges.some(
            id => id === thisResolvedEdge.id,
          )
            ? algorithmComponentsTheme.edge.highlighted.color
            : algorithm_current_step.selected_edges.some(
                id => id === thisResolvedEdge.id,
              )
            ? algorithmComponentsTheme.edge.selected.color
            : currentEditorAction === 'isPlaying'
            ? algorithmComponentsTheme.edge.neutral.color
            : editorComponentsTheme.edge.neutral.color
        }
        hitStrokeWidth={25}
        id={thisResolvedEdge.id}
        pointerLength={15}
        pointerWidth={10}
        points={points}
        stroke={
          algorithm_current_step.highlighted_edges.some(
            id => id === thisResolvedEdge.id,
          )
            ? algorithmComponentsTheme.edge.highlighted.color
            : algorithm_current_step.selected_edges.some(
                id => id === thisResolvedEdge.id,
              )
            ? algorithmComponentsTheme.edge.selected.color
            : currentEditorAction === 'isPlaying'
            ? algorithmComponentsTheme.edge.neutral.color
            : editorComponentsTheme.edge.neutral.color
        }
        strokeWidth={1}
        tension={0.8}
        onMouseOut={e => {
          if (currentEditorAction === 'select') {
            e.target.stroke(editorComponentsTheme.edge.neutral.color)
            e.target.fill(editorComponentsTheme.edge.neutral.color)
          }
        }}
        onMouseOver={e => {
          if (currentEditorAction === 'select') {
            e.target.stroke(editorComponentsTheme.edge.hovered.color)
            e.target.fill(editorComponentsTheme.edge.hovered.color)
          }
        }}
      />

      <Text
        align="center"
        fontFamily="Roboto"
        fontSize={15}
        height={2 * 24}
        stroke={editorComponentsTheme.stage.fill.color}
        strokeWidth={7}
        text={
          algorithmType === 'Automata'
            ? String(thisResolvedEdge.properties.input)
            : String(thisResolvedEdge.properties.weight)
        }
        verticalAlign="middle"
        width={2 * 24}
        x={points[2] - 24}
        y={points[3] - 24}
      />
      <Text
        align="center"
        fontFamily="Roboto"
        fontSize={15}
        height={2 * 24}
        text={
          algorithmType === 'Automata'
            ? String(thisResolvedEdge.properties.input)
            : String(thisResolvedEdge.properties.weight)
        }
        verticalAlign="middle"
        width={2 * 24}
        x={points[2] - 24}
        y={points[3] - 24}
      />
    </Group>
  )
}

export default EdgeNotLoop

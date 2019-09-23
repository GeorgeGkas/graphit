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
  arrow,
  curvePower,
  editorActionType,
  isMultiSelect,
  nodeRadius,
  secondExist,
  selectArrow,
  selectedArrowId,
  selectedNodeId,
  unselectArrow,
  unselectNode,
}) => {
  let points = buildEdge({
    curvePower,
    edge: arrow,
    nodeRadius,
    secondExist,
  })

  return (
    <Group
      onClick={e => {
        if (editorActionType === 'select') {
          if (isMultiSelect) {
            if (!selectedArrowId.includes(arrow.id)) {
              selectArrow(arrow.id)
            } else {
              unselectArrow(arrow.id)
            }
          } else {
            for (const ID of selectedNodeId) {
              unselectNode(ID)
            }

            for (const ID of selectedArrowId) {
              unselectArrow(ID)
            }

            selectArrow(arrow.id)
          }
        }
        e.cancelBubble = true
      }}
    >
      {selectedArrowId.includes(arrow.id) ? (
        <Arrow
          key={arrow.id + '_selected'}
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
        key={arrow.id}
        fill={
          algorithm_current_step.highlighted_edges.some(id => id === arrow.id)
            ? algorithmComponentsTheme.edge.highlighted.color
            : algorithm_current_step.selected_edges.some(id => id === arrow.id)
            ? algorithmComponentsTheme.edge.selected.color
            : editorActionType === 'isPlaying'
            ? algorithmComponentsTheme.edge.neutral.color
            : editorComponentsTheme.edge.neutral.color
        }
        hitStrokeWidth={25}
        id={arrow.id}
        pointerLength={15}
        pointerWidth={10}
        points={points}
        stroke={
          algorithm_current_step.highlighted_edges.some(id => id === arrow.id)
            ? algorithmComponentsTheme.edge.highlighted.color
            : algorithm_current_step.selected_edges.some(id => id === arrow.id)
            ? algorithmComponentsTheme.edge.selected.color
            : editorActionType === 'isPlaying'
            ? algorithmComponentsTheme.edge.neutral.color
            : editorComponentsTheme.edge.neutral.color
        }
        strokeWidth={1}
        tension={0.8}
        onMouseOut={e => {
          if (editorActionType === 'select') {
            e.target.stroke(editorComponentsTheme.edge.neutral.color)
            e.target.fill(editorComponentsTheme.edge.neutral.color)
          }
        }}
        onMouseOver={e => {
          if (editorActionType === 'select') {
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
        text={arrow.weight}
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
        text={arrow.weight}
        verticalAlign="middle"
        width={2 * 24}
        x={points[2] - 24}
        y={points[3] - 24}
      />
    </Group>
  )
}

export default EdgeNotLoop

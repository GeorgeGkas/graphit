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
  edge,
  curvePower,
  editorActionType,
  isMultiSelect,
  nodeRadius,
  secondExist,
  selectEdge,
  selectedEdgeId,
  selectedNodeId,
  unselectEdge,
  unselectNode,
}) => {
  let points = buildEdge({
    curvePower,
    edge,
    nodeRadius,
    secondExist,
  })

  return (
    <Group
      onClick={e => {
        if (editorActionType === 'select') {
          if (isMultiSelect) {
            if (!selectedEdgeId.includes(edge.id)) {
              selectEdge(edge.id)
            } else {
              unselectEdge(edge.id)
            }
          } else {
            for (const ID of selectedNodeId) {
              unselectNode(ID)
            }

            for (const ID of selectedEdgeId) {
              unselectEdge(ID)
            }

            selectEdge(edge.id)
          }
        }
        e.cancelBubble = true
      }}
    >
      {selectedEdgeId.includes(edge.id) ? (
        <Arrow
          key={edge.id + '_selected'}
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
        key={edge.id}
        fill={
          algorithm_current_step.highlighted_edges.some(id => id === edge.id)
            ? algorithmComponentsTheme.edge.highlighted.color
            : algorithm_current_step.selected_edges.some(id => id === edge.id)
            ? algorithmComponentsTheme.edge.selected.color
            : editorActionType === 'isPlaying'
            ? algorithmComponentsTheme.edge.neutral.color
            : editorComponentsTheme.edge.neutral.color
        }
        hitStrokeWidth={25}
        id={edge.id}
        pointerLength={15}
        pointerWidth={10}
        points={points}
        stroke={
          algorithm_current_step.highlighted_edges.some(id => id === edge.id)
            ? algorithmComponentsTheme.edge.highlighted.color
            : algorithm_current_step.selected_edges.some(id => id === edge.id)
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
        text={edge.weight}
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
        text={edge.weight}
        verticalAlign="middle"
        width={2 * 24}
        x={points[2] - 24}
        y={points[3] - 24}
      />
    </Group>
  )
}

export default EdgeNotLoop

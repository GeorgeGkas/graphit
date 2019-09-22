import React from 'react'
import { Arrow, Text, Group } from 'react-konva'
import editorComponentsTheme from '../../../../../../themes/editorComponents.theme'
import algorithmComponentsTheme from '../../../../../../themes/algorithmComponents.theme'
import buildEdge from './services/buildEdge'

const Presentation = ({
  arrow,
  secondExist,
  nodeRadius,
  curvePower,
  selectArrow,
  unselectArrow,
  editorActionType,
  isMultiSelect,
  unselectNode,
  selectedArrowId,
  selectedNodeId,
  algorithm_current_step,
}) => {
  let points = buildEdge({
    arrow,
    nodeRadius,
    secondExist,
    curvePower,
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
          tension={0.8}
          points={points}
          stroke={editorComponentsTheme.edge.selected.color}
          fill={editorComponentsTheme.edge.selected.color}
          strokeWidth={5}
          pointerLength={15}
          pointerWidth={10}
          opacity={0.7}
        />
      ) : null}

      <Arrow
        id={arrow.id}
        key={arrow.id}
        tension={0.8}
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
        pointerLength={15}
        pointerWidth={10}
        strokeWidth={1}
        onMouseOver={e => {
          if (editorActionType === 'select') {
            e.target.stroke(editorComponentsTheme.edge.hovered.color)
            e.target.fill(editorComponentsTheme.edge.hovered.color)
          }
        }}
        onMouseOut={e => {
          if (editorActionType === 'select') {
            e.target.stroke(editorComponentsTheme.edge.neutral.color)
            e.target.fill(editorComponentsTheme.edge.neutral.color)
          }
        }}
      />

      <Text
        stroke={editorComponentsTheme.stage.fill.color}
        strokeWidth={7}
        x={points[2] - 24}
        y={points[3] - 24}
        width={2 * 24}
        height={2 * 24}
        align="center"
        verticalAlign="middle"
        fontSize={15}
        text={arrow.weight}
        fontFamily="Roboto"
      />
      <Text
        x={points[2] - 24}
        y={points[3] - 24}
        width={2 * 24}
        height={2 * 24}
        align="center"
        verticalAlign="middle"
        fontSize={15}
        text={arrow.weight}
        fontFamily="Roboto"
      />
    </Group>
  )
}

export default Presentation

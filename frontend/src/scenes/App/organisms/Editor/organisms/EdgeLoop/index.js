/**
 * Import globals.
 */
import React from 'react'
import { Circle, Text, Group } from 'react-konva'

/**
 * Import themes.
 */
import editorComponentsTheme from '../../../../../../themes/editorComponents.theme'
import algorithmComponentsTheme from '../../../../../../themes/algorithmComponents.theme'

/**
 * Component.
 */
const EdgeLoop = ({
  algorithm_current_step,
  arrow,
  editorActionType,
  isMultiSelect,
  scaleStage,
  selectArrow,
  selectedArrowId,
  selectedNodeId,
  unselectArrow,
  unselectNode,
}) => (
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
    <Circle
      key={arrow.id}
      dragBoundFunc={pos => {
        const x = arrow.from.x * scaleStage
        const y = arrow.from.y * scaleStage
        const radius = 20 * scaleStage
        const scale =
          radius / Math.sqrt(Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2))

        return scale !== Infinity
          ? {
              x: Math.round((pos.x - x) * scale + x),
              y: Math.round((pos.y - y) * scale + y),
            }
          : pos
      }}
      draggable={editorActionType === 'select'}
      height={35}
      hitStrokeWidth={20}
      id={arrow.id}
      stroke={
        algorithm_current_step.highlighted_edges.some(id => id === arrow.id)
          ? algorithmComponentsTheme.edge.highlighted.color
          : algorithm_current_step.selected_edges.some(id => id === arrow.id)
          ? algorithmComponentsTheme.edge.selected.color
          : editorActionType === 'isPlaying'
          ? algorithmComponentsTheme.edge.neutral.color
          : selectedArrowId.includes(arrow.id)
          ? editorComponentsTheme.edge.selected.color
          : arrow.stroke
      }
      strokeWidth={selectedArrowId.includes(arrow.id) ? 5 : 1}
      width={35}
      x={arrow.from.x - 35 / 2 + 5}
      y={arrow.from.y - 35 / 2 + 5}
      onDragMove={e => {
        e.cancelBubble = true

        const x = arrow.from.x - 5
        const y = arrow.from.y - 5
        const radius = 35
        const scale =
          radius /
          Math.sqrt(
            Math.pow(e.currentTarget.position().x - x, 2) +
              Math.pow(e.currentTarget.position().y - y, 2),
          )

        const position =
          scale !== Infinity
            ? {
                x: Math.round((e.currentTarget.position().x - x) * scale + x),
                y: Math.round((e.currentTarget.position().y - y) * scale + y),
              }
            : e.currentTarget.position()

        e.currentTarget
          .getStage()
          .find('#' + arrow.id + '_text')[0]
          .position(position)
        e.currentTarget
          .getStage()
          .find('#' + arrow.id + '_text_back')[0]
          .position(position)
      }}
      onDragStart={e => {
        e.cancelBubble = true
      }}
      onMouseOut={e => {
        if (
          editorActionType === 'select' &&
          !selectedArrowId.includes(arrow.id)
        ) {
          e.target.stroke(editorComponentsTheme.edge.neutral.color)
        }
      }}
      onMouseOver={e => {
        if (
          editorActionType === 'select' &&
          !selectedArrowId.includes(arrow.id)
        ) {
          e.target.stroke(editorComponentsTheme.edge.hovered.color)
        }
      }}
    />
    <Text
      fontFamily="Roboto"
      fontSize={15}
      id={arrow.id + '_text_back'}
      stroke={editorComponentsTheme.stage.fill.color}
      strokeWidth={7}
      text={arrow.weight}
      x={arrow.from.x - 30}
      y={arrow.from.y - 30}
    />
    <Text
      fontFamily="Roboto"
      fontSize={15}
      id={arrow.id + '_text'}
      text={arrow.weight}
      x={arrow.from.x - 30}
      y={arrow.from.y - 30}
    />
  </Group>
)

export default EdgeLoop

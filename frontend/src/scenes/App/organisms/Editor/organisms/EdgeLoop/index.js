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
  edge,
  editorActionType,
  isMultiSelect,
  scaleStage,
  selectEdge,
  selectedEdgesId,
  selectedNodesId,
  unselectEdge,
  unselectNode,
}) => (
  <Group
    onClick={e => {
      if (editorActionType === 'select') {
        if (isMultiSelect) {
          if (!selectedEdgesId.includes(edge.id)) {
            selectEdge(edge.id)
          } else {
            unselectEdge(edge.id)
          }
        } else {
          for (const ID of selectedNodesId) {
            unselectNode(ID)
          }

          for (const ID of selectedEdgesId) {
            unselectEdge(ID)
          }

          selectEdge(edge.id)
        }
      }
      e.cancelBubble = true
    }}
  >
    <Circle
      key={edge.id}
      dragBoundFunc={pos => {
        const x = edge.from.x * scaleStage
        const y = edge.from.y * scaleStage
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
      id={edge.id}
      stroke={
        algorithm_current_step.highlighted_edges.some(id => id === edge.id)
          ? algorithmComponentsTheme.edge.highlighted.color
          : algorithm_current_step.selected_edges.some(id => id === edge.id)
          ? algorithmComponentsTheme.edge.selected.color
          : editorActionType === 'isPlaying'
          ? algorithmComponentsTheme.edge.neutral.color
          : selectedEdgesId.includes(edge.id)
          ? editorComponentsTheme.edge.selected.color
          : edge.stroke
      }
      strokeWidth={selectedEdgesId.includes(edge.id) ? 5 : 1}
      width={35}
      x={edge.from.x - 35 / 2 + 5}
      y={edge.from.y - 35 / 2 + 5}
      onDragMove={e => {
        e.cancelBubble = true

        const x = edge.from.x - 5
        const y = edge.from.y - 5
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
          .find('#' + edge.id + '_text')[0]
          .position(position)
        e.currentTarget
          .getStage()
          .find('#' + edge.id + '_text_back')[0]
          .position(position)
      }}
      onDragStart={e => {
        e.cancelBubble = true
      }}
      onMouseOut={e => {
        if (
          editorActionType === 'select' &&
          !selectedEdgesId.includes(edge.id)
        ) {
          e.target.stroke(editorComponentsTheme.edge.neutral.color)
        }
      }}
      onMouseOver={e => {
        if (
          editorActionType === 'select' &&
          !selectedEdgesId.includes(edge.id)
        ) {
          e.target.stroke(editorComponentsTheme.edge.hovered.color)
        }
      }}
    />
    <Text
      fontFamily="Roboto"
      fontSize={15}
      id={edge.id + '_text_back'}
      stroke={editorComponentsTheme.stage.fill.color}
      strokeWidth={7}
      text={edge.weight}
      x={edge.from.x - 30}
      y={edge.from.y - 30}
    />
    <Text
      fontFamily="Roboto"
      fontSize={15}
      id={edge.id + '_text'}
      text={edge.weight}
      x={edge.from.x - 30}
      y={edge.from.y - 30}
    />
  </Group>
)

export default EdgeLoop

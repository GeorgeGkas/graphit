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
  algorithmType,
  currentEditorAction,
  node,
  selectEdge,
  stageScale,
  thisEdge,
  unselectAll,
}) => (
  <Group
    onClick={e => {
      if (currentEditorAction === 'select') {
        unselectAll()
        selectEdge(thisEdge.id)
      }
      e.cancelBubble = true
    }}
  >
    <Circle
      dragBoundFunc={pos => {
        const x = node.ui.pos.x * stageScale
        const y = node.ui.pos.y * stageScale
        const radius = 20 * stageScale
        const scale =
          radius / Math.sqrt(Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2))

        return scale !== Infinity
          ? {
              x: Math.round((pos.x - x) * scale + x),
              y: Math.round((pos.y - y) * scale + y),
            }
          : pos
      }}
      draggable={currentEditorAction === 'select'}
      height={35}
      hitStrokeWidth={20}
      id={thisEdge.id}
      stroke={
        algorithm_current_step.highlighted_edges.some(id => id === thisEdge.id)
          ? algorithmComponentsTheme.edge.highlighted.color
          : algorithm_current_step.selected_edges.some(id => id === thisEdge.id)
          ? algorithmComponentsTheme.edge.selected.color
          : currentEditorAction === 'isPlaying'
          ? algorithmComponentsTheme.edge.neutral.color
          : thisEdge.ui.selected
          ? editorComponentsTheme.edge.selected.color
          : editorComponentsTheme.edge.hovered.color
      }
      strokeWidth={thisEdge.ui.selected ? 5 : 1}
      width={35}
      x={node.ui.pos.x - 35 / 2 + 5}
      y={node.ui.pos.y - 35 / 2 + 5}
      onDragMove={e => {
        e.cancelBubble = true

        const x = node.ui.pos.x - 5
        const y = node.ui.pos.y - 5
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
          .find('#' + thisEdge.id + '_text')[0]
          .position(position)
        e.currentTarget
          .getStage()
          .find('#' + thisEdge.id + '_text_back')[0]
          .position(position)
      }}
      onDragStart={e => {
        e.cancelBubble = true
      }}
      onMouseOut={e => {
        if (currentEditorAction === 'select' && !thisEdge.ui.selected) {
          e.target.stroke(editorComponentsTheme.edge.neutral.color)
        }
      }}
      onMouseOver={e => {
        if (currentEditorAction === 'select' && !thisEdge.ui.selected) {
          e.target.stroke(editorComponentsTheme.edge.hovered.color)
        }
      }}
    />
    <Text
      fontFamily="Roboto"
      fontSize={15}
      id={thisEdge.id + '_text_back'}
      stroke={editorComponentsTheme.stage.fill.color}
      strokeWidth={7}
      text={
        algorithmType === 'Automata'
          ? String(thisEdge.properties.input)
          : String(thisEdge.properties.weight)
      }
      x={node.ui.pos.x - 30}
      y={node.ui.pos.y - 30}
    />
    <Text
      fontFamily="Roboto"
      fontSize={15}
      id={thisEdge.id + '_text'}
      text={
        algorithmType === 'Automata'
          ? String(thisEdge.properties.input)
          : String(thisEdge.properties.weight)
      }
      x={node.ui.pos.x - 30}
      y={node.ui.pos.y - 30}
    />
  </Group>
)

export default EdgeLoop

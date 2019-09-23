/**
 * Import globals.
 */
import React from 'react'
import { Group, Text, Circle } from 'react-konva'

/**
 * Import themes.
 */
import editorComponentsTheme from '../../../../../../themes/editorComponents.theme'
import algorithmComponentsTheme from '../../../../../../themes/algorithmComponents.theme'

/**
 * Component.
 */
const Node = ({
  thisNode,
  editorActionType,
  isMultiSelect,
  selectedNodeId,
  selectedArrowId,
  selectNode,
  unselectNode,
  unselectArrow,
  drawTempArrow,
  createArrow,
  grid,
  createShape,
  updateNodePositionStart,
  updateNodePositionEnd,
  nodes,
  initialNode,
  algorithm_current_step,
}) => (
  <Group
    id={thisNode.id}
    key={thisNode.id}
    draggable={editorActionType === 'select'}
    x={thisNode.x}
    y={thisNode.y}
    onMouseOver={e => {
      if (editorActionType === 'select') {
        e.currentTarget
          .getStage()
          .find('#' + thisNode.id + '_node')[0]
          .fill(editorComponentsTheme.node.hovered.color)

        e.currentTarget
          .getStage()
          .find('#' + thisNode.id + '_node')[0]
          .fill(editorComponentsTheme.node.hovered.color)
      }
    }}
    onMouseOut={e => {
      e.currentTarget
        .getStage()
        .find('#' + thisNode.id + '_node')[0]
        .fill(editorComponentsTheme.node.neutral.color)

      e.currentTarget
        .getStage()
        .find('#' + thisNode.id + '_node')[0]
        .fill(editorComponentsTheme.node.neutral.color)
    }}
    onClick={e => {
      e.cancelBubble = true

      if (editorActionType === 'select') {
        if (isMultiSelect) {
          if (selectedNodeId.includes(thisNode.id)) {
            unselectNode(thisNode.id)
          } else {
            selectNode(thisNode.id)
          }
        } else {
          for (const ID of selectedNodeId) {
            unselectNode(ID)
          }

          for (const ID of selectedArrowId) {
            unselectArrow(ID)
          }

          selectNode(thisNode.id)
        }
      } else if (editorActionType === 'edge') {
        if (selectedNodeId.length === 0) {
          selectNode(thisNode.id)
          drawTempArrow(true)
        } else {
          createArrow({
            from: selectedNodeId[0],
            to: thisNode.id,
          })
          drawTempArrow(false)
          unselectNode(selectedNodeId[0])
          createShape()
        }
      }
    }}
    onDragStart={e => {
      if (editorActionType === 'select') {
        if (grid) {
          e.currentTarget
            .getStage()
            .find('#shadowCircle')[0]
            .show()
        }

        if (!isMultiSelect) {
          for (const ID of selectedNodeId) {
            unselectNode(ID)
          }

          for (const ID of selectedArrowId) {
            unselectArrow(ID)
          }

          selectNode(thisNode.id)
        } else {
          if (!selectedNodeId.includes(thisNode.id)) {
            selectNode(thisNode.id)
          }
        }
      }
      e.cancelBubble = true
    }}
    onDragMove={e => {
      if (editorActionType === 'select' || editorActionType === 'isPlaying') {
        if (grid) {
          if (selectedNodeId.length === 1) {
            e.currentTarget
              .getStage()
              .find('#shadowCircle')[0]
              .position({
                x: Math.round(e.target.x() / 35) * 35,
                y: Math.round(e.target.y() / 35) * 35,
              })
          }
        }

        for (const selected_node of selectedNodeId) {
          updateNodePositionStart({
            pos: {
              x:
                nodes[selected_node].x +
                (e.target.getPosition().x - nodes[thisNode.id].x),
              y:
                nodes[selected_node].y +
                (e.target.getPosition().y - nodes[thisNode.id].y),
            },
            id: selected_node,
          })

          e.currentTarget
            .getStage()
            .find('#' + selected_node)[0]
            .position({
              x:
                nodes[selected_node].x +
                (e.target.getPosition().x - nodes[thisNode.id].x),
              y:
                nodes[selected_node].y +
                (e.target.getPosition().y - nodes[thisNode.id].y),
            })
        }
      }
      e.cancelBubble = true
    }}
    onDragEnd={e => {
      if (editorActionType === 'select' || editorActionType === 'isPlaying') {
        if (grid) {
          for (const selected_node of selectedNodeId) {
            e.currentTarget
              .getStage()
              .find('#' + selected_node)[0]
              .position({
                x:
                  Math.round(
                    (nodes[selected_node].x +
                      (e.target.getPosition().x - nodes[thisNode.id].x)) /
                      35,
                  ) * 35,
                y:
                  Math.round(
                    (nodes[selected_node].y +
                      (e.target.getPosition().y - nodes[thisNode.id].y)) /
                      35,
                  ) * 35,
              })
          }
        }

        for (const selected_node of selectedNodeId) {
          updateNodePositionEnd({
            pos: grid
              ? {
                  x:
                    Math.round(
                      (nodes[selected_node].x +
                        (e.target.getPosition().x - nodes[thisNode.id].x)) /
                        35,
                    ) * 35,
                  y:
                    Math.round(
                      (nodes[selected_node].y +
                        (e.target.getPosition().y - nodes[thisNode.id].y)) /
                        35,
                    ) * 35,
                }
              : {
                  x:
                    nodes[selected_node].x +
                    (e.target.getPosition().x - nodes[thisNode.id].x),
                  y:
                    nodes[selected_node].y +
                    (e.target.getPosition().y - nodes[thisNode.id].y),
                },
            id: selected_node,
          })
        }

        e.currentTarget
          .getStage()
          .find('#shadowCircle')[0]
          .hide()
      }

      e.cancelBubble = true
    }}
  >
    {selectedNodeId.includes(thisNode.id) ? (
      <Circle
        width={45}
        height={45}
        strokeWidth={1}
        fill={editorComponentsTheme.node.selected.color}
        opacity={0.7}
      />
    ) : null}

    {initialNode === thisNode.id ? (
      <Circle
        width={40}
        height={40}
        strokeWidth={1}
        fill={'rgba(0, 0, 0, 0)'}
        stroke={
          algorithm_current_step.highlighted_nodes.some(
            id => id === thisNode.id,
          )
            ? algorithmComponentsTheme.node.highlighted.color
            : algorithm_current_step.selected_nodes.some(
                id => id === thisNode.id,
              )
            ? algorithmComponentsTheme.node.selected.color
            : editorActionType === 'isPlaying'
            ? algorithmComponentsTheme.node.neutral.color
            : editorComponentsTheme.node.neutral.color
        }
      />
    ) : null}

    <Circle
      id={thisNode.id + '_node'}
      fill={
        algorithm_current_step.highlighted_nodes.some(id => id === thisNode.id)
          ? algorithmComponentsTheme.node.highlighted.color
          : algorithm_current_step.selected_nodes.some(id => id === thisNode.id)
          ? algorithmComponentsTheme.node.selected.color
          : editorActionType === 'isPlaying'
          ? algorithmComponentsTheme.node.neutral.color
          : thisNode.fill
      }
      width={35}
      height={35}
      stroke={'rgba(0, 0, 0, 0)'}
      hitStrokeWidth={10}
      shadowEnabled={false}
      shadowOffset={{ x: 2, y: 2 }}
    />

    <Text
      x={-5}
      y={-5}
      text={thisNode.name}
      fill="#fff"
      fontFamily="Roboto"
      fontSize={14}
      lineHeight={0.8}
    />
  </Group>
)

export default Node

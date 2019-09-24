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
  algorithm_current_step,
  createEdge,
  createShape,
  drawTempArrow,
  editorActionType,
  grid,
  initialNode,
  isMultiSelect,
  nodes,
  selectNode,
  selectedEdgesId,
  selectedNodesId,
  thisNode,
  unselectEdge,
  unselectNode,
  updateNodePositionEnd,
  updateNodePositionStart,
}) => (
  <Group
    key={thisNode.id}
    draggable={editorActionType === 'select'}
    id={thisNode.id}
    x={thisNode.x}
    y={thisNode.y}
    onClick={e => {
      e.cancelBubble = true

      if (editorActionType === 'select') {
        if (isMultiSelect) {
          if (selectedNodesId.includes(thisNode.id)) {
            unselectNode(thisNode.id)
          } else {
            selectNode(thisNode.id)
          }
        } else {
          for (const ID of selectedNodesId) {
            unselectNode(ID)
          }

          for (const ID of selectedEdgesId) {
            unselectEdge(ID)
          }

          selectNode(thisNode.id)
        }
      } else if (editorActionType === 'edge') {
        if (selectedNodesId.length === 0) {
          selectNode(thisNode.id)
          drawTempArrow(true)
        } else {
          createEdge({
            from: selectedNodesId[0],
            to: thisNode.id,
          })
          drawTempArrow(false)
          unselectNode(selectedNodesId[0])
          createShape()
        }
      }
    }}
    onDragEnd={e => {
      if (editorActionType === 'select' || editorActionType === 'isPlaying') {
        if (grid) {
          for (const selected_node of selectedNodesId) {
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

        for (const selected_node of selectedNodesId) {
          updateNodePositionEnd({
            id: selected_node,
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
          })
        }

        e.currentTarget
          .getStage()
          .find('#shadowCircle')[0]
          .hide()
      }

      e.cancelBubble = true
    }}
    onDragMove={e => {
      if (editorActionType === 'select' || editorActionType === 'isPlaying') {
        if (grid) {
          if (selectedNodesId.length === 1) {
            e.currentTarget
              .getStage()
              .find('#shadowCircle')[0]
              .position({
                x: Math.round(e.target.x() / 35) * 35,
                y: Math.round(e.target.y() / 35) * 35,
              })
          }
        }

        for (const selected_node of selectedNodesId) {
          updateNodePositionStart({
            id: selected_node,
            pos: {
              x:
                nodes[selected_node].x +
                (e.target.getPosition().x - nodes[thisNode.id].x),
              y:
                nodes[selected_node].y +
                (e.target.getPosition().y - nodes[thisNode.id].y),
            },
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
    onDragStart={e => {
      if (editorActionType === 'select') {
        if (grid) {
          e.currentTarget
            .getStage()
            .find('#shadowCircle')[0]
            .show()
        }

        if (!isMultiSelect) {
          for (const ID of selectedNodesId) {
            unselectNode(ID)
          }

          for (const ID of selectedEdgesId) {
            unselectEdge(ID)
          }

          selectNode(thisNode.id)
        } else {
          if (!selectedNodesId.includes(thisNode.id)) {
            selectNode(thisNode.id)
          }
        }
      }
      e.cancelBubble = true
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
  >
    {selectedNodesId.includes(thisNode.id) ? (
      <Circle
        fill={editorComponentsTheme.node.selected.color}
        height={45}
        opacity={0.7}
        strokeWidth={1}
        width={45}
      />
    ) : null}

    {initialNode === thisNode.id ? (
      <Circle
        fill={'rgba(0, 0, 0, 0)'}
        height={40}
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
        strokeWidth={1}
        width={40}
      />
    ) : null}

    <Circle
      fill={
        algorithm_current_step.highlighted_nodes.some(id => id === thisNode.id)
          ? algorithmComponentsTheme.node.highlighted.color
          : algorithm_current_step.selected_nodes.some(id => id === thisNode.id)
          ? algorithmComponentsTheme.node.selected.color
          : editorActionType === 'isPlaying'
          ? algorithmComponentsTheme.node.neutral.color
          : thisNode.fill
      }
      height={35}
      hitStrokeWidth={10}
      id={thisNode.id + '_node'}
      shadowEnabled={false}
      shadowOffset={{ x: 2, y: 2 }}
      stroke={'rgba(0, 0, 0, 0)'}
      width={35}
    />

    <Text
      fill="#fff"
      fontFamily="Roboto"
      fontSize={14}
      lineHeight={0.8}
      text={thisNode.name}
      x={-5}
      y={-5}
    />
  </Group>
)

export default Node

import React from 'react'
import { Arrow, Circle, Group, Text } from 'react-konva'

import algorithmComponentsTheme from '../../../../../../themes/algorithmComponents.theme'
import editorComponentsTheme from '../../../../../../themes/editorComponents.theme'

const Node = ({
  algorithm_current_step,
  createEdge,
  currentEditorAction,
  gridVisible,
  selectNode,
  selectedNode,
  setShadowCircleVisibility,
  setTempArrowVisibility,
  thisNode,
  unselectAll,
  unselectNode,
  updateNodePositionEnd,
  updateNodePositionStart,
}) => (
  <Group
    draggable={currentEditorAction === 'select'}
    id={thisNode.id}
    x={thisNode.ui.pos.x}
    y={thisNode.ui.pos.y}
    onClick={e => {
      e.cancelBubble = true
      if (currentEditorAction === 'select') {
        unselectAll()
        selectNode(thisNode.id)
      } else if (currentEditorAction === 'edge') {
        if (!selectedNode) {
          selectNode(thisNode.id)
          setTempArrowVisibility(true)
        } else {
          createEdge(selectedNode.id, thisNode.id)
          setTempArrowVisibility(false)
          unselectNode(selectedNode.id)
        }
      }
    }}
    onDragEnd={e => {
      if (
        currentEditorAction === 'select' ||
        currentEditorAction === 'isPlaying'
      ) {
        updateNodePositionEnd(
          thisNode.id,
          gridVisible
            ? {
                x:
                  Math.round(
                    (thisNode.ui.pos.x +
                      (e.target.getPosition().x - thisNode.ui.pos.x)) /
                      35,
                  ) * 35,
                y:
                  Math.round(
                    (thisNode.ui.pos.y +
                      (e.target.getPosition().y - thisNode.ui.pos.y)) /
                      35,
                  ) * 35,
              }
            : {
                x:
                  thisNode.ui.pos.x +
                  (e.target.getPosition().x - thisNode.ui.pos.x),
                y:
                  thisNode.ui.pos.y +
                  (e.target.getPosition().y - thisNode.ui.pos.y),
              },
        )

        setShadowCircleVisibility(false)
      }

      e.cancelBubble = true
    }}
    onDragMove={e => {
      if (
        currentEditorAction === 'select' ||
        currentEditorAction === 'isPlaying'
      ) {
        if (gridVisible) {
          e.currentTarget
            .getStage()
            .find('#shadowCircle')[0]
            .position({
              x: Math.round(thisNode.ui.pos.x / 35) * 35,
              y: Math.round(thisNode.ui.pos.y / 35) * 35,
            })
        }

        updateNodePositionStart(thisNode.id, {
          x: thisNode.ui.pos.x + (e.target.getPosition().x - thisNode.ui.pos.x),
          y: thisNode.ui.pos.y + (e.target.getPosition().y - thisNode.ui.pos.y),
        })
      }
      e.cancelBubble = true
    }}
    onDragStart={e => {
      if (currentEditorAction === 'select') {
        if (gridVisible) {
          setShadowCircleVisibility(true)
        }

        unselectAll()
      }
      e.cancelBubble = true
    }}
  >
    {thisNode.ui.selected ? (
      <Circle
        fill={editorComponentsTheme.node.selected.color}
        height={45}
        opacity={0.7}
        strokeWidth={1}
        width={45}
      />
    ) : null}

    {thisNode.properties.final ? (
      <Circle
        fill="#fafafa"
        height={42}
        stroke={
          algorithm_current_step.highlighted_nodes.some(
            id => id === thisNode.id,
          )
            ? algorithmComponentsTheme.node.highlighted.color
            : algorithm_current_step.selected_nodes.some(
                id => id === thisNode.id,
              )
            ? algorithmComponentsTheme.node.selected.color
            : currentEditorAction === 'isPlaying'
            ? algorithmComponentsTheme.node.neutral.color
            : editorComponentsTheme.finalNode.color
        }
        strokeWidth={1.5}
        width={42}
      />
    ) : null}

    {thisNode.properties.initial ? (
      <Arrow
        fill={
          algorithm_current_step.highlighted_nodes.some(
            id => id === thisNode.id,
          )
            ? algorithmComponentsTheme.node.highlighted.color
            : algorithm_current_step.selected_nodes.some(
                id => id === thisNode.id,
              )
            ? algorithmComponentsTheme.node.selected.color
            : currentEditorAction === 'isPlaying'
            ? algorithmComponentsTheme.node.neutral.color
            : editorComponentsTheme.initialNode.color
        }
        pointerLength={10}
        pointerWidth={10}
        points={[-50, 0, -25, 0]}
        stroke={
          algorithm_current_step.highlighted_nodes.some(
            id => id === thisNode.id,
          )
            ? algorithmComponentsTheme.node.highlighted.color
            : algorithm_current_step.selected_nodes.some(
                id => id === thisNode.id,
              )
            ? algorithmComponentsTheme.node.selected.color
            : currentEditorAction === 'isPlaying'
            ? algorithmComponentsTheme.node.neutral.color
            : editorComponentsTheme.initialNode.color
        }
        strokeWidth={1}
        tension={0.8}
      />
    ) : null}

    <Circle
      fill={
        algorithm_current_step.selected_nodes.some(id => id === thisNode.id)
          ? algorithmComponentsTheme.node.selected.color
          : algorithm_current_step.highlighted_nodes.some(
              id => id === thisNode.id,
            )
          ? algorithmComponentsTheme.node.highlighted.color
          : currentEditorAction === 'isPlaying'
          ? algorithmComponentsTheme.node.neutral.color
          : editorComponentsTheme.node.neutral.color
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
      text={thisNode.properties.name}
      x={-5}
      y={-5}
    />
  </Group>
)

export default Node

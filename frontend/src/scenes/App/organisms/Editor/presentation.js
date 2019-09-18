import React from 'react'
import { Stage, Layer, Circle, Arrow } from 'react-konva'
import editorComponentsTheme from '../../../../themes/editorComponents.theme'
import Grid from './organisms/Grid'
import EdgeNotLoop from './organisms/EdgeNotLoop'
import EdgeLoop from './organisms/EdgeLoop'
import Node from './organisms/Node'

const buildCursorStyle = editorActionType =>
  editorActionType === 'select' || editorActionType === 'isPlaying'
    ? 'default'
    : editorActionType === 'node'
    ? 'crosshair'
    : 'copy'

const Presentation = ({
  nodes,
  unselectNode,
  selectNode,
  selectedNodeId,
  updateCursorPosition,
  updateNodePositionStart,
  updateNodePositionEnd,
  cursor,
  isDrawingTempArrow,
  createArrow,
  connectedNodes,
  selectedArrowId,
  unselectArrow,
  selectArrow,
  isMultiSelect,
  drawTempArrow,
  createShape,
  stage,
  grid,
  scaleStage,
  editorActionType,
  createNode,
  algorithm_current_step,
  algorithm_is_final_step,
  initialNode,
}) => (
  <Stage
    scale={{
      x: scaleStage,
      y: scaleStage,
    }}
    style={{
      cursor: buildCursorStyle(editorActionType),
      background: editorComponentsTheme.stage.fill.color,
    }}
    width={window.innerWidth}
    height={window.innerHeight - 128}
    onClick={e => {
      /**
       * When user clicks on stage and is in select mode
       * unselect all selected items.
       *
       * When user clicks on stage and is in node mode
       * create new nodes.
       */
      if (editorActionType === 'select') {
        for (const node of selectedNodeId) {
          unselectNode(node)
        }

        for (const arrow of selectedArrowId) {
          unselectArrow(arrow)
        }
      } else if (editorActionType === 'node') {
        createNode(grid)
        createShape()
      }
      e.cancelBubble = true
    }}
    onMouseMove={e => {
      /**
       * Updates cursor position only in Editor mode.
       */
      if (editorActionType === 'isPlaying') {
        return
      }

      const stage = e.currentTarget.getStage()

      const transform = e.currentTarget
        .getLayers()[0]
        .getAbsoluteTransform()
        .copy()
      transform.invert()
      const pos = stage.getPointerPosition()
      const anchorPos = transform.point(pos)
      updateCursorPosition(anchorPos)
    }}
  >
    {/**
     * Build Grid.
     */
    grid && <Grid stage={stage} scaleStage={scaleStage} />}

    <Layer>
      {/**
       * Show temp arrow when user selects a node in Edge mode
       * and want to connect with other nodes.
       */
      isDrawingTempArrow &&
        editorActionType === 'edge' &&
        selectedNodeId.map((node, id) => (
          <Arrow
            key={id}
            points={[nodes[node].x, nodes[node].y, cursor.x, cursor.y]}
            stroke={editorComponentsTheme.connectArrow.color}
            strokeWidth={3}
            dash={[10, 10]}
          />
        ))}

      {(() => {
        /**
         * Paint edges on screen.
         */
        const exist = []

        return Object.values(connectedNodes)
          .filter(
            arrow =>
              !algorithm_is_final_step ||
              algorithm_current_step.highlighted_edges.some(
                id => id === arrow.id,
              ) ||
              algorithm_current_step.selected_edges.some(id => id === arrow.id),
          )
          .map((arrow, _, arrows) => {
            const nodeRadius = 25
            const curvePower = 20

            /**
             * Track double connected nodes.
             */
            let secondExist = arrows.some(
              arr => arr.from.id === arrow.to.id && arr.to.id === arrow.from.id,
            )
            if (secondExist && !exist.includes(arrow.from.id)) {
              exist.push(arrow.from.id)
              exist.push(arrow.to.id)
            }

            /**
             * Paint the edge based on its type.
             */
            return arrow.to.id !== arrow.from.id ? (
              <EdgeNotLoop
                arrow={arrow}
                secondExist={secondExist}
                nodeRadius={nodeRadius}
                curvePower={curvePower}
                selectArrow={selectArrow}
                unselectArrow={unselectArrow}
                editorActionType={editorActionType}
                isMultiSelect={isMultiSelect}
                unselectNode={unselectNode}
                selectedArrowId={selectedArrowId}
                selectedNodeId={selectedNodeId}
                algorithm_current_step={algorithm_current_step}
              />
            ) : (
              <EdgeLoop
                arrow={arrow}
                selectArrow={selectArrow}
                unselectArrow={unselectArrow}
                editorActionType={editorActionType}
                isMultiSelect={isMultiSelect}
                unselectNode={unselectNode}
                selectedArrowId={selectedArrowId}
                selectedNodeId={selectedNodeId}
                algorithm_current_step={algorithm_current_step}
                scaleStage={scaleStage}
              />
            )
          })
      })()}

      {/**
       * Show shadow circle when grid is on.
       * Determine the snap position of the node.
       */}
      <Circle
        id="shadowCircle"
        x={0}
        y={0}
        width={35}
        height={35}
        fill={editorComponentsTheme.shadowNode.fill.color}
        opacity={0.6}
        stroke={editorComponentsTheme.shadowNode.stroke.color}
        strokeWidth={3}
        dash={[20, 2]}
        visible={false}
      />

      {/**
       * Paint nodes on screen.
       */
      Object.values(nodes)
        .filter(
          node =>
            !algorithm_is_final_step ||
            algorithm_current_step.highlighted_nodes.some(
              id => id === node.id,
            ) ||
            algorithm_current_step.selected_nodes.some(id => id === node.id),
        )
        .map(node => (
          <Node
            thisNode={node}
            editorActionType={editorActionType}
            isMultiSelect={isMultiSelect}
            selectedNodeId={selectedNodeId}
            selectedArrowId={selectedArrowId}
            selectNode={selectNode}
            unselectNode={unselectNode}
            unselectArrow={unselectArrow}
            drawTempArrow={drawTempArrow}
            createArrow={createArrow}
            grid={grid}
            createShape={createShape}
            updateNodePositionStart={updateNodePositionStart}
            updateNodePositionEnd={updateNodePositionEnd}
            nodes={nodes}
            initialNode={initialNode}
            algorithm_current_step={algorithm_current_step}
          />
        ))}
    </Layer>
  </Stage>
)

export default Presentation

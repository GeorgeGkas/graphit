/**
 * Import globals.
 */
import React from 'react'
import { Stage, Layer, Circle, Arrow } from 'react-konva'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

/**
 * Import ducks.
 */
import { operations } from '../Editor/duck'

/**
 * Import components.
 */
import editorComponentsTheme from '../../../../themes/editorComponents.theme'
import Grid from './organisms/Grid'
import EdgeNotLoop from './organisms/EdgeNotLoop'
import EdgeLoop from './organisms/EdgeLoop'
import Node from './organisms/Node'

/**
 * Connect component to Redux.
 */
const mapStateToProps = state => ({
  algorithm_current_step: state.algorithm.steps[state.algorithm.currentIndex],
  algorithm_is_final_step: state.algorithm.isFinal,
  edges: state.editor.present.edges,
  cursor: state.editor.present.cursor,
  editorActionType: state.editor.present.editorActionType,
  initialNode: state.editor.present.initialNode,
  isDrawingTempArrow: state.editor.present.drawTempArrow,
  isMultiSelect: state.editor.present.isMultiSelect,

  nodes: state.editor.present.nodes,
  scaleStage: state.editor.present.scaleStage,
  selectedEdgesId: state.editor.present.selectedEdges,
  selectedNodesId: state.editor.present.selectedNodes,
  stage: state.editor.present.stage,
})

const mapDispatchToProps = dispatch => bindActionCreators(operations, dispatch)

/**
 * Construct appropriate cursor variant.
 */
const buildCursorStyle = editorActionType =>
  editorActionType === 'select' || editorActionType === 'isPlaying'
    ? 'default'
    : editorActionType === 'node'
    ? 'crosshair'
    : 'copy'

/**
 * Component.
 */
const Editor = ({
  algorithm_current_step,
  algorithm_is_final_step,
  edges,
  createEdge,
  createNode,
  createShape,
  cursor,
  drawTempArrow,
  editorActionType,
  grid,
  initialNode,
  isDrawingTempArrow,
  isMultiSelect,
  nodes,
  scaleStage,
  selectEdge,
  selectNode,
  selectedEdgesId,
  selectedNodesId,
  stage,
  unselectEdge,
  unselectNode,
  updateCursorPosition,
  updateNodePositionEnd,
  updateNodePositionStart,
}) => (
  <Stage
    height={window.innerHeight - 128}
    scale={{
      x: scaleStage,
      y: scaleStage,
    }}
    style={{
      background: editorComponentsTheme.stage.fill.color,
      cursor: buildCursorStyle(editorActionType),
    }}
    width={window.innerWidth}
    onClick={e => {
      /**
       * When user clicks on stage and is in select mode
       * unselect all selected items.
       *
       * When user clicks on stage and is in node mode
       * create new nodes.
       */
      if (editorActionType === 'select') {
        for (const node of selectedNodesId) {
          unselectNode(node)
        }

        for (const edge of selectedEdgesId) {
          unselectEdge(edge)
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
    grid && <Grid scaleStage={scaleStage} stage={stage} />}

    <Layer>
      {/**
       * Show temp arrow when user selects a node in Edge mode
       * and want to connect with other nodes.
       */
      isDrawingTempArrow &&
        editorActionType === 'edge' &&
        selectedNodesId.map((node, id) => (
          <Arrow
            key={id}
            dash={[10, 10]}
            points={[nodes[node].x, nodes[node].y, cursor.x, cursor.y]}
            stroke={editorComponentsTheme.connectArrow.color}
            strokeWidth={3}
          />
        ))}

      {(() => {
        /**
         * Paint edges on screen.
         */
        const exist = []

        return Object.values(edges)
          .filter(
            edge =>
              !algorithm_is_final_step ||
              algorithm_current_step.highlighted_edges.some(
                id => id === edge.id,
              ) ||
              algorithm_current_step.selected_edges.some(id => id === edge.id),
          )
          .map((edge, index, edges) => {
            const nodeRadius = 25
            const curvePower = 20

            /**
             * Track double edges.
             */
            let secondExist = edges.some(
              arr => arr.from.id === edge.to.id && arr.to.id === edge.from.id,
            )
            if (secondExist && !exist.includes(edge.from.id)) {
              exist.push(edge.from.id)
              exist.push(edge.to.id)
            }

            /**
             * Paint the edge based on its type.
             */
            return edge.to.id !== edge.from.id ? (
              <EdgeNotLoop
                key={index}
                algorithm_current_step={algorithm_current_step}
                edge={edge}
                curvePower={curvePower}
                editorActionType={editorActionType}
                isMultiSelect={isMultiSelect}
                nodeRadius={nodeRadius}
                secondExist={secondExist}
                selectEdge={selectEdge}
                selectedEdgesId={selectedEdgesId}
                selectedNodesId={selectedNodesId}
                unselectEdge={unselectEdge}
                unselectNode={unselectNode}
              />
            ) : (
              <EdgeLoop
                key={index}
                algorithm_current_step={algorithm_current_step}
                edge={edge}
                editorActionType={editorActionType}
                isMultiSelect={isMultiSelect}
                scaleStage={scaleStage}
                selectEdge={selectEdge}
                selectedEdgesId={selectedEdgesId}
                selectedNodesId={selectedNodesId}
                unselectEdge={unselectEdge}
                unselectNode={unselectNode}
              />
            )
          })
      })()}

      {/**
       * Show shadow circle when grid is on.
       * Determine the snap position of the node.
       */}
      <Circle
        dash={[20, 2]}
        fill={editorComponentsTheme.shadowNode.fill.color}
        height={35}
        id="shadowCircle"
        opacity={0.6}
        stroke={editorComponentsTheme.shadowNode.stroke.color}
        strokeWidth={3}
        visible={false}
        width={35}
        x={0}
        y={0}
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
        .map((node, index) => (
          <Node
            key={index}
            algorithm_current_step={algorithm_current_step}
            createEdge={createEdge}
            createShape={createShape}
            drawTempArrow={drawTempArrow}
            editorActionType={editorActionType}
            grid={grid}
            initialNode={initialNode}
            isMultiSelect={isMultiSelect}
            nodes={nodes}
            selectNode={selectNode}
            selectedEdgesId={selectedEdgesId}
            selectedNodesId={selectedNodesId}
            thisNode={node}
            unselectEdge={unselectEdge}
            unselectNode={unselectNode}
            updateNodePositionEnd={updateNodePositionEnd}
            updateNodePositionStart={updateNodePositionStart}
          />
        ))}
    </Layer>
  </Stage>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Editor)

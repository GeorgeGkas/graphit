import map from 'lodash/fp/map'
import values from 'lodash/fp/values'
import React, { useState } from 'react'
import { Arrow, Circle, Layer, Stage } from 'react-konva'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import editorComponentsTheme from '../../../../themes/editorComponents.theme'
import { operations as editorOperations } from '../../ducks/editor'
import {
  operations as graphOperations,
  selectors as graphSelectors,
} from '../../ducks/graph'
import EdgeLoop from './organisms/EdgeLoop'
import EdgeNotLoop from './organisms/EdgeNotLoop'
import Grid from './organisms/Grid'
import Node from './organisms/Node'

const mapStateToProps = state => ({
  algorithmType: state.graph.present.metadata.algorithm,
  algorithm_current_step: state.algorithm.steps[state.algorithm.currentIndex],
  currentEditorAction: state.editor.currentEditorAction,
  cursor: state.editor.cursor,
  edges: state.graph.present.edges,
  nodes: state.graph.present.nodes,
  selectedNode: graphSelectors.getSelected(state.graph.present.nodes),
  stage: state.editor.stage,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...editorOperations,
      ...graphOperations,
    },
    dispatch,
  )

const buildCursorStyle = currentEditorAction =>
  currentEditorAction === 'select' || currentEditorAction === 'isPlaying'
    ? 'default'
    : currentEditorAction === 'node'
    ? 'crosshair'
    : 'copy'

const Editor = ({
  algorithm_current_step,
  algorithmType,
  createEdge,
  createNode,
  currentEditorAction,
  cursor,
  edges,
  gridVisible,
  nodes,
  selectEdge,
  selectNode,
  selectedNode,
  stage,
  unselectAll,
  unselectNode,
  updateCursorPosition,
  updateNodePositionEnd,
  updateNodePositionStart,
}) => {
  const [drawTempArrow, setTempArrowVisibility] = useState(false)
  const [shadowCircle, setShadowCircleVisibility] = useState(false)

  return (
    <div id="interactive_editor">
      <Stage
        height={window.innerHeight - 128}
        scale={{
          x: stage.scale,
          y: stage.scale,
        }}
        style={{
          background: editorComponentsTheme.stage.fill.color,
          cursor: buildCursorStyle(currentEditorAction),
        }}
        width={window.innerWidth}
        onClick={e => {
          e.cancelBubble = true
          /**
           * When user clicks on stage and is in select mode
           * unselect all selected items.
           *
           * When user clicks on stage and is in node mode
           * create new nodes.
           */
          if (
            currentEditorAction === 'select' ||
            currentEditorAction === 'edge'
          ) {
            setTempArrowVisibility(false)
            unselectAll()
          } else if (currentEditorAction === 'node') {
            createNode(cursor, { grid: gridVisible })
          }
        }}
        onMouseMove={e => {
          /**
           * Updates cursor position only in Editor mode.
           */
          if (currentEditorAction === 'isPlaying') {
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
        gridVisible && <Grid stage={stage} />}

        <Layer>
          {/**
           * Show temp arrow when user selects a node in Edge mode
           * and want to connect with other nodes.
           */
          drawTempArrow && currentEditorAction === 'edge' && (
            <Arrow
              dash={[10, 10]}
              points={[
                selectedNode.ui.pos.x,
                selectedNode.ui.pos.y,
                cursor.x,
                cursor.y,
              ]}
              stroke={editorComponentsTheme.connectArrow.color}
              strokeWidth={3}
            />
          )}

          {(() => {
            /**
             * Paint edges on screen.
             */
            const exist = []

            return map(edge => {
              const nodeRadius = 25
              const curvePower = 20

              /**
               * Track double edges.
               */
              const isDoubleEdge = graphSelectors.isDoubleEdge(
                graphSelectors.resolveEdgePath(edge, nodes),
                edges,
              )
              if (isDoubleEdge && !exist.includes(edge.ui.connects.from)) {
                exist.push(edge.ui.connects.from)
                exist.push(edge.ui.connects.to)
              }

              /**
               * Paint the edge based on its type.
               */
              return edge.ui.connects.to !== edge.ui.connects.from ? (
                <EdgeNotLoop
                  key={edge.id}
                  algorithmType={algorithmType}
                  algorithm_current_step={algorithm_current_step}
                  currentEditorAction={currentEditorAction}
                  curvePower={curvePower}
                  isDoubleEdge={isDoubleEdge}
                  nodeRadius={nodeRadius}
                  selectEdge={selectEdge}
                  thisResolvedEdge={graphSelectors.resolveEdgePath(edge, nodes)}
                  unselectAll={unselectAll}
                />
              ) : (
                <EdgeLoop
                  key={edge.id}
                  algorithmType={algorithmType}
                  algorithm_current_step={algorithm_current_step}
                  currentEditorAction={currentEditorAction}
                  node={nodes[edge.ui.connects.from]}
                  selectEdge={selectEdge}
                  stageScale={stage.scale}
                  thisEdge={edge}
                  unselectAll={unselectAll}
                />
              )
            })(values(edges))
          })()}

          {/**
           * Show shadow circle when grid is on.
           * Determine the snap position of the node.
           */
          shadowCircle && (
            <Circle
              dash={[20, 2]}
              fill={editorComponentsTheme.shadowNode.fill.color}
              height={35}
              id="shadowCircle"
              opacity={0.6}
              stroke={editorComponentsTheme.shadowNode.stroke.color}
              strokeWidth={3}
              width={35}
              x={0}
              y={0}
            />
          )}

          {/**
           * Paint nodes on screen.
           */
          map(node => (
            <Node
              key={node.id}
              algorithm_current_step={algorithm_current_step}
              createEdge={createEdge}
              currentEditorAction={currentEditorAction}
              gridVisible={gridVisible}
              selectNode={selectNode}
              selectedNode={selectedNode}
              setShadowCircleVisibility={setShadowCircleVisibility}
              setTempArrowVisibility={setTempArrowVisibility}
              thisNode={node}
              unselectAll={unselectAll}
              unselectNode={unselectNode}
              updateNodePositionEnd={updateNodePositionEnd}
              updateNodePositionStart={updateNodePositionStart}
            />
          ))(values(nodes))}
        </Layer>
      </Stage>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Editor)

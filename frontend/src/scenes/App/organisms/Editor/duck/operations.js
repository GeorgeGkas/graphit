import * as actions from './actions'
import editorComponentsTheme from '../../../../../themes/editorComponents.theme'

const {
  changeEditorActionType: changeEditorActionTypeAction,
  createEdge: createEdgeAction,
  createNode: createNodeAction,
  createShape,
  deleteEdge,
  deleteNode: deleteNodeAction,
  deleteShape,
  drawTempArrow,
  initEditorHistory,
  loadState,
  multiSelect,
  redoEditorHistory,
  scaleStage: scaleStageBy,
  selectEdge: selectEdgeAction,
  selectNode: selectNodeAction,
  setInitialNode,
  undoEditorHistory,
  unselectEdge: unselectEdgeAction,
  unselectNode: unselectNodeAction,
  updateEdgePosition,
  updateEdgeWeight,
  updateCursorPosition,
  updateNodeName,
  updateNodePositionEnd: updateNodePositionEndAction,
  updateNodePositionStart: updateNodePositionStartAction,
  updateStagePosition,
} = actions

const changeEditorActionType = editorType => (dispatch, getState) => {
  if (editorType === getState().editor.present.editorActionType) {
    return
  }

  for (const ID of getState().editor.present.selectedNode) {
    dispatch(unselectNode(ID))
  }

  for (const ID of getState().editor.present.selectedEdge) {
    dispatch(unselectEdge(ID))
  }

  dispatch(changeEditorActionTypeAction(editorType))
}

const createNode = gridVisible => (dispatch, getState) => {
  const pos = gridVisible
    ? {
        x: Math.round(getState().editor.present.cursor.x / 35) * 35 || 35,
        y: Math.round(getState().editor.present.cursor.y / 35) * 35 || 35,
      }
    : {
        x: getState().editor.present.cursor.x || 35,
        y: getState().editor.present.cursor.y || 35,
      }

  const node = {
    fill: editorComponentsTheme.node.neutral.color,
    id: '' + Math.random() * 100,

    name: 's',
    ...pos,
  }

  dispatch(createNodeAction(node))
}

const selectNode = id => (dispatch, getState) => {
  const node = {
    ...getState().editor.present.nodes[id],
    //fill: editorComponentsTheme.node.selected.color,
  }

  dispatch(selectNodeAction(node))
}

const unselectNode = id => (dispatch, getState) => {
  const node = {
    ...getState().editor.present.nodes[id],
    //fill: editorComponentsTheme.node.neutral.color,
  }

  dispatch(unselectNodeAction(node))
}

const updateNodePositionStart = node => (dispatch, getState) => {
  for (const edge of Object.values(getState().editor.present.edges)) {
    if (edge.from.id === node.id && edge.to.id === node.id) {
      dispatch(
        updateEdgePosition({
          ...edge,
          from: {
            id: edge.from.id,
            ...node.pos,
          },
          to: {
            id: edge.from.id,
            ...node.pos,
          },
        }),
      )
    } else if (edge.from.id === node.id) {
      dispatch(
        updateEdgePosition({
          ...edge,
          from: {
            id: edge.from.id,
            ...node.pos,
          },
        }),
      )
    } else if (edge.to.id === node.id) {
      dispatch(
        updateEdgePosition({
          ...edge,
          to: {
            id: edge.to.id,
            ...node.pos,
          },
        }),
      )
    }
  }
}

const updateNodePositionEnd = node => (dispatch, getState) => {
  const updatedNode = {
    ...getState().editor.present.nodes[node.id],
    ...node.pos,
  }

  dispatch(updateNodePositionStartAction(updatedNode))
  dispatch(updateNodePositionStart(node))
  dispatch(updateNodePositionEndAction())
}

const createEdge = nodes => (dispatch, getState) => {
  let edgeExist = false

  for (const edge of Object.values(getState().editor.present.edges)) {
    if (edge.from.id === nodes.from && edge.to.id === nodes.to) {
      edgeExist = true
    }
  }

  if (!edgeExist) {
    dispatch(
      createEdgeAction({
        fill: editorComponentsTheme.edge.neutral.color,
        from: {
          id: nodes.from,
          x: getState().editor.present.nodes[nodes.from].x,
          y: getState().editor.present.nodes[nodes.from].y,
        },
        id: '' + Math.random() * 100,
        stroke: editorComponentsTheme.edge.neutral.color,
        to: {
          id: nodes.to,
          x: getState().editor.present.nodes[nodes.to].x,
          y: getState().editor.present.nodes[nodes.to].y,
        },
        weight: '0',
      }),
    )
  }
}

const deleteNode = id => (dispatch, getState) => {
  for (const edge of Object.values(getState().editor.present.edges)) {
    if (edge.from.id === id || edge.to.id === id) {
      dispatch(deleteEdge(edge.id))
    }
  }

  dispatch(deleteNodeAction(id))
}

const selectEdge = id => (dispatch, getState) => {
  const edge = {
    ...getState().editor.present.edges[id],
    fill: editorComponentsTheme.edge.selected.color,
    stroke: editorComponentsTheme.edge.selected.color,
  }

  dispatch(selectEdgeAction(edge))
}

const unselectEdge = id => (dispatch, getState) => {
  const edge = {
    ...getState().editor.present.edges[id],
    fill: editorComponentsTheme.edge.neutral.color,
    stroke: editorComponentsTheme.edge.neutral.color,
  }

  dispatch(unselectEdgeAction(edge))
}

export {
  changeEditorActionType,
  createEdge,
  createNode,
  createShape,
  deleteEdge,
  deleteNode,
  deleteShape,
  drawTempArrow,
  initEditorHistory,
  loadState,
  redoEditorHistory,
  multiSelect,
  scaleStageBy,
  selectEdge,
  selectNode,
  setInitialNode,
  undoEditorHistory,
  unselectEdge,
  unselectNode,
  updateEdgePosition,
  updateEdgeWeight,
  updateNodeName,
  updateCursorPosition,
  updateNodePositionEnd,
  updateNodePositionStart,
  updateStagePosition,
}

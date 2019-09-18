import * as actions from './actions'
import editorComponentsTheme from '../../../../../themes/editorComponents.theme'

const {
  createNode: createNodeAction,
  selectNode: selectNodeAction,
  unselectNode: unselectNodeAction,
  deleteNode: deleteNodeAction,
  updateCursorPosition,
  updateNodePositionStart: updateNodePositionStartAction,
  updateNodePositionEnd: updateNodePositionEndAction,
  drawTempArrow,
  updateStagePosition,
  createArrow: createArrowAction,
  updateArrowPosition,
  selectArrow: selectArrowAction,
  unselectArrow: unselectArrowAction,
  deleteArrow,
  multiSelect,
  deleteShape,
  createShape,
  scaleStage: scaleStageBy,
  changeEditorActionType: changeEditorActionTypeAction,
  initHistory,
  loadState,
  updateNodeName,
  updateArrowWeight,
  undoEditorHistory,
  redoEditorHistory,
  initEditorHistory,
  setInitialNode,
} = actions

const changeEditorActionType = editorType => (dispatch, getState) => {
  if (editorType === getState().editor.present.editorActionType) {
    return
  }

  for (const ID of getState().editor.present.selectedNode) {
    dispatch(unselectNode(ID))
  }

  for (const ID of getState().editor.present.selectedArrow) {
    dispatch(unselectArrow(ID))
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
    id: '' + Math.random() * 100,
    fill: editorComponentsTheme.node.neutral.color,
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
  for (const connector of Object.values(getState().editor.present.connected)) {
    if (connector.from.id === node.id && connector.to.id === node.id) {
      dispatch(
        updateArrowPosition({
          ...connector,
          from: {
            id: connector.from.id,
            ...node.pos,
          },
          to: {
            id: connector.from.id,
            ...node.pos,
          },
        }),
      )
    } else if (connector.from.id === node.id) {
      dispatch(
        updateArrowPosition({
          ...connector,
          from: {
            id: connector.from.id,
            ...node.pos,
          },
        }),
      )
    } else if (connector.to.id === node.id) {
      dispatch(
        updateArrowPosition({
          ...connector,
          to: {
            id: connector.to.id,
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

const createArrow = nodes => (dispatch, getState) => {
  let connectExist = false

  for (const connector of Object.values(getState().editor.present.connected)) {
    if (connector.from.id === nodes.from && connector.to.id === nodes.to) {
      connectExist = true
    }
  }

  if (!connectExist) {
    dispatch(
      createArrowAction({
        id: '' + Math.random() * 100,
        stroke: editorComponentsTheme.edge.neutral.color,
        fill: editorComponentsTheme.edge.neutral.color,
        weight: '0',
        from: {
          id: nodes.from,
          x: getState().editor.present.nodes[nodes.from].x,
          y: getState().editor.present.nodes[nodes.from].y,
        },
        to: {
          id: nodes.to,
          x: getState().editor.present.nodes[nodes.to].x,
          y: getState().editor.present.nodes[nodes.to].y,
        },
      }),
    )
  }
}

const deleteNode = id => (dispatch, getState) => {
  for (const connector of Object.values(getState().editor.present.connected)) {
    if (connector.from.id === id || connector.to.id === id) {
      dispatch(deleteArrow(connector.id))
    }
  }

  dispatch(deleteNodeAction(id))
}

const selectArrow = id => (dispatch, getState) => {
  const arrow = {
    ...getState().editor.present.connected[id],
    stroke: editorComponentsTheme.edge.selected.color,
    fill: editorComponentsTheme.edge.selected.color,
  }

  dispatch(selectArrowAction(arrow))
}

const unselectArrow = id => (dispatch, getState) => {
  const arrow = {
    ...getState().editor.present.connected[id],
    stroke: editorComponentsTheme.edge.neutral.color,
    fill: editorComponentsTheme.edge.neutral.color,
  }

  dispatch(unselectArrowAction(arrow))
}

export {
  createNode,
  selectNode,
  unselectNode,
  deleteNode,
  updateCursorPosition,
  updateNodePositionStart,
  updateNodePositionEnd,
  drawTempArrow,
  updateStagePosition,
  createArrow,
  updateArrowPosition,
  selectArrow,
  unselectArrow,
  deleteArrow,
  multiSelect,
  deleteShape,
  createShape,
  scaleStageBy,
  changeEditorActionType,
  initHistory,
  loadState,
  updateNodeName,
  updateArrowWeight,
  undoEditorHistory,
  redoEditorHistory,
  initEditorHistory,
  setInitialNode,
}

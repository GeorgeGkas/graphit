import * as actions from './actions'
import editorComponentsTheme from '../../../../../themes/editorComponents.theme'

const {
  changeEditorActionType: changeEditorActionTypeAction,
  createArrow: createArrowAction,
  createNode: createNodeAction,
  createShape,
  deleteArrow,
  deleteNode: deleteNodeAction,
  deleteShape,
  drawTempArrow,
  initEditorHistory,
  loadState,
  multiSelect,
  redoEditorHistory,
  scaleStage: scaleStageBy,
  selectArrow: selectArrowAction,
  selectNode: selectNodeAction,
  setInitialNode,
  undoEditorHistory,
  unselectArrow: unselectArrowAction,
  unselectNode: unselectNodeAction,
  updateArrowPosition,
  updateArrowWeight,
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
    fill: editorComponentsTheme.edge.selected.color,
    stroke: editorComponentsTheme.edge.selected.color,
  }

  dispatch(selectArrowAction(arrow))
}

const unselectArrow = id => (dispatch, getState) => {
  const arrow = {
    ...getState().editor.present.connected[id],
    fill: editorComponentsTheme.edge.neutral.color,
    stroke: editorComponentsTheme.edge.neutral.color,
  }

  dispatch(unselectArrowAction(arrow))
}

export {
  changeEditorActionType,
  createArrow,
  createNode,
  createShape,
  deleteArrow,
  deleteNode,
  deleteShape,
  drawTempArrow,
  initEditorHistory,
  loadState,
  redoEditorHistory,
  multiSelect,
  scaleStageBy,
  selectArrow,
  selectNode,
  setInitialNode,
  undoEditorHistory,
  unselectArrow,
  unselectNode,
  updateArrowPosition,
  updateArrowWeight,
  updateNodeName,
  updateCursorPosition,
  updateNodePositionEnd,
  updateNodePositionStart,
  updateStagePosition,
}

import * as types from './types'

const createNode = node => ({
  payload: node,
  type: types.CREATE_NODE,
})

const selectNode = node => ({
  payload: node,
  type: types.SELECT_NODE,
})

const unselectNode = node => ({
  payload: node,
  type: types.UNSELECT_NODE,
})

const deleteNode = id => ({
  payload: id,
  type: types.DELETE_NODE,
})

const updateCursorPosition = pos => ({
  payload: pos,
  type: types.UPDATE_CURSOR_POSITION,
})

const updateNodePositionStart = node => ({
  payload: node,
  type: types.UPDATE_NODE_POSITION_START,
})

const updateNodePositionEnd = () => ({
  type: types.UPDATE_NODE_POSITION_END,
})

const drawTempArrow = visible => ({
  payload: visible,
  type: types.DRAW_TEMP_ARROW,
})

const updateStagePosition = pos => ({
  payload: pos,
  type: types.UPDATE_STAGE_POSITION,
})

const createEdge = nodes => ({
  payload: nodes,
  type: types.CREATE_EDGE,
})

const updateEdgePosition = edge => ({
  payload: edge,
  type: types.UPDATE_EDGE_POSITION,
})

const selectEdge = edge => ({
  payload: edge,
  type: types.SELECT_EDGE,
})

const unselectEdge = edge => ({
  payload: edge,
  type: types.UNSELECT_EDGE,
})

const deleteEdge = id => ({
  payload: id,
  type: types.DELETE_EDGE,
})

const deleteShape = () => ({
  type: types.DELETE_SHAPE,
})

const createShape = () => ({
  type: types.CREATE_SHAPE,
})

const scaleStage = scaleBy => ({
  payload: scaleBy,
  type: types.SCALE_STAGE,
})

const changeEditorActionType = editorActionType => ({
  payload: editorActionType,
  type: types.CHANGE_EDITOR_ACTION_TYPE,
})

const initHistory = () => ({
  type: types.INIT_HISTORY,
})

const loadState = state => ({
  payload: state,
  type: types.LOAD_STATE,
})

const updateNodeName = payload => ({
  payload,
  type: types.UPDATE_NODE_NAME,
})

const updateEdgeWeight = payload => ({
  payload,
  type: types.UPDATE_EDGE_WEIGHT,
})

const undoEditorHistory = () => ({
  type: types.UNDO_EDITOR_HISTORY,
})

const redoEditorHistory = () => ({
  type: types.REDO_EDITOR_HISTORY,
})

const initEditorHistory = () => ({
  type: types.INIT_EDITOR_HISTORY,
})

const setInitialNode = id => ({
  payload: id,
  type: types.SET_INITIAL_NODE,
})

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
  initHistory,
  loadState,
  redoEditorHistory,
  scaleStage,
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

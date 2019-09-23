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

const createArrow = nodes => ({
  payload: nodes,
  type: types.CREATE_ARROW,
})

const updateArrowPosition = arrow => ({
  payload: arrow,
  type: types.UPDATE_ARROW_POSITION,
})

const selectArrow = arrow => ({
  payload: arrow,
  type: types.SELECT_ARROW,
})

const unselectArrow = arrow => ({
  payload: arrow,
  type: types.UNSELECT_ARROW,
})

const deleteArrow = id => ({
  payload: id,
  type: types.DELETE_ARROW,
})

const multiSelect = state => ({
  payload: state,
  type: types.MULTI_SELECT,
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

const updateArrowWeight = payload => ({
  payload,
  type: types.UPDATE_ARROW_WEIGHT,
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
  createArrow,
  createNode,
  createShape,
  deleteArrow,
  deleteNode,
  deleteShape,
  drawTempArrow,
  initEditorHistory,
  initHistory,
  loadState,
  multiSelect,
  redoEditorHistory,
  scaleStage,
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

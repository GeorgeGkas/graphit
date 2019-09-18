import * as types from './types'

const createNode = node => ({
  type: types.CREATE_NODE,
  payload: node,
})

const selectNode = node => ({
  type: types.SELECT_NODE,
  payload: node,
})

const unselectNode = node => ({
  type: types.UNSELECT_NODE,
  payload: node,
})

const deleteNode = id => ({
  type: types.DELETE_NODE,
  payload: id,
})

const updateCursorPosition = pos => ({
  type: types.UPDATE_CURSOR_POSITION,
  payload: pos,
})

const updateNodePositionStart = node => ({
  type: types.UPDATE_NODE_POSITION_START,
  payload: node,
})

const updateNodePositionEnd = () => ({
  type: types.UPDATE_NODE_POSITION_END,
})

const drawTempArrow = visible => ({
  type: types.DRAW_TEMP_ARROW,
  payload: visible,
})

const updateStagePosition = pos => ({
  type: types.UPDATE_STAGE_POSITION,
  payload: pos,
})

const createArrow = nodes => ({
  type: types.CREATE_ARROW,
  payload: nodes,
})

const updateArrowPosition = arrow => ({
  type: types.UPDATE_ARROW_POSITION,
  payload: arrow,
})

const selectArrow = arrow => ({
  type: types.SELECT_ARROW,
  payload: arrow,
})

const unselectArrow = arrow => ({
  type: types.UNSELECT_ARROW,
  payload: arrow,
})

const deleteArrow = id => ({
  type: types.DELETE_ARROW,
  payload: id,
})

const multiSelect = state => ({
  type: types.MULTI_SELECT,
  payload: state,
})

const deleteShape = () => ({
  type: types.DELETE_SHAPE,
})

const createShape = () => ({
  type: types.CREATE_SHAPE,
})

const scaleStage = scaleBy => ({
  type: types.SCALE_STAGE,
  payload: scaleBy,
})

const changeEditorActionType = editorActionType => ({
  type: types.CHANGE_EDITOR_ACTION_TYPE,
  payload: editorActionType,
})

const initHistory = () => ({
  type: types.INIT_HISTORY,
})

const loadState = state => ({
  type: types.LOAD_STATE,
  payload: state,
})

const updateNodeName = payload => ({
  type: types.UPDATE_NODE_NAME,
  payload,
})

const updateArrowWeight = payload => ({
  type: types.UPDATE_ARROW_WEIGHT,
  payload,
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
  type: types.SET_INITIAL_NODE,
  payload: id,
})

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
  scaleStage,
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

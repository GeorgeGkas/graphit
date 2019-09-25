import * as types from './types'

const updateStage = stage => ({
  payload: stage,
  type: types.UPDATE_STAGE,
})

const updateCurrentEditorAction = actionType => ({
  payload: actionType,
  type: types.UPDATE_CURRENT_EDITOR_ACTION,
})

const updateCursorPosition = pos => ({
  payload: pos,
  type: types.UPDATE_CURSOR_POSITION,
})

export { updateCurrentEditorAction, updateCursorPosition, updateStage }

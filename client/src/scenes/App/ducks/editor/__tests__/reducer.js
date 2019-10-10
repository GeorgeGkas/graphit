import reducer, { initialState } from '../reducer'
import * as types from '../types'

test('handle update current editor action', () => {
  const initialReducerState = { ...initialState }
  const afterUpdatingEditorAction = reducer(initialReducerState, {
    payload: 'node',
    type: types.UPDATE_CURRENT_EDITOR_ACTION,
  })

  expect(initialReducerState).toEqual(initialState)
  expect(afterUpdatingEditorAction).toEqual({
    ...initialState,
    currentEditorAction: 'node',
  })
})

test('handle update stage', () => {
  const initialReducerState = { ...initialState }
  const afterUpdatingStage = reducer(initialReducerState, {
    payload: {
      pos: {
        x: 110,
        y: 100,
      },
      scale: 5,
    },
    type: types.UPDATE_STAGE,
  })

  expect(initialReducerState).toEqual(initialState)
  expect(afterUpdatingStage).toEqual({
    ...initialState,
    stage: {
      pos: {
        x: 110,
        y: 100,
      },
      scale: 5,
    },
  })
})

test('handle update cursor position', () => {
  const initialReducerState = { ...initialState }
  const afterUpdatingCursorPosition = reducer(initialReducerState, {
    payload: {
      x: 110,
      y: 100,
    },
    type: types.UPDATE_CURSOR_POSITION,
  })

  expect(initialReducerState).toEqual(initialState)
  expect(afterUpdatingCursorPosition).toEqual({
    ...initialState,
    cursor: {
      x: 110,
      y: 100,
    },
  })
})

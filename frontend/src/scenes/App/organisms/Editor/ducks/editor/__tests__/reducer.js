import reducer, { initialState } from '../reducer'
import * as types from '../types'

test('handle update current editor action', () => {
  const initialReducerState = { ...initialState }
  const afterInsertingNode = reducer(initialReducerState, {
    payload: 'node',
    type: types.UPDATE_CURRENT_EDITOR_ACTION,
  })

  expect(initialReducerState).toEqual(initialState)
  expect(afterInsertingNode).toEqual({
    ...initialState,
    currentEditorAction: 'node',
  })
})

test('handle update stage', () => {
  const initialReducerState = { ...initialState }
  const afterInsertingNode = reducer(initialReducerState, {
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
  expect(afterInsertingNode).toEqual({
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

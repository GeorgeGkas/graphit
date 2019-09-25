/**
 * Test Redux action creators.
 * In tests where we have to specify a payload,  use an empty payload structure,
 * cause we only have to test if the action was invoked with the correct type.
 */

import * as actions from '../actions'
import * as types from '../types'

test('update stage', () => {
  const payload = {}
  const expectedAction = {
    payload,
    type: types.UPDATE_STAGE,
  }

  expect(actions.updateStage(payload)).toEqual(expectedAction)
})

test('update current editor action', () => {
  const payload = {}
  const expectedAction = {
    payload,
    type: types.UPDATE_CURRENT_EDITOR_ACTION,
  }

  expect(actions.updateCurrentEditorAction(payload)).toEqual(expectedAction)
})

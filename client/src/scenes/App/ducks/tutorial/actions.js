import * as types from './types'

const setTutorialVisibility = visible => ({
  payload: visible,
  type: types.SET_TUTORIAL_VISIBILITY,
})

export { setTutorialVisibility }

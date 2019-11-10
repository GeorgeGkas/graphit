import { SET_TUTORIAL_VISIBILITY } from './types'

export const initialState = {
  visible: false,
}

const update = (state = initialState, action) => {
  switch (action.type) {
    case SET_TUTORIAL_VISIBILITY:
      return {
        ...state,
        visible: action.payload,
      }
    default:
      return state
  }
}

export default update

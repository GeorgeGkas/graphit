import * as types from './types'

/**
 *  type CurrentEditorAction = 'select' | 'node' | 'edge'
 */

export const initialState = {
  currentEditorAction: 'select',
  cursor: {
    x: 0,
    y: 0,
  },
  stage: {
    pos: {
      x: 0,
      y: 0,
    },
    scale: 1.4641,
  },
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_CURRENT_EDITOR_ACTION:
      return {
        ...state,
        currentEditorAction: action.payload,
      }
    case types.UPDATE_STAGE:
      return {
        ...state,
        stage: action.payload,
      }
    case types.UPDATE_CURSOR_POSITION:
      return {
        ...state,
        cursor: action.payload,
      }
    default:
      return state
  }
}

export default reducer

import {
  FIRST_ITERATION,
  LAST_ITERATION,
  NEXT_ITERATION,
  PREVIOUS_ITERATION,
  START_PLAYING,
  STOP_PLAYING,
} from './types'

export const initialState = {
  currentIndex: 0,
  isFinal: false,
  steps: [
    {
      highlighted_edges: [],
      highlighted_nodes: [],
      selected_edges: [],
      selected_nodes: [],
      unvisited: {},
    },
  ],
}

const update = (state = initialState, action) => {
  switch (action.type) {
    case START_PLAYING:
      return {
        ...state,
        steps: action.payload,
      }
    case STOP_PLAYING:
      return initialState
    case PREVIOUS_ITERATION:
      return {
        ...state,
        currentIndex: state.currentIndex - 1,
        isFinal: state.currentIndex - 1 === state.steps.length - 1,
      }
    case NEXT_ITERATION:
      return {
        ...state,
        currentIndex: state.currentIndex + 1,
        isFinal: state.currentIndex + 1 === state.steps.length - 1,
      }
    case FIRST_ITERATION:
      return {
        ...state,
        currentIndex: 0,
        isFinal: false,
      }
    case LAST_ITERATION:
      return {
        ...state,
        currentIndex: state.steps.length - 1,
        isFinal: true,
      }
    default:
      return state
  }
}

export default update

import {
  START_PLAYING,
  STOP_PLAYING,
  PREVIOUS_ITERATION,
  NEXT_ITERATION,
  FIRST_ITERATION,
  LAST_ITERATION,
} from './types'

export const initialState = {
  steps: [
    {
      highlighted_nodes: [],
      highlighted_edges: [],
      selected_nodes: [],
      selected_edges: [],
      distances: {},
      unvisited: {},
    },
  ],
  isFinal: false,
  currentIndex: 0,
}

const update = (state = initialState, action) => {
  switch (action.type) {
    case START_PLAYING:
      return {
        ...state,
        steps: action.payload.steps,
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

import * as types from './types'

const startPlaying = steps => ({
  type: types.START_PLAYING,
  payload: steps,
})

const stopPlaying = () => ({
  type: types.STOP_PLAYING,
})

const nextIteration = () => ({
  type: types.NEXT_ITERATION,
})

const lastIteration = () => ({
  type: types.LAST_ITERATION,
})

const firstIteration = () => ({
  type: types.FIRST_ITERATION,
})

const previousIteration = () => ({
  type: types.PREVIOUS_ITERATION,
})

export {
  startPlaying,
  stopPlaying,
  nextIteration,
  lastIteration,
  firstIteration,
  previousIteration,
}

import React from 'react'
import { toast } from 'react-toastify'

import * as actions from './actions'
import { operations as editorOperations } from '../editor'
import runAutomata from './functions/runAutomata'
import runDijkstra from './functions/runDijkstra'

import Notification from '../../../../organisms/Notification'

const {
  firstIteration: firstIterationAction,
  lastIteration: lastIterationAction,
  nextIteration: nextIterationAction,
  previousIteration: previousIterationAction,
  startPlaying: startPlayingAction,
  stopPlaying: stopPlayingAction,
} = actions

const startPlaying = payload => (dispatch, getState) => {
  try {
    let algorithmResults
    switch (getState().graph.present.metadata.algorithm) {
      case 'Dijkstra':
        algorithmResults = runDijkstra(getState().graph.present)
        break
      case 'Automata':
        const input = payload
        algorithmResults = runAutomata(getState().graph.present, input)
        break
      default:
        toast.dismiss()
        toast(<Notification message="Could not run requested algorithm" />)
        return
    }

    /**
     * Initialize the runner.
     */
    dispatch(editorOperations.updateCurrentEditorAction('isPlaying'))

    /**
     * Start the runner.
     */
    dispatch(startPlayingAction(algorithmResults))
  } catch (e) {
    toast.dismiss()
    toast(<Notification message={e.message} />)
  }
}

const stopPlaying = () => dispatch => {
  dispatch(stopPlayingAction())
  dispatch(editorOperations.updateCurrentEditorAction('select'))
}

const nextIteration = () => dispatch => {
  dispatch(nextIterationAction())
}

const lastIteration = () => dispatch => {
  dispatch(lastIterationAction())
}

const firstIteration = () => dispatch => {
  dispatch(firstIterationAction())
}

const previousIteration = () => dispatch => {
  dispatch(previousIterationAction())
}

export {
  firstIteration,
  lastIteration,
  nextIteration,
  previousIteration,
  startPlaying,
  stopPlaying,
}
